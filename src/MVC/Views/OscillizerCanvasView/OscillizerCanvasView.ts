<<<<<<<< HEAD:src/MVC/Views/OscillizerCanvasView/OscillizerCanvasView.js
import * as CanvasHelpers from "./CanvasHelpers.js";
========
import * as CanvasHelpers from './CanvasHelpers';
>>>>>>>> parent of 4f4aee5 (Ops: Revert typescript):src/MVC/Views/OscillizerCanvasView/OscillizerCanvasView.ts

/**
 * @typedef {import('../../Models/AppState').default} AppState
 */

<<<<<<<< HEAD:src/MVC/Views/OscillizerCanvasView/OscillizerCanvasView.js
const drawLiveCellOptions = new Map([
  ["none", () => {}],
  ["border", CanvasHelpers.drawLiveCellBorder],
  ["interior", CanvasHelpers.drawLiveCellInterior],
]);
========
const drawLiveCellOptions = new Map(
  [
    ['none', () => { }],
    ['border', CanvasHelpers.drawLiveCellBorder],
    ['interior', CanvasHelpers.drawLiveCellInterior],
  ]
);
>>>>>>>> parent of 4f4aee5 (Ops: Revert typescript):src/MVC/Views/OscillizerCanvasView/OscillizerCanvasView.ts

/** @type {function(Array<{cell: Cell, subperiod: number}>): Array<number>} */
const getArrayFromSubperiods = (subperiods) => {
  const subperiodSet = new Set(subperiods.map((e) => e.subperiod));
  const subperiodArray = [...subperiodSet.values()].sort((a, b) => a - b);
  return subperiodArray;
};

/**
 * The view that takes care of the oscillizer canvas.
 * @class
 * @implements {IView}
 */
class OscillizerCanvasView {
  /**
   * @param {*} oscData
   * @param {AppState} cellStyle
   * @param {HTMLCanvasElement} targetCanvas
   */
  constructor(oscData, cellStyle, targetCanvas) {
    this.oscData = oscData;
    this.cellStyle = cellStyle;
    this.targetCanvas = targetCanvas;
    /**
     * The `update` callback that updates the view.
     * @type {function(Event): void}
     */
    this.update = (/* event */) => {
      const context = this.targetCanvas.getContext("2d");
      if (!context) {
        return;
      }

      // Dependent data
      const { success, pattern, period, subperiods, boundingBox } =
        this.oscData.value;
      const colorMap = CanvasHelpers.makeColorMap(
        period,
        getArrayFromSubperiods(subperiods)
      );

      // Helper functions
      const drawSubperiod = ({ cell: [x, y], subperiod }) => {
        CanvasHelpers.drawCell(
          context,
          x - boundingBox.xmin,
          y - boundingBox.ymin,
          colorMap.get(subperiod)
        );
      };

      const drawLiveCell = ([x, y]) => {
        const drawLiveCellOption = drawLiveCellOptions.get(
          this.cellStyle.value || "none"
        );
        drawLiveCellOption(context, x - boundingBox.xmin, y - boundingBox.ymin);
      };

      // Main Logic
      context.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
      if (!success) {
        return;
      }
      CanvasHelpers.drawGrid(targetCanvas, context, boundingBox);
      subperiods.forEach(drawSubperiod);
      pattern.forEach(drawLiveCell);
    }; // end of `this.update`
  }
}

export default OscillizerCanvasView;
