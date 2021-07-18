const appState = {
  rle: new EventTarget(),
};

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

rleHandler.inputbox.addEventListener('input', updateRLE);

/* State -> UI update code */

const updateDebugOutputElement = (/* event */) => {
  const debugOutputElement = document.getElementById('output-rle-debug');
  debugOutputElement.textContent = appState.rle.value;
};

appState.rle.addEventListener('change', updateDebugOutputElement);
