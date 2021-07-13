import OrdSet from './orderedvalueset';

export const neighborhood = {
  moore: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
};

const coordCompareFunction = ([xa, ya], [xb, yb]) => (xa - xb) || (ya - yb);
const coordDataCompareFunction = (
  ({ cell: [xa, ya] }, { cell: [xb, yb] }) => (xa - xb) || (ya - yb)
);

export const getNeighborCounts = (cellSet, neighbors) => {
  // Prepare the neighbors
  const makeTranslatedCells = ([dx, dy]) => {
    const translatedCellArray = cellSet.items.map(([x, y]) => [x + dx, y + dy]);
    return new OrdSet(translatedCellArray, coordCompareFunction);
  };
  const neighborCells = neighbors.map(makeTranslatedCells);

  // Count the neighbors
  const addCellsToCount = (currCount, newCells) => {
    newCells.items.forEach((cell) => {
      const maybeCount = currCount.get({ cell });
      const oldCount = maybeCount !== undefined ? maybeCount.count : 0;
      currCount.set({ cell, count: oldCount + 1 });
    });
    return currCount;
  };
  const initialNeighborCounts = new OrdSet([], coordDataCompareFunction);
  const neighborCounts = neighborCells.reduce(addCellsToCount, initialNeighborCounts);

  return neighborCounts;
};

export const conwaylife = (cellArray) => {
  const cellSet = new OrdSet(cellArray, coordCompareFunction);
  const neighborCounts = getNeighborCounts(cellSet, neighborhood.moore);
  const lifeRule = ({ cell, count }) => (
    (count === 3) || (cellSet.has(cell) && count === 2)
  );
  return neighborCounts.items.filter(lifeRule).map((item) => item.cell);
};
