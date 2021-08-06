import BoundingBox from '../../BaseTypes/BoundingBox.js';

/**
 * In a {@link SimpleBoard}, a rule is implemented as
 * a function
 * that receives a pattern
 * and returns the pattern iterated to the next generation.
 * @typedef SimpleBoard#Rule
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
   * @param {SimpleBoard#Rule} rule - The rule to operate on the pattern with.
   * @param {TwoStatePattern} pattern - The initial pattern.
   * @param {number} [gen=0] - The initial generation.
   */
  constructor(pattern, rule, gen = 0) {
    this.pattern = pattern;
    this.rule = rule;
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
