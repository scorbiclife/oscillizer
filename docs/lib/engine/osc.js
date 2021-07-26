import { conwaylife } from './ca.js';
import CellMap from './cellmap.js';

// Helper function for `getPatternsDuringPeriod`.
// Pushes new pattern to the list of patterns
const appendNextPattern = ({
  result,
  lastPatterns,
  initialCellsSet,
  rule,
}) => {
  if (result !== undefined) {
    return { result };
  }
  const lastPattern = lastPatterns[lastPatterns.length - 1];
  const currPattern = rule(lastPattern);
  const oscillating = (
    currPattern.length === initialCellsSet.size
    && currPattern.every((cell) => initialCellsSet.has(cell))
  );
  if (oscillating) {
    return { result: lastPatterns };
  }
  lastPatterns.push(currPattern);
  return {
    result: undefined,
    lastPatterns,
    initialCellsSet,
    rule,
  };
};

// For an oscillator at gens 0..period-1
// Return an empty array if the pattern does not go back to gen 0 in `maxGens`
const getPatternsDuringOscillation = (cellsArray, maxGens, rule) => {
  const repeatForMaxGens = new Array(maxGens).fill();
  const initialData = {
    result: undefined,
    lastPatterns: [cellsArray],
    initialCellsSet: CellMap.fromKeys(cellsArray),
    rule,
  };
  const pattern = repeatForMaxGens.reduce(appendNextPattern, initialData).result;
  return pattern || []; // Return empty array on failure
};

// Return the period of an oscillator for given `cellsArray`.
// Return 0 if the pattern does not go back to gen 0 in `maxGens`
export const getPeriod = (cellsArray, maxGens = 1000, rule = conwaylife) => {
  const maybePeriod = getPatternsDuringOscillation(cellsArray, maxGens, rule).length;
  return maybePeriod || 0;
};

// Get the list of patterns.
// Return a list of `{ cell, aliveGens }` where `aliveGens` is the gens `cell` was alive.
const getCellsAndAliveGensFromPatterns = (patterns) => {
  const patternSets = patterns.map(CellMap.fromKeys);
  const allCells = CellMap.fromKeys([].concat(...patterns)).keys();
  const gens = patterns.map((pat, gen) => gen);
  return allCells.map(
    (cell) => ({
      cell,
      aliveGens: gens.filter((gen) => patternSets[gen].has(cell)),
    })
  );
};

// Get the list of aliveGens.
// Return the subperiod.
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
// Return A list of:
// - period
// - subperiods: { cell: [x, y], subperiod: int (subperiod for cell) }
// If the pattern doesn't oscillate, return [0, null].
export const getPeriodAndSubperiods = (pattern, maxPeriod = 1000, rule = conwaylife) => {
  const patterns = getPatternsDuringOscillation(pattern, maxPeriod, rule);
  const period = patterns.length;
  if (period === 0) {
    return [period, null];
  }
  const cellsAndAliveGens = getCellsAndAliveGensFromPatterns(patterns);
  const patternSubperiods = cellsAndAliveGens.map(
    ({ cell, aliveGens }) => {
      const subperiod = getSubperiodFromAliveGens(aliveGens, period);
      return { cell, subperiod };
    }
  );
  return [period, patternSubperiods];
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
