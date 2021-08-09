import * as visuals from './visuals.js';

const drawLiveCellOptions = new Map(
  [
    ['none', () => {}],
    ['border', visuals.drawLiveCellBorder],
    ['interior', visuals.drawLiveCellInterior],
  ]
);

/**
 * The view that takes care of the oscillizer canvas.
 * @class
 * @implements {IView}
 */
class OscillizerCanvasView {
  constructor(oscData, cellStyle, targetCanvas) {
    this.oscData = oscData;
    this.cellStyle = cellStyle;
    this.targetCanvas = targetCanvas;
    this.update = (/* event */) => {
      const context = this.targetCanvas.getContext('2d');
      if (!context) {
        return;
      }

      const {
        success,
        pattern,
        period,
        subperiods: cellsAndSubperiods,
        boundingBox,
      } = this.oscData.value;

      // Clear canvas first
      context.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

      if (!success) {
        return;
      }

      visuals.drawGrid(targetCanvas, context, boundingBox);

      //
      const subperiodsSet = new Set(cellsAndSubperiods.map((e) => e.subperiod));
      const subperiodsArray = [...subperiodsSet.values()].sort((a, b) => a - b);
      const colorMap = visuals.makeColorMap(period, subperiodsArray);
      cellsAndSubperiods.forEach(({ cell: [x, y], subperiod }) => {
        visuals.drawCell(
          context,
          x - boundingBox.xmin,
          y - boundingBox.ymin,
          colorMap.get(subperiod)
        );
      });

      const drawLiveCell = drawLiveCellOptions.get(this.cellStyle.value || 'none');

      pattern.forEach(
        ([x, y]) => drawLiveCell(context, x - boundingBox.xmin, y - boundingBox.ymin)
      );
    };
  }
}

export default OscillizerCanvasView;
