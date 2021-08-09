import AbstractController from '../AbstractController.js/index.js';

class EventTargetPassingController extends AbstractController {
  /**
   * A controller that just passes the value of `event.target`.
   * `sourceElement` is not needed as we are using `event.target` anyway.
   * @constructor
   * @param {AppState} targetState
   */
  constructor(targetState) {
    super(targetState, undefined);
  }

  templateForUpdate(event) {
    if (!event.target) {
      return;
    }
    this.targetState.setValue(event.target.value);
  }
}

export default EventTargetPassingController;
