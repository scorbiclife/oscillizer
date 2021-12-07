import AppState from './MVC/Models/AppState';
import EventTargetPassingController from './MVC/Controllers/PassingController/EventTargetPassingController';
import OscStatsController from './MVC/Controllers/OscStatsController/OscStatsController';
import OscillizerCanvasView from './MVC/Views/OscillizerCanvasView/OscillizerCanvasView';
import OscStatsView from './MVC/Views/OscStatsView/OscStatsView';

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

const oscController = new OscStatsController(appState.oscInfo, inputRleContainer);
const cellStyleController = new EventTargetPassingController(appState.initialCellStyle);

inputRleSubmitter.addEventListener('click', oscController.update);
cellStyleSelector.addEventListener('change', cellStyleController.update);

/* State -> UI update code */

const oscCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById('output-osc-canvas'));
const oscCanvasView = new OscillizerCanvasView(
  appState.oscInfo, appState.initialCellStyle, oscCanvas
);
appState.oscInfo.eventTarget.addEventListener('change', oscCanvasView.update);

const oscStatsElement = document.getElementById('output-osc-data');
const oscStatsView = new OscStatsView(appState.oscInfo, oscStatsElement);
appState.oscInfo.eventTarget.addEventListener('change', oscStatsView.update);
