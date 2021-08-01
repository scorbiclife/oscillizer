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
  if (!event.target) {
    return;
  }

  const pattern = rle.parse(source.value);
  const phases = osc.getAllPhases(pattern);
  const period = phases.length;
  if (period === 0) {
    appState.oscInfo.setValue({ success: false });
    appState.oscStatistics.setValue({ success: false });
    return;
  }
  const subperiodByCell = osc.getSubperiodByCell(phases);
  const boundingBox = getBoundingBox(subperiodByCell.map(({ cell }) => cell));

  appState.oscInfo.setValue({
    success: true,
    pattern,
    period,
    subperiods: subperiodByCell,
    boundingBox,
  });

  // Population statistics
  const populations = getPopulations(phases);
  const minPop = Math.min(...populations);
  const maxPop = Math.max(...populations);
  const avgPop = (
    populations.reduce((a, b) => a + b, 0) / populations.length
  ).toFixed(2);

  const numRotorCells = getRotorCount(subperiodByCell);
  const numCells = subperiodByCell.length;
  const numStatorCells = numCells - numRotorCells;
  const numStrictRotorCells = getStrictRotorCount(subperiodByCell, period);
  const volatility = `${((numRotorCells / numCells) * 100).toFixed(2)}%`;
  const strictVolatility = `${((numStrictRotorCells / numCells) * 100).toFixed(2)}%`;

  const width = boundingBox.xmax - boundingBox.xmin + 1;
  const height = boundingBox.ymax - boundingBox.ymin + 1;

  appState.oscStatistics.setValue({
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
  });
};

export default makeUpdateOscInfoAndStats;
