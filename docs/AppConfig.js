import SimpleBoard from './Engine/Board/SimpleBoard/SimpleBoard.js';
import Rule from './Engine/BaseTypes/Rule/Rule.js';

const life = new Rule.TotalisticRule([3], [2, 3]);

/**
 * Create and return a new two-state board with the given pattern and rule.
 * @todo `rule` should be changed later to support different rulestings.
 *
 * @function makeBoard
 * @param {TwoStatePattern} pattern - The initial pattern.
 * @param {Object} [rule] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
export const makeBoard = (pattern, rule = life) => new SimpleBoard(pattern, rule);

/**
 * Create and return a new empty board with the given rule.
 * @todo `rule` should be changed later to support different rulestings.
 *
 * @function makeBoard
 * @param {Object} [rule] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
export const makeEmptyBoard = (rule = life) => new SimpleBoard([], rule);
