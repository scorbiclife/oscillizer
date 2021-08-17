import { parse as parseRLE } from './RLEHelpers.js';
import { getOscStats } from './OscHelpers.js';
import * as AppConfig from '../../../AppConfig.js';

/**
 * @typedef {import('../IController').IController}  IController
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
   * @param {HTMLElement} sourceElement
   */
  constructor(targetState, sourceElement) {
    /** @type {AppState} */
    this.targetState = targetState;
    /** @type {HTMLElement} */
    this.sourceElement = sourceElement;
    /**
     * The update callback.
     * @type {function(Event): void}
     */
    this.update = (event) => {
      if (!event.target) {
        return;
      }
      // @ts-ignore
      const { pattern, rule } = parseRLE(this.sourceElement.value);
      const initialBoard = AppConfig.makeBoard(pattern, rule);
      this.targetState.setValue(getOscStats(initialBoard));
    };
  }
}

export default OscStatsController;
