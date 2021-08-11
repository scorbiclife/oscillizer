import CellMap from '../../../BaseTypes/CellMap.js';
import Rule from '../../../BaseTypes/Rule/Rule.js';

/** @module */

const neighborhood = {
  moore: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]],
};

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
 * Given the birth and survival conditions, return the totalistic rule.
 *
 * @param {totalisticRule}
 * @returns {SimpleRule}
 */
export const simpleBoardTotalisticRule = (totalisticRule) => (cellsArray) => {
  const { births, survivals } = totalisticRule;
  const neighborCounts = getNeighborCounts(cellsArray, neighborhood.moore);
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
 * @type {SimpleRule}
 */
export const simpleBoardConwayLife = simpleBoardTotalisticRule(
  new Rule.TotalisticRule([3], [2, 3])
);
