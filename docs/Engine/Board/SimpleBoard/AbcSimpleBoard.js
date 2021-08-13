import BoundingBox from '../../../BaseTypes/BoundingBox.js';

/**
 * This simple interface consists of a `pattern` and a `transitionFunction`.
 * It applies the `transitionFunction` on the `pattern` to get the next generation.
 * Other auxillary information is extracted from the `pattern`.
 *
 * IMPORTANT:
 *
 *  This class is made to reduce boilerplate.
 *  You don't need to inherit from this class;
 *  You just have to implement `I{Totalistic,INT}Board` interfaces.
 *
 *  If you are using this class, make sure to initialize `this.transitionFunction` properly,
 *  with the rule given as the parameter.
 *  For example classes, see {@link SimpleTotalisticBoard}.
 *
 * @class
 * @implements {IBoard}
 */
class AbcSimpleBoard {
  constructor(pattern, rule, gen) {
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
   * @returns {SimpleTotalisticBoard} - The new board
   */
  after(gens = 1) {
    const repeatForGens = new Array(gens).fill();
    const iteratedPattern = repeatForGens.reduce(this.transitionFunction, this.pattern);
    return new this.constructor(iteratedPattern, this.rule, this.gen + gens);
  }
}

export default AbcSimpleBoard;
