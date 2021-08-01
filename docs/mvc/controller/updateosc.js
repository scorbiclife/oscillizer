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
    // Basic functions
    const getAverage = (l) => (l.reduce((a, b) => a + b, 0) / l.length);
    const formatFloat = (f) => f.toFixed(2);
    const formatPercentage = (f) => `${(100 * f).toFixed(2)}%`;

    // Status functions
    const getPopulations = (patterns) => patterns.map((p) => p.length);
    const getRotorCount = (subperiods) => (
      subperiods.filter(({ subperiod }) => subperiod !== 1).length
    );
    const getStrictRotorCount = (subperiods, period) => (
      subperiods.filter(({ subperiod }) => subperiod === period).length
    );
    const getVolatility = (subperiods, period) => (
      getRotorCount(subperiods, period) / subperiods.length
    );
    const getStrictVolatility = (subperiods, period) => (
      getStrictRotorCount(subperiods, period) / subperiods.length
    );

    // Main logic
    const {
      success, phases, subperiods,
    } = oscData;

    if (!success) {
      return { success: false };
    }

    const period = phases.length;

    const result = {
      success: true,
      period,
      minPop: Math.min(...getPopulations(phases)),
      maxPop: Math.max(...getPopulations(phases)),
      avgPop: formatFloat(getAverage(getPopulations(phases))),
      numCells: subperiods.length,
      numRotorCells: getRotorCount(subperiods),
      numStatorCells: subperiods.length - getRotorCount(subperiods),
      numStrictRotorCells: getStrictRotorCount(subperiods),
      volatility: formatPercentage(getVolatility(subperiods, period)),
      strictVolatility: formatPercentage(getStrictVolatility(subperiods, period)),
      boundingBox: getBoundingBox(subperiods.map(({ cell }) => cell)),
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
