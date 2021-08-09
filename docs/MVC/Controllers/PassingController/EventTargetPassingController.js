/**
 * A controller that just passes the value of `event.target`.
 * `sourceElement` is not needed as we are using `event.target` anyway.
 * @class
 * @implements {IController}
 */
class EventTargetPassingController {
  constructor(targetState) {
    /** @type {AppState} */
    this.targetState = targetState;
    /** The update callback. */
    this.update = (event) => {
      if (!event.target) {
        return;
      }
      this.targetState.setValue(event.target.value);
    };
  }
}

export default EventTargetPassingController;
