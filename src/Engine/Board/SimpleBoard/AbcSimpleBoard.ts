import BoundingBox from '../../../BaseTypes/BoundingBox';

/**
 * @typedef {import('../../../BaseTypes/Rule/Rule').Rule} Rule
 * @typedef {import('../IBoard').IBoard} IBoard
 * @typedef {import('./SimpleTotalisticBoard').default} SimpleTotalisticBoard
 */

/**
 * @typedef {function(Array<Cell>): Array<Cell>} TransitionFunction
 */

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
 *  with the rule given as the parameter, with the proper type of {@link TransitionFunction}.
 *  For example classes, see {@link SimpleTotalisticBoard}.
 *
 * @implements {IBoard}
 *
 */
class AbcSimpleBoard {
  /**
   * @param {TwoStatePattern} pattern
   * @param {Rule} rule
   * @param {number} gen
   */
  constructor(pattern, rule, gen) {
    /** @type {TwoStatePattern} */
    this.pattern = pattern;
    /** @type {Rule} */
    this.rule = rule;
    /** @type {number} */
    this.gen = gen;
    /**
     * This should be overriden by concrete implementations!
     * @type {any}
     */
    this.transitionFunction = undefined;
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
   * @returns {AbcSimpleBoard} - The new board
   */
  after(gens = 1) {
    const repeatForGens = new Array(gens).fill();
    /** @type {TransitionFunction} */
    const transFunc = this.transitionFunction;
    /** @type {Array<Cell>} */
    const iteratedPattern = repeatForGens.reduce(transFunc, this.pattern);
    /** @type {any} */
    const ThisClass = this.constructor;
    return new ThisClass(iteratedPattern, this.rule, this.gen + gens);
  }
}

export default AbcSimpleBoard;
