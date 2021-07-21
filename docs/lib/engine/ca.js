import { cellToString, cellFromString } from './cell.js';

export const neighborhood = {
  moore: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]],
};

const getNeighborCounts = (cellsArray, neighbors) => {
  const translateCellsArray = ([dx, dy]) => (
    cellsArray.map(([x, y]) => cellToString([x + dx, y + dy]))
  );
  const translatedPatterns = neighbors.map(translateCellsArray);
  const translatedCells = [].concat(...translatedPatterns);
  const neighborCounts = new Map();
  translatedCells.forEach((cell) => {
    const count = neighborCounts.get(cell) || 0;
    neighborCounts.set(cell, count + 1);
  });
  return neighborCounts;
};

export const totalisticRule = (births, survivals) => (cellsArray) => {
  const strCellsNeighborCounts = getNeighborCounts(cellsArray, neighborhood.moore);
  const strCellsSet = new Set(cellsArray.map(cellToString));
  const ruleCondition = ([cell, count]) => (
    strCellsSet.has(cell) ? survivals.includes(count - 1) : births.includes(count)
  );
  const strCellsAndCounts = [...strCellsNeighborCounts.entries()];
  return (
    strCellsAndCounts
      .filter(ruleCondition)
      .map(([strCell]) => cellFromString(strCell))
  );
};

export const conwaylife = totalisticRule([3], [2, 3]);
