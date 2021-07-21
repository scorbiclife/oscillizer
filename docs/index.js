import * as osc from './lib/engine/osc.js';
import * as rle from './lib/preprocess/rle.js';
import * as visuals from './lib/postprocess/visuals.js';

// The cells follow "box-sizing: border-box"

const appState = {
  rle: new EventTarget(), /* this.value: string */
  oscInfo: new EventTarget(), /* this.value: { success, subperiods, boundingBox } */
};

const appCache = {
  cellSizes: { cell: 10, border: 1 },
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

rleHandler.inputbox.addEventListener('change', updateRLE);

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
  appState.oscInfo.dispatchEvent(new Event('change'));
};

rleHandler.inputbox.addEventListener('change', updateOscInfo);

/* State -> UI update code */

const updateDebugOutputElement = (/* event */) => {
  const debugOutputElement = document.getElementById('output-debug');
  debugOutputElement.textContent = JSON.stringify(appState.oscInfo.value, undefined, 2);
};

appState.rle.addEventListener('change', updateDebugOutputElement);

const updateOscillizerCanvas = (/* event */) => {
  const canvas = document.getElementById('output-osc-canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const {
    success,
    subperiods: cellsAndSubperiods,
    boundingBox,
  } = appState.oscInfo.value;

  // Clear canvas first
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (!success) {
    return;
  }

  const cellSize = appCache.cellSizes.cell;
  const borderSize = appCache.cellSizes.border;

  // First fill rect with empty cell backgrounds.
  const patternWidth = boundingBox.xmax - boundingBox.xmin + 1;
  const patternHeight = boundingBox.ymax - boundingBox.ymin + 1;
  canvas.width = cellSize * (patternWidth + 2);
  canvas.height = cellSize * (patternHeight + 2);
  // Draw background
  context.fillStyle = visuals.colorscheme.background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // Draw cell borders
  context.fillStyle = 'white';
  new Array(patternHeight + 2).fill().forEach((_, i) => {
    context.fillRect(0, cellSize * i, canvas.width, borderSize);
    context.fillRect(0, cellSize * (i + 1) - borderSize, canvas.width, borderSize);
  });
  new Array(patternWidth + 2).fill().forEach((_, i) => {
    context.fillRect(cellSize * i, 0, canvas.height, borderSize);
    context.fillRect(cellSize * (i + 1) - borderSize, 0, borderSize, canvas.height);
  });

  // Then color the cells.
  const drawCell = (x, y, color) => {
    context.fillStyle = color;
    const rect = [
      (x + 1) * cellSize + borderSize,
      (y + 1) * cellSize + borderSize,
      cellSize - 2 * borderSize,
      cellSize - 2 * borderSize,
    ];
    context.fillRect(...rect);
  };
  const subperiodsSet = new Set(cellsAndSubperiods.map((e) => e.subperiod));
  const subperiodsArray = [...subperiodsSet.values()].sort((a, b) => a - b);
  const colorMap = visuals.makeColorMap(subperiodsArray);
  cellsAndSubperiods.forEach(({ cell: [x, y], subperiod }) => {
    drawCell(x - boundingBox.xmin, y - boundingBox.ymin, colorMap.get(subperiod));
  });
};

appState.oscInfo.addEventListener('change', updateOscillizerCanvas);
