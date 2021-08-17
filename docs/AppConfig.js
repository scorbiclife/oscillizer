import SimpleTotalisticBoard from './Engine/Board/SimpleBoard/SimpleTotalisticBoard.js';
import TotalisticRule from './BaseTypes/Rule/TotalisticRule.js';

const life = new TotalisticRule([3], [2, 3]);

/**
 * @typedef {import('./Engine/Board/IBoard.js').IBoard} IBoard
 */

/**
 * Create and return a new two-state board with the given pattern and rule.
 * @todo `rule` should be changed later to support different rulestings.
 *
 * @function makeBoard
 * @param {TwoStatePattern} pattern - The initial pattern.
 * @param {Object} [rule] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
export const makeBoard = (pattern, rule = life) => new SimpleTotalisticBoard(pattern, rule);

/**
 * Create and return a new empty board with the given rule.
 * @todo `rule` should be changed later to support different rulestings.
 *
 * @function makeBoard
 * @param {Object} [rule] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
export const makeEmptyBoard = (rule = life) => new SimpleTotalisticBoard([], rule);
