import AppState from './mvc/model/appstate.js';
import makeUpdateOscillizerCanvas from './mvc/view/updateoscillizercanvas.js';
import makeUpdateOscillizerStatistics from './mvc/view/updateoscillizerstatistics.js';
import makeUpdateOscStats from './mvc/controller/updateosc.js';
import passEventTo from './mvc/controller/pipe.js';

const appState = {
  oscInfo: new AppState(),

  /*
    Cell style for cells at gen 0
    this.value: cellStyles.property
  */
  initialCellStyle: new AppState(),
};

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.appState = appState;
}

/* Action -> State update code */

const inputRleSubmitter = document.getElementById('input-rle-submitter');
const cellStyleSelector = document.getElementById('cell-style-selector');
const inputRleContainer = document.getElementById('input-rle-container');

const updateOscInfo = makeUpdateOscStats(appState.oscInfo, inputRleContainer);
const updateInitialCellStyle = passEventTo(appState.initialCellStyle);

inputRleSubmitter.addEventListener('click', updateOscInfo);
cellStyleSelector.addEventListener('change', updateInitialCellStyle);

/* State -> UI update code */

const updateCanvas = makeUpdateOscillizerCanvas(appState);
appState.oscInfo.eventTarget.addEventListener('change', updateCanvas);

const oscStatsElement = document.getElementById('output-osc-data');
const updateStats = makeUpdateOscillizerStatistics(appState.oscInfo, oscStatsElement);
appState.oscInfo.eventTarget.addEventListener('change', updateStats);
