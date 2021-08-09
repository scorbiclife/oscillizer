import * as rle from './RLEHelpers.js';
import { getOscStats } from './OscHelpers.js';
import * as AppConfig from '../../../AppConfig.js';

/**
 * A controller that updates the target with osc stats, with the given RLE.
 * @class
 * @implements {IController}
 */
class OscStatsController {
  constructor(targetState, sourceElement) {
    /** @type {AppState} */
    this.targetState = targetState;
    /** @type {HTMLElement} */
    this.sourceElement = sourceElement;
    /** The update callback.  */
    this.update = (event) => {
      if (!event.target) {
        return;
      }
      const [pattern, rule] = rle.parse(this.sourceElement.value);
      const initialBoard = AppConfig.makeTwoStateBoard(pattern, rule);
      this.targetState.setValue(getOscStats(initialBoard));
    };
  }
}

export default OscStatsController;
