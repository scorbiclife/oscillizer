import * as osc from './lib/engine/osc.js';
import * as rle from './lib/preprocess/rle.js';
import * as visuals from './lib/postprocess/visuals.js';

const appState = {
  /* rle.value: string */
  rle: new EventTarget(),

  /* oscInfo.value: {
    success,
    pattern,
    period,
    subperiods,
    boundingBox,
  } */
  oscInfo: new EventTarget(),

  /*
    Cell style for cells at gen 0
    this.value: cellStyles.property
  */
  initialCellStyle: new EventTarget(),
};

const drawLiveCellOptions = {
  none: () => {},
  border: visuals.drawLiveCellBorder,
  interior: visuals.drawLiveCellInterior,
};

if (window.Cypress) {
  window.appState = appState;
}

/* Action -> State update code */

const eventHandlers = {
  inputRleContainer: document.getElementById('input-rle-container'),
  inputRleSubmitter: document.getElementById('input-rle-submitter'),
  cellStyleSelectors: document.getElementById('cell-style-selector'),
};

/* RLE */

const updateRLE = (event) => {
  if (!event.target) {
    return;
  }
  const data = event.target.value || '';
  appState.rle.value = data;
  appState.rle.dispatchEvent(new Event('change'));
};

eventHandlers.inputRleContainer.addEventListener('change', updateRLE);

/* OscInfo */

const updateOscInfo = (event) => {
  if (!event.target) {
    return;
  }

  const pattern = rle.parse(eventHandlers.inputRleContainer.value);
  const period = osc.getPeriod(pattern);
  if (period === -1) {
    appState.oscInfo.value = { success: false };
    return;
  }
  const subperiods = osc.getSubperiods(pattern, period);
  const boundingBox = osc.getBoundingBox(subperiods.map(({ cell }) => cell));

  appState.oscInfo.value = {
    success: true,
    pattern,
    period,
    subperiods,
    boundingBox,
  };
  appState.oscInfo.dispatchEvent(new Event('change'));
};

eventHandlers.inputRleSubmitter.addEventListener('click', updateOscInfo);

/* CellStyle */

const updateCellStyle = (event) => {
  if (!event.target) {
    return;
  }

  appState.initialCellStyle.value = event.target.value;
};

eventHandlers.cellStyleSelectors.addEventListener('change', updateCellStyle);

/* State -> UI update code */

const updateOscillizerCanvas = (/* event */) => {
  const canvas = document.getElementById('output-osc-canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const {
    success,
    pattern,
    period,
    subperiods: cellsAndSubperiods,
    boundingBox,
  } = appState.oscInfo.value;

  // Clear canvas first
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (!success) {
    return;
  }

  visuals.drawGrid(canvas, context, boundingBox);

  //
  const subperiodsSet = new Set(cellsAndSubperiods.map((e) => e.subperiod));
  const subperiodsArray = [...subperiodsSet.values()].sort((a, b) => a - b);
  const colorMap = visuals.makeColorMap(period, subperiodsArray);
  cellsAndSubperiods.forEach(({ cell: [x, y], subperiod }) => {
    visuals.drawCell(context, x - boundingBox.xmin, y - boundingBox.ymin, colorMap.get(subperiod));
  });

  const drawLiveCell = drawLiveCellOptions[appState.initialCellStyle.value || 'none'];

  pattern.forEach(
    ([x, y]) => drawLiveCell(context, x - boundingBox.xmin, y - boundingBox.ymin)
  );
};

appState.oscInfo.addEventListener('change', updateOscillizerCanvas);
