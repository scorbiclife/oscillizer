import { conwaylife } from './carules.js';
import OrdSet from './orderedvalueset.js';

const coordCompareFunction = ([xa, ya], [xb, yb]) => (xa - xb) || (ya - yb);
const cellDataCompareFunction = (
  ({ cell: ca }, { cell: cb }) => coordCompareFunction(ca, cb)
);

// Return the period of an oscillator given the array of cells.
export const getPeriod = (cellArray, maxPeriod = 1000) => {
  const cellSet = new OrdSet(cellArray, coordCompareFunction);
  const gens = new Array(maxPeriod).fill();
  const periodInfo = gens.reduce(
    ({ foundPeriod, cells, gen }) => {
      if (foundPeriod) {
        return { foundPeriod, cells: null, gen };
      }
      const newGen = gen + 1;
      const newCells = conwaylife(cells);
      const newFoundPeriod = cellSet.dataEquals(newCells);
      return { foundPeriod: newFoundPeriod, cells: newCells, gen: newGen };
    },
    { foundPeriod: false, cells: cellArray, gen: 0 }
  );
  return (periodInfo.foundPeriod) ? periodInfo.gen : -1;
};

// Helper for `getCellAliveGenerations`
const addCellsToAliveGensData = (data, cells, gen) => {
  cells.forEach((cell) => {
    if (!data.has({ cell })) {
      data.set({ cell, aliveGens: [] });
    }
    data.get({ cell }).aliveGens.push(gen);
  });
  return data;
};

// For each cell ever been alive in gens 0..period-1,
// gather the generations where the cells has been alive.
// Return `OrdSet`s containing `{ cell, aliveGens }`.
export const getCellAliveGenerations = (cellArray, period) => {
  const gens = new Array(period).fill(null).map((_, i) => i);
  const cellAliveGensInfo = gens.reduce(
    ({ data, currCells }, gen) => {
      // `cells`: `cellArray` at `gen`
      const newData = addCellsToAliveGensData(data, currCells, gen);
      const newCells = conwaylife(currCells);
      return { data: newData, currCells: newCells };
    },
    { data: new OrdSet([], cellDataCompareFunction), currCells: cellArray }
  );
  return cellAliveGensInfo.data;
};

const getSubperiodFromAliveGens = (aliveGens, period) => {
  const aliveGensSet = new Set(aliveGens);
  const subperiods = new Array(period)
    .fill(0)
    .map((_, i) => i + 1)
    .filter((n) => period % n === 0);
  const isSubperiodValid = (n) => aliveGens
    .map((g) => (g + n) % period)
    .every((g) => aliveGensSet.has(g));
  const validSubperiods = subperiods.filter(isSubperiodValid);
  return Math.min(...validSubperiods);
};

// Get a pattern as a list of cells (i.e. [[x, y] ... ])
// Return a list of cells and subperiods as { cell: [x, y], subperiod }
export const getSubperiods = (pattern, maxPeriod = 1000) => {
  const period = getPeriod(pattern, maxPeriod);
  const patternAliveGens = getCellAliveGenerations(pattern, period);
  const patternSubperiods = patternAliveGens.items.map(({ cell, aliveGens }) => {
    const subperiod = getSubperiodFromAliveGens(aliveGens, period);
    return { cell, subperiod };
  });
  return patternSubperiods;
};

export const getBoundingBox = (cells) => {
  const addCellToBoundingBox = (box, [x, y]) => ({
    xmin: (x < box.xmin) ? x : box.xmin,
    xmax: (x > box.xmax) ? x : box.xmax,
    ymin: (y < box.ymin) ? y : box.ymin,
    ymax: (y > box.ymax) ? y : box.ymax,
  });

  const initialBox = {
    xmin: Infinity, ymin: Infinity, xmax: -Infinity, ymax: -Infinity,
  };

  return cells.reduce(addCellToBoundingBox, initialBox);
};
