import AbcSimpleBoard from './AbcSimpleBoard.js';
import CellMap from '../../../BaseTypes/CellMap.js';

const moore = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]];

/**
 * @private
 * @param {Array<Cell>} cellsArray
 * @param {Array<Cell>} neighbors
 * @returns {CellMap}
 */
const getNeighborCounts = (cellsArray, neighbors) => {
  const neighborCountsMap = new CellMap();
  cellsArray.forEach(([x, y]) => {
    neighbors.forEach(([dx, dy]) => {
      const targetCell = [x + dx, y + dy];
      const count = neighborCountsMap.get(targetCell) || 0;
      neighborCountsMap.set(targetCell, count + 1);
    });
  });
  return neighborCountsMap;
};

/**
 * @typedef {import('./AbcSimpleBoard').TransitionFunction} TransitionFunction
 */

/**
 * @private
 * @param {TotalisticRule} totalisticRule
 * @returns {TransitionFunction}
 */
const makeTransFromTotalisticRule = (totalisticRule) => (cellsArray) => {
  const { births, survivals } = totalisticRule;
  const neighborCounts = getNeighborCounts(cellsArray, moore);
  const cellsSet = CellMap.fromKeys(cellsArray);
  const ruleCondition = ([cell, count]) => (
    cellsSet.has(cell)
      ? survivals.includes(count - 1) // -1: `count` includes `cell`, while B/S notation doesn't
      : births.includes(count)
  );
  return (
    [...neighborCounts.entries()]
      .filter(ruleCondition)
      .map(([cell/* count */]) => cell)
  );
};

/**
 * A sample implementation for totalistic rules.
 * @class
 * @implements {ITotalisticBoard}
 */
class SimpleTotalisticBoard extends AbcSimpleBoard {
  /**
   * Initialize the board with the given pattern and rule.
   *
   * @constructor
   * @param {TwoStatePattern} pattern - The initial pattern.
   * @param {TotalisticRule} rule - The rule to operate on the pattern with.
   * @param {number} [gen=0] - The initial generation.
   */
  constructor(pattern, rule, gen = 0) {
    super(pattern, rule, gen);
    this.transitionFunction = makeTransFromTotalisticRule(rule);
  }
}

export default SimpleTotalisticBoard;
