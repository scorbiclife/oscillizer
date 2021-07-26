import { conwaylife } from './ca.js';
import CellMap from './cellmap.js';

// Return the period of an oscillator for given `cellsSet`.
// The function tries at most `maxPeriod` gens.
// If the pattern doesn't oscillate at the given timeframe, return -1.
export const getPeriod = (cellsArray, maxPeriod = 1000, rule = conwaylife) => {
  const initialCellsSet = CellMap.fromKeys(cellsArray);
  const gens = new Array(maxPeriod).fill();
  const periodInfo = gens.reduce(
    ({ foundPeriod, cells, gen }) => {
      if (foundPeriod !== -1) {
        return { foundPeriod };
      }
      const newGen = gen + 1;
      const newCells = rule(cells);
      const oscillated = (
        (initialCellsSet.size === newCells.length)
        && newCells.every((cell) => initialCellsSet.has(cell))
      );
      const newFoundPeriod = (oscillated ? newGen : -1);
      return { foundPeriod: newFoundPeriod, cells: newCells, gen: newGen };
    },
    { foundPeriod: -1, cells: cellsArray, gen: 0 }
  );
  return periodInfo.foundPeriod;
};

// For each cell ever been alive in gens 0..period-1,
// gather the generations where the cells has been alive.
const getCellAndAliveGens = (pattern, period, rule = conwaylife) => {
  const periodMinusOneTimes = new Array(period - 1).fill();
  const concatIteration = (f) => (l) => {
    const lastItem = l[l.length - 1];
    const newItem = f(lastItem);
    return l.concat([newItem]);
  };
  const patternsAtEachGen = periodMinusOneTimes.reduce(concatIteration(rule), [pattern]);
  const aliveGensMap = new CellMap();
  patternsAtEachGen.forEach((pat, gen) => {
    pat.forEach((cell) => {
      const cellAliveGens = aliveGensMap.get(cell) || [];
      aliveGensMap.set(cell, cellAliveGens.concat([gen]));
    });
  });
  return aliveGensMap;
};

const getSubperiodFromAliveGens = (aliveGens, period) => {
  const aliveGensSet = new Set(aliveGens);
  const subperiods = new Array(period)
    .fill()
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
// If the pattern doesn't oscillate, return null.
export const getSubperiods = (pattern, maxPeriod = 1000) => {
  const period = getPeriod(pattern, maxPeriod);
  if (period === -1) {
    return null;
  }
  const cellsAndAliveGens = [
    ...getCellAndAliveGens(pattern, period).entries(),
  ];
  const patternSubperiods = cellsAndAliveGens.map(([cell, aliveGens]) => {
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
