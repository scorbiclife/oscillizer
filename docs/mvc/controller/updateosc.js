import * as rle from '../../lib/preprocess/rle.js';
import * as osc from '../../lib/engine/osc.js';

const getBoundingBox = (cells) => {
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

const getPopulations = (patterns) => patterns.map((p) => p.length);

const getRotorCount = (subperiods) => (
  subperiods.filter(({ subperiod }) => subperiod !== 1).length
);

const getStrictRotorCount = (subperiods, period) => (
  subperiods.filter(({ subperiod }) => subperiod === period).length
);

const makeUpdateOscInfoAndStats = (appState, source) => (event) => {
  const getOscData = (pattern) => {
    const phases = osc.getAllPhases(pattern);
    const period = phases.length;
    if (period === 0) {
      return { success: false };
    }
    const subperiodsByCell = osc.getSubperiodByCell(phases);
    return {
      success: true,
      pattern,
      phases,
      subperiods: subperiodsByCell,
    };
  };

  const getOscInfo = (oscData) => {
    const {
      success, pattern, phases, subperiods,
    } = oscData;

    if (!success) {
      return { success: false };
    }

    const boundingBox = getBoundingBox(subperiods.map(({ cell }) => cell));

    return {
      success: true,
      pattern,
      period: phases.length,
      subperiods,
      boundingBox,
    };
  };

  const getOscStats = (oscData) => {
    const {
      success, phases, subperiods,
    } = oscData;

    if (!success) {
      return { success: false };
    }

    const period = phases.length;

    const populations = getPopulations(phases);
    const minPop = Math.min(...populations);
    const maxPop = Math.max(...populations);
    const avgPop = (
      populations.reduce((a, b) => a + b, 0) / populations.length
    ).toFixed(2);

    const numRotorCells = getRotorCount(subperiods);
    const numCells = subperiods.length;
    const numStatorCells = numCells - numRotorCells;
    const numStrictRotorCells = getStrictRotorCount(subperiods, period);
    const volatility = `${((numRotorCells / numCells) * 100).toFixed(2)}%`;
    const strictVolatility = `${((numStrictRotorCells / numCells) * 100).toFixed(2)}%`;

    const boundingBox = getBoundingBox(subperiods.map(({ cell }) => cell));
    const width = boundingBox.xmax - boundingBox.xmin + 1;
    const height = boundingBox.ymax - boundingBox.ymin + 1;

    const result = {
      success: true,
      period,
      minPop,
      maxPop,
      avgPop,
      numRotorCells,
      numStatorCells,
      numStrictRotorCells,
      numCells,
      volatility,
      strictVolatility,
      width,
      height,
    };
    return result;
  };

  // Main function logic
  if (!event.target) {
    return;
  }

  const pattern = rle.parse(source.value);
  const oscData = getOscData(pattern);
  appState.oscInfo.setValue(getOscInfo(oscData));
  appState.oscStatistics.setValue(getOscStats(oscData));
};

export default makeUpdateOscInfoAndStats;
