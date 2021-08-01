import * as rle from '../../lib/preprocess/rle.js';
import * as osc from '../../lib/engine/osc.js';
import getBoundingBox from '../../lib/engine/boundingbox.js';

const updateOscInfo = (appState, source) => (event) => {
  if (!event.target) {
    return;
  }

  const pattern = rle.parse(source.value);
  const [period, subperiods] = osc.getPeriodAndSubperiods(pattern);
  if (period === 0) {
    appState.oscInfo.setValue({ success: false });
    return;
  }
  const boundingBox = getBoundingBox(subperiods.map(({ cell }) => cell));

  appState.oscInfo.setValue({
    success: true,
    pattern,
    period,
    subperiods,
    boundingBox,
  });
};

export default updateOscInfo;
