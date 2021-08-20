import TotalisticRule from '../../../BaseTypes/Rule/TotalisticRule.js';
import PatternParser from '../../../Engine/RLE/PatternParser.js';
import { parseINTRule, parseTotalisticRule } from '../../../Engine/RLE/RuleParser.js';

/** @module */

const mapStateFromChar = new Map(
  [
    ['.', 0], ['A', 1], ['B', 0], ['C', 1], ['D', 0], ['E', 1], ['F', 0],
    ['b', 0], ['o', 1],
  ]
);

/**
 * @private
 * @param {PatternParser} parserState
 * @param {string} c
 * @returns {PatternParser}
 */
const updateParserState = (parserState, c) => {
  // Passthrough if the parser is finished.
  if (parserState.isFinished) {
    return parserState;
  }

  if (c === '!') {
    parserState.finishParsing();
    return parserState;
  }

  // Update the run count if it is a digit
  if (c >= '0' && c <= '9') {
    const d = c.charCodeAt(0) - '0'.charCodeAt(0);
    parserState.updateRunCount(d);
    return parserState;
  }

  // Jump to next line if it is '$'
  if (c === '$') {
    parserState.addNewlines();
    return parserState;
  }

  // Draw the run if it is a character
  const currState = mapStateFromChar.get(c) || 0;
  parserState.drawRun(currState);
  return parserState;
};

// Convert RLE without headers into a pattern of form [[x, y]]
export const parseBody = (rleBodyString) => {
  const parseResult = (
    [...rleBodyString].reduce(updateParserState, new PatternParser())
  );
  parseResult.finishParsing(); // No-op for now but semantically needed
  return parseResult.cells;
};

/* Body extracting related code */

/**
 * @private
 * @param {string} rleString
 * @returns {{body: string, rule: string|null}} The RLE Body and Rule, both as a string
 */
const extractParts = (rleString) => {
  const lines = (
    rleString.split('\n')
      .map((line) => line.replace(/\s/g, ''))
      .filter((line) => line !== '') // We ignore empty lines
  );

  /** @type {function(string): boolean} */
  const isNotComment = (line) => !line.startsWith('#');
  const firstNonCommentIndex = lines.findIndex(isNotComment);

  const headerRegex = /^x=\d+,y=\d+,rule=(.*)/;
  const matchedHeader = headerRegex.exec(lines[firstNonCommentIndex]);
  const bodyStartIndex = firstNonCommentIndex + (matchedHeader !== null ? 1 : 0);
  const body = lines.slice(bodyStartIndex).join('');
  const rule = (matchedHeader) ? matchedHeader[1] : null;
  return { body, rule };
};

/**
 * @typedef {import('../../../BaseTypes/Rule/Rule.js').Rule} Rule
 */

/**
 * Given an RLE string, parse and return the rule and pattern.
 * @param {string} rleString - The RLE string.
 * @returns {{pattern: Array<Cell>, rule: Rule}} - The pattern and the rule.
 */
export const parse = (rleString) => {
  const { rule: ruleString, body } = extractParts(rleString);
  const pattern = parseBody(body);
  const rule = (
    parseTotalisticRule(ruleString)
    || parseINTRule(ruleString)
    || new TotalisticRule([3], [2, 3])
  );
  return { pattern, rule };
};
