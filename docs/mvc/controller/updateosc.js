import * as rle from '../../lib/preprocess/rle.js';
import * as osc from '../../lib/engine/osc.js';
import BoundingBox from '../../lib/engine/BaseTypes/BoundingBox.js';
import * as AppConfig from '../../AppConfig.js';

const makeUpdateOscStats = (target, source) => (event) => {
  const getOscStats = (board) => {
    // Basic functions
    const getAverage = (l) => (l.reduce((a, b) => a + b, 0) / l.length);
    const formatFloat = (f) => f.toFixed(2);
    const formatPercentage = (f) => `${(100 * f).toFixed(2)}%`;

    // Status functions
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

    // Main code
    const phaseBoards = osc.getPhases(board);
    const period = phaseBoards.length;
    if (period === 0) {
      return { success: false };
    }
    const populations = phaseBoards.map((b) => b.getPop());
    const subperiods = osc.getSubperiodByCell(phaseBoards);

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
      numStrictRotorCells: getStrictRotorCount(subperiods),
      volatility: formatPercentage(getVolatility(subperiods, period)),
      strictVolatility: formatPercentage(getStrictVolatility(subperiods, period)),
      boundingBox: BoundingBox.sum(phaseBoards.map((p) => p.getBox())),
    };
    return result;
  };

  // Main `makeUpdateOsc...` logic
  if (!event.target) {
    return;
  }

  const [pattern, rule] = rle.parse(source.value);
  const initialBoard = AppConfig.makeTwoStateBoard(pattern, rule);
  target.setValue(getOscStats(initialBoard));
};

export default makeUpdateOscStats;
