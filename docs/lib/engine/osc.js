import { conwaylife } from './Board/SimpleBoard/SimpleRules/totalisticRule.js';
import CellMap from './BaseTypes/CellMap.js';

// For an oscillator at gens 0..period-1
// Return an empty array if the pattern does not go back to gen 0 in `maxGens`
export const getPhases = (cellsArray, maxGens = 1000, rule = conwaylife) => {
  const haveSameMembers = (array, set) => (
    array.length === set.size && array.every((cell) => set.has(cell))
  );

  const appendNextPattern = ({
    result,
    lastPatterns,
    initialCellsSet,
  }) => {
    if (result !== undefined) {
      return { result };
    }
    const lastPattern = lastPatterns[lastPatterns.length - 1];
    const currPattern = rule(lastPattern);
    if (haveSameMembers(currPattern, initialCellsSet)) {
      return { result: lastPatterns };
    }
    lastPatterns.push(currPattern);
    return {
      result: undefined,
      lastPatterns,
      initialCellsSet,
    };
  };

  const repeatForMaxGens = new Array(maxGens).fill();
  const initialData = {
    result: undefined,
    lastPatterns: [cellsArray],
    initialCellsSet: CellMap.fromKeys(cellsArray),
  };
  const pattern = repeatForMaxGens.reduce(appendNextPattern, initialData).result;
  return pattern || []; // Return empty array on failure
};

// Return the period of an oscillator for given `cellsArray`.
// Return 0 if the pattern does not go back to gen 0 in `maxGens`
export const getPeriod = (cellsArray, maxGens = 1000, rule = conwaylife) => {
  const maybePeriod = getPhases(cellsArray, maxGens, rule).length;
  return maybePeriod || 0;
};

// From
export const getSubperiodByCell = (oscPhases) => {
  // Get the list of oscillator phases.
  // Return a list of `{ cell, aliveGens }` where `aliveGens` is the gens `cell` was alive.
  const getAliveGensByCell = (phases) => {
    const phasesSet = phases.map(CellMap.fromKeys);
    const allCells = CellMap.fromKeys([].concat(...phases)).keys();
    const gens = phases.map((_, gen) => gen);
    return allCells.map(
      (cell) => ({
        cell,
        aliveGens: gens.filter((gen) => phasesSet[gen].has(cell)),
      })
    );
  };

  // Get the list of gens a cell was alive.
  // Return the subperiod.
  const getSubperiodOfOneCell = (aliveGens, period) => {
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

  const period = oscPhases.length;
  const result = getAliveGensByCell(oscPhases).map(
    ({ cell, aliveGens }) => (
      {
        cell,
        subperiod: getSubperiodOfOneCell(aliveGens, period),
      }
    )
  );
  return result;
};
