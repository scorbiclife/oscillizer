/* Parsing related code */

/**
 * The intermediate state during RLE parsing.
 * @class
 */
export class ParserState {
  /**
   * Initialize the parser with the given state.
   *
   * @param {Object} initialState - The initial state to override with
   * @property {boolean|undefined} initialState.isFinished
   * @property {Array<Cell>|undefined} initialState.cells
   * @property {Array<number>|undefined} initialState.runCount
   * @property {Cell|undefined} initialState.currentCell
   *
   */
  constructor(initialState = {}) {
    /** @type {boolean} */
    this.isFinished = initialState.isFinished || false;
    /** @type {Array<Cell>} */
    this.cells = initialState.cells || [];
    /** @type {number} */
    this.runCount = initialState.runCount || 0;
    /** @type {Cell} */
    this.currentCell = initialState.currentCell || [0, 0];
  }

  finishParsing() {
    this.isFinished = true;
  }

  addNewlines() {
    const [/* x */, y] = this.currentCell;
    const runCount = this.runCount || 1;
    this.currentCell = [0, y + runCount];
    this.runCount = 0;
  }

  // Append digit: integer to runCount: integer
  updateRunCount(digit) {
    this.runCount = this.runCount * 10 + digit;
  }

  drawRun(state) {
    const [x, y] = this.currentCell;
    const runCount = this.runCount || 1;
    const newCells = new Array(runCount).fill(0).map((v, i) => [x + i, y]);

    // Refactor addNewCells into a dependency if needs variation in behavior
    const addNewCells = (nc, s) => {
      if (s) { this.cells = this.cells.concat(nc); }
    };
    addNewCells(newCells, state);

    this.currentCell = [x + runCount, y];
    this.runCount = 0;
  }
}

const mapStateFromChar = new Map(
  [
    ['.', 0], ['A', 1], ['B', 0], ['C', 1], ['D', 0], ['E', 1], ['F', 0],
    ['b', 0], ['o', 1],
  ]
);

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
    [...rleBodyString].reduce(updateParserState, new ParserState())
  );
  parseResult.finishParsing(); // No-op for now but semantically needed
  return parseResult.cells;
};

/* Body extracting related code */

const extractParts = (rleString) => {
  const lines = (
    rleString.split('\n')
      .map((line) => line.replace(/\s/g, ''))
      .filter((line) => line !== '') // We ignore empty lines
  );

  const isNotComment = (line) => !line.startsWith('#');
  const firstNonCommentIndex = lines.findIndex(isNotComment);

  const headerRegex = /^x=\d+,y=\d+,rule=(.*)/;
  const matchedHeader = headerRegex.exec(lines[firstNonCommentIndex]);
  const bodyStartIndex = firstNonCommentIndex + (matchedHeader !== null) ? 1 : 0;
  const body = lines.slice(bodyStartIndex).join('');
  const rule = (matchedHeader) ? matchedHeader[1] : null;
  return [body, rule];
};

/**
 * Given an RLE string, parse and return the rule and pattern.
 * @param {string} rleString - The RLE string.
 * @returns {Array} - The pattern and the rule.
 * @property {TwoStatePattern} 0 - The pattern.
 * @property {Rule|undefined} 1 - The rule.
 */
export const parse = (rleString) => {
  const [rleBody] = extractParts(rleString);
  return [parseBody(rleBody), undefined];
};
