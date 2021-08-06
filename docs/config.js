import SimpleBoard from './lib/engine/Board/SimpleBoard/SimpleBoard.js';
import { simpleBoardConwayLife } from './lib/engine/Board/SimpleBoard/SimpleRules/TotalisticRule.js';

/**
 * Create and return a new two-state board with the given pattern and rule.
 *
 * @function makeTwoStateBoard
 * @param {TwoStatePattern} [pattern=[]] - The initial pattern.
 * @param {Object} [rule] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
// eslint-disable-next-line import/prefer-default-export
export const makeTwoStateBoard = (pattern = [], rule = simpleBoardConwayLife) => (
  new SimpleBoard(rule, pattern)
);
