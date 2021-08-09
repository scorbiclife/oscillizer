import * as visuals from './visuals.js';

const drawLiveCellOptions = new Map(
  [
    ['none', () => {}],
    ['border', visuals.drawLiveCellBorder],
    ['interior', visuals.drawLiveCellInterior],
  ]
);

const makeUpdateOscillizerCanvas = (appState) => (event) => {
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
  } = event.detail;

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

  const drawLiveCell = drawLiveCellOptions.get(appState.initialCellStyle.value || 'none');

  pattern.forEach(
    ([x, y]) => drawLiveCell(context, x - boundingBox.xmin, y - boundingBox.ymin)
  );
};

export default makeUpdateOscillizerCanvas;
