import CellMap from './cellmap.js';

export const neighborhood = {
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

export const totalisticRule = (births, survivals) => (cellsArray) => {
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

export const conwaylife = totalisticRule([3], [2, 3]);
