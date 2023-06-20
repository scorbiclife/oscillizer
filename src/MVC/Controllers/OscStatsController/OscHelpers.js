import BoundingBox from '../../../BaseTypes/BoundingBox.js';
import CellMap from '../../../BaseTypes/CellMap.js';

/**
 * Helper functions for oscillator-related functionality
 * @module
 */

/**
 * @typedef {import('../../../Engine/Board/IBoard.js').IBoard} IBoard
 */

/**
 * Given an oscillator, return the board of each phase of the oscillation. (t=0..p-1)
 * Given a non-oscillator, return `[]`.
 * @param {IBoard} board - The initial board.
 * @param {number} maxGens - Maximum number of gens to detect oscillation.
 * @returns {Array<IBoard>} - All phases of the oscillator, or an empty array.
 */
export const getPhases = (board, maxGens = 1000) => {
  /**
   * @param {Array} array
   * @param {Set} set
   * @returns {boolean}
   */
  const haveSameMembers = (array, set) => (
    array.length === set.size && array.every((cell) => set.has(cell))
  );

  const appendNextBoard = ({ result, lastBoards, initialCellsSet }) => {
    if (result.length !== 0) {
      return { result, lastBoards, initialCellsSet };
    }
    /** @type {IBoard} */
    const lastBoard = lastBoards[lastBoards.length - 1];
    /** @type {IBoard} */
    const currBoard = lastBoard.after();
    if (haveSameMembers(currBoard.getCells(), initialCellsSet)) {
      return {
        result: lastBoards,
        lastBoards: [],
        initialCellsSet,
      };
    }
    return {
      result: [],
      lastBoards: lastBoards.concat(currBoard),
      initialCellsSet,
    };
  };

  const repeatForMaxGens = new Array(maxGens).fill();
  const initialData = {
    result: [],
    lastBoards: [board],
    initialCellsSet: CellMap.fromKeys(board.getCells()),
  };
  const phases = repeatForMaxGens.reduce(appendNextBoard, initialData).result;
  return phases; // Return empty array on failure
};

/**
 * Given the phases of an oscillator, calculate and return the subperiod of each cell.
 * @param {Array<IBoard>} oscPhaseBoards - The phases of an oscillator
 * @returns {Array<{cell: Cell, subperiod: number}>} - Subperiods for every cell.
 */
export const getSubperiodByCell = (oscPhaseBoards) => {
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

  const period = oscPhaseBoards.length;
  const result = getAliveGensByCell(oscPhaseBoards.map((b) => b.getCells()))
    .map(
      ({ cell, aliveGens }) => (
        {
          cell,
          subperiod: getSubperiodOfOneCell(aliveGens, period),
        }
      )
    );
  return result;
};

/**
 * Given a board of the oscillator, return the stats of the oscillator.
 * @param {IBoard} board - Initial oscillator
 * @returns {*} stats - The oscillator statistics
 */
export const getOscStats = (board) => {
  // Basic functions
  /** @type {function(Array<number>): number} */
  const getAverage = (l) => (l.reduce((a, b) => a + b, 0) / l.length);

  /** @type {function(number): string} */
  const formatFloat = (f) => f.toFixed(2);

  /** @type {function(number): string} */
  const formatPercentage = (f) => `${(100 * f).toFixed(2)}%`;

  // Status functions
  /** @typedef {Array<{cell: Cell, subperiod: number}>} Subperiods */

  /** @type {function(Subperiods): number} */
  const getRotorCount = (subperiods) => (
    subperiods.filter(({ subperiod }) => subperiod !== 1).length
  );

  /** @type {function(Subperiods, number): number} */
  const getStrictRotorCount = (subperiods, period) => (
    subperiods.filter(({ subperiod }) => subperiod === period).length
  );

  /** @type {function(Subperiods): number} */
  const getVolatility = (subperiods) => (
    getRotorCount(subperiods) / subperiods.length
  );

  /** @type {function(Subperiods, number): number} */
  const getStrictVolatility = (subperiods, period) => (
    getStrictRotorCount(subperiods, period) / subperiods.length
  );

  // Main code
  const phaseBoards = getPhases(board);
  const period = phaseBoards.length;
  if (period === 0) {
    return {
      success: false,
      message: 'Failed to detect period of pattern',
    };
  }
  const populations = phaseBoards.map((b) => b.getPop());
  const subperiods = getSubperiodByCell(phaseBoards);

  const result = {
    success: true,
    pattern: board.getCells(),
    period,
    phases: phaseBoards.map((p) => p.getCells()),
    subperiods,
    minPop: Math.min(...populations),
    maxPop: Math.max(...populations),
    avgPop: formatFloat(getAverage(populations)),
    numCells: subperiods.length,
    numRotorCells: getRotorCount(subperiods),
    numStatorCells: subperiods.length - getRotorCount(subperiods),
    numStrictRotorCells: getStrictRotorCount(subperiods, period),
    volatility: formatPercentage(getVolatility(subperiods)),
    strictVolatility: formatPercentage(getStrictVolatility(subperiods, period)),
    boundingBox: BoundingBox.sum(phaseBoards.map((p) => p.getBox())),
  };
  return result;
};
