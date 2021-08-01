import AppState from './mvc/model/appstate.js';
import updateOscillizerCanvas from './mvc/view/updateoscillizercanvas.js';
import updateOscInfo from './mvc/controller/updateoscinfo.js';
import pipeEventTo from './mvc/controller/pipe.js';

const appState = {
  /* oscInfo.value: {
      success,
      pattern,
      period,
      subperiods,
      boundingBox,
    }
  */
  oscInfo: new AppState(),

  /*
    Cell style for cells at gen 0
    this.value: cellStyles.property
  */
  initialCellStyle: new AppState(),
};

if (window.Cypress) {
  window.appState = appState;
}

/* Action -> State update code */

const eventHandlers = {
  inputRleSubmitter: document.getElementById('input-rle-submitter'),
  cellStyleSelectors: document.getElementById('cell-style-selector'),
};

const inputRleContainer = document.getElementById('input-rle-container');

eventHandlers.inputRleSubmitter.addEventListener('click', updateOscInfo(appState, inputRleContainer));
eventHandlers.cellStyleSelectors.addEventListener('change', pipeEventTo(appState.initialCellStyle));

/* State -> UI update code */

appState.oscInfo.eventTarget.addEventListener('change', updateOscillizerCanvas(appState));
