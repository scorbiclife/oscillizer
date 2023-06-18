<<<<<<<< HEAD:src/AppConfig.js
import SimpleTotalisticBoard from "./Engine/Board/SimpleBoard/SimpleTotalisticBoard.js";
import TotalisticRule from "./BaseTypes/Rule/TotalisticRule.js";
import INTRule from "./BaseTypes/Rule/INTRule.js";
import SimpleINTBoard from "./Engine/Board/SimpleBoard/SimpleINTBoard.js";
========
import SimpleTotalisticBoard from './Engine/Board/SimpleBoard/SimpleTotalisticBoard';
import TotalisticRule from './BaseTypes/Rule/TotalisticRule';
import INTRule from './BaseTypes/Rule/INTRule';
import SimpleINTBoard from './Engine/Board/SimpleBoard/SimpleINTBoard';
>>>>>>>> parent of 4f4aee5 (Ops: Revert typescript):src/AppConfig.ts

const life = new TotalisticRule([3], [2, 3]);

/**
 * @typedef {import('./Engine/Board/IBoard.js').IBoard} IBoard
 * @typedef {import('./BaseTypes/Rule/Rule.js').Rule} Rule
 */

/**
 * Create and return a new two-state board with the given pattern and rule.
 * @todo `rule` should be changed later to support different rulestings.
 *
 * @function makeBoard
 * @param {TwoStatePattern} pattern - The initial pattern.
 * @param {Rule} [rule=life] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
export const makeBoard = (pattern, rule = life) => {
  if (rule.constructor === TotalisticRule) {
    return new SimpleTotalisticBoard(pattern, rule);
  }
  if (rule.constructor === INTRule) {
    return new SimpleINTBoard(pattern, rule);
  }
  throw new Error("Invalid Rule!");
};

/**
 * Create and return a new empty board with the given rule.
 * @todo `rule` should be changed later to support different rulestings.
 *
 * @function makeBoard
 * @param {Rule} [rule] - The rule to use, this should be compatible with the board used.
 * @returns {IBoard} - The board
 */
export const makeEmptyBoard = (rule = life) => makeBoard([], rule);
