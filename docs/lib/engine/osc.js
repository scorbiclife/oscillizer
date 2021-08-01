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
export const getAllPhases = (cellsArray, maxGens = 1000, rule = conwaylife) => {
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
  const maybePeriod = getAllPhases(cellsArray, maxGens, rule).length;
  return maybePeriod || 0;
};

// Get the list of patterns.
// Return a list of `{ cell, aliveGens }` where `aliveGens` is the gens `cell` was alive.
const getAliveGensByCell = (patterns) => {
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

export const getSubperiodByCell = (patterns) => {
  const period = patterns.length;
  const result = getAliveGensByCell(patterns).map(
    ({ cell, aliveGens }) => ({
      cell,
      subperiod: getSubperiodFromAliveGens(aliveGens, period),
    })
  );
  return result;
};
