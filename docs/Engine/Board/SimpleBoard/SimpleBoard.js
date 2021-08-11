import BoundingBox from '../../../BaseTypes/BoundingBox.js';
import { simpleBoardTotalisticRule, simpleBoardConwayLife } from './SimpleRules/TotalisticRule.js';
import Rule from '../../../BaseTypes/Rule/Rule.js';

const transFunctionFromRule = new Map([
  [Rule.TotalisticRule, simpleBoardTotalisticRule],
  [Rule.INTRule, simpleBoardTotalisticRule],
]);

/** @module */

/**
 * In a {@link SimpleBoard}, a rule is implemented as
 * a function
 * that receives a pattern
 * and returns the pattern iterated to the next generation.
 * @typedef SimpleRule
 * @type {function}
 * @param {TwoStatePattern} pattern - The pattern to operate on.
 * @returns {TwoStatePattern} - The pattern at the next generation.
 */

/**
 * This simple class consists of a `pattern` and a `rule`.
 * It applies the `rule` on the `pattern` to get the next generation.
 * Other auxillary information is extracted from the `pattern`.
 * @class
 * @implements {IBoard}
 */
class SimpleBoard {
  /**
   * Initialize the board with the given pattern and rule.
   *
   * @constructor
   * @param {TwoStatePattern} pattern - The initial pattern.
   * @param {Rule} rule - The rule to operate on the pattern with.
   * @param {number} [gen=0] - The initial generation.
   */
  constructor(pattern, rule, gen = 0) {
    /** @type {TwoStatePattern} */
    this.pattern = pattern;

    const makeTrans = transFunctionFromRule.get(rule.constructor);

    /** @type {SimpleRule} */
    this.rule = makeTrans ? makeTrans(rule) : simpleBoardConwayLife;

    /** @type {number} */
    this.gen = gen;
  }

  getCells() {
    return this.pattern;
  }

  getCellsAndStates() {
    return this.pattern.map((cell) => [cell, 1]);
  }

  getBox() {
    return BoundingBox.sum(
      this.pattern.map(([x, y]) => new BoundingBox(x, x, y, y))
    );
  }

  getPop() {
    return this.pattern.length;
  }

  /**
   * Return a new board with the pattern iterated by the given amount.
   *
   * @param {number} [gens=1] - Number of generations to iterate
   * @returns {SimpleBoard} - The new board
   */
  after(gens = 1) {
    const repeatForGens = new Array(gens).fill();
    const iteratedPattern = repeatForGens.reduce(this.rule, this.pattern);
    return new SimpleBoard(iteratedPattern, this.rule, this.gen + gens);
  }
}

export default SimpleBoard;
