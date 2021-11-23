import AbcSimpleBoard from './AbcSimpleBoard.js';
import CellMap from '../../../BaseTypes/CellMap.js';
import { intNeighborsByIndex } from '../../../BaseTypes/Neighbors/INTNeighbors.js';

/**
 * @typedef {import('./AbcSimpleBoard').TransitionFunction} TransitionFunction
 */

const weightsByRelPos = new Map([
  [[-1, -1], 1],
  [[-1, 0], 2],
  [[-1, 1], 4],
  [[0, -1], 8],
  [[0, 0], 16],
  [[0, 1], 32],
  [[1, -1], 64],
  [[1, 0], 128],
  [[1, 1], 256],
]);

/**
 * @private
 * @param {Array<Cell>} cellsArray
 * @returns {CellMap}
 */
const getNeighborTransitionIndexes = (cellsArray) => {
  const neighborTransitions = new CellMap();
  cellsArray.forEach(([x, y]) => {
    weightsByRelPos.forEach((w, [dx, dy]) => {
      const targetCell = [x - dx, y - dy]; // So that [x, y] is at rel. pos. [dx, dy]
      const currentWeight = neighborTransitions.get(targetCell) || 0;
      neighborTransitions.set(targetCell, currentWeight + w);
    });
  });
  return neighborTransitions;
};

/**
 * @private
 * @param {INTRule} rule
 * @returns {TransitionFunction}
 */
const makeTransitionFunction = (rule) => (cellsArray) => {
  const transitionIndexesByCell = getNeighborTransitionIndexes(cellsArray);
  const nextCells = [...transitionIndexesByCell.entries()]
    .filter(([, tIndex]) => {
      // The 0x10 bit is the center cell.
      // eslint-disable-next-line no-bitwise
      const cellIsAlive = (tIndex & 0x10) !== 0;
      const validTransitions = cellIsAlive ? rule.survivals : rule.births;
      return validTransitions.includes(intNeighborsByIndex[tIndex]);
    })
    .map(([cell] /* [cell, tIndex] */) => cell);
  return nextCells;
};

class SimpleINTBoard extends AbcSimpleBoard {
  /**
   * @param {TwoStatePattern} pattern
   * @param {INTRule} rule
   * @param {number} gen
   */
  constructor(pattern, rule, gen = 0) {
    super(pattern, rule, gen);
    /** @type {TransitionFunction} */
    this.transitionFunction = makeTransitionFunction(rule);
  }
}

export default SimpleINTBoard;
