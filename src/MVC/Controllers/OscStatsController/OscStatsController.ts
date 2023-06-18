<<<<<<<< HEAD:src/MVC/Controllers/OscStatsController/OscStatsController.js
import { parse as parseRLE } from "./RLEHelpers.js";
import { getOscStats } from "./OscHelpers.js";
import * as AppConfig from "../../../AppConfig.js";
========
import { parse as parseRLE } from './RLEHelpers';
import { getOscStats } from './OscHelpers';
import * as AppConfig from '../../../AppConfig';
>>>>>>>> parent of 4f4aee5 (Ops: Revert typescript):src/MVC/Controllers/OscStatsController/OscStatsController.ts

/**
 * @typedef {import('../PassingController/IController.js').IController}  IController
 * @typedef {import('../../Models/AppState').default} AppState
 */

/**
 * A controller that updates the target with osc stats, with the given RLE.
 * @class
 * @implements {IController}
 */
class OscStatsController {
  /**
   * @param {AppState} targetState
   * @param {HTMLInputElement} sourceElement
   */
  constructor(targetState, sourceElement) {
    /** @type {AppState} */
    this.targetState = targetState;
    /** @type {HTMLInputElement} */
    this.sourceElement = sourceElement;
    /**
     * The update callback.
     * @type {function(Event): void}
     */
    this.update = (event) => {
      if (!event.target) {
        this.targetState.setValue({
          success: false,
          message: "No event.target",
        });
        return;
      }
      const rleString = this.sourceElement.value;
      const { pattern, rule } = parseRLE(rleString);
      if (!rule) {
        this.targetState.setValue({
          success: false,
          message: "Unable to parse rule",
        });
        return;
      }
      const initialBoard = AppConfig.makeBoard(pattern, rule);
      this.targetState.setValue(getOscStats(initialBoard));
    };
  }
}

export default OscStatsController;
