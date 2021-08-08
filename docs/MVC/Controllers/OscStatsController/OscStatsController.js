import * as rle from './rle.js';
import { getOscStats } from './osc.js';
import * as AppConfig from '../../../AppConfig.js';
import IController from '../IController.js';

/**
 * A controller that updates the target with osc stats, with the given RLE.
 * @class
 * @implements {IController}
 */
export default class OscStatsController extends IController {
  updateTemplate(event) {
    if (!event.target) {
      return;
    }
    const [pattern, rule] = rle.parse(this.sourceElement.value);
    const initialBoard = AppConfig.makeTwoStateBoard(pattern, rule);
    this.targetState.setValue(getOscStats(initialBoard));
  }
}
