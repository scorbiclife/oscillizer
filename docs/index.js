import * as osc from './lib/ca/osc.js';
import * as rle from './lib/ca/rle.js';

const appState = {
  rle: new EventTarget(), /* this.value: string */
  oscInfo: new EventTarget(), /* this.value: { success, subperiods, boundingBox } */
};

if (window.Cypress) {
  window.appState = appState;
}

/* Action -> State update code */

const rleHandler = {
  inputbox: document.getElementById('input-rle'),
};

const updateRLE = (event) => {
  if (!event.target) {
    return;
  }
  const data = event.target.value || '';
  appState.rle.value = data;
  appState.rle.dispatchEvent(new Event('change'));
};

const updateOscInfo = (event) => {
  if (!event.target) {
    return;
  }

  const pattern = rle.parse(event.target.value);
  const period = osc.getPeriod(pattern);
  if (period === -1) {
    appState.oscInfo.value = { success: false };
    return;
  }
  const subperiods = osc.getSubperiods(pattern, period);
  const boundingBox = osc.getBoundingBox(subperiods.map(({ cell }) => cell));

  appState.oscInfo.value = { success: true, subperiods, boundingBox };
};

rleHandler.inputbox.addEventListener('input', updateRLE);
rleHandler.inputbox.addEventListener('input', updateOscInfo);

/* State -> UI update code */

const updateDebugOutputElement = (/* event */) => {
  const debugOutputElement = document.getElementById('output-debug');
  debugOutputElement.textContent = JSON.stringify(appState.oscInfo.value, undefined, 2);
};

appState.rle.addEventListener('change', updateDebugOutputElement);
