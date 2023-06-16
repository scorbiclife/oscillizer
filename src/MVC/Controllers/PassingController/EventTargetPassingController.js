/**
 * @typedef {import("./IController").IController} IController
 * @typedef {import("../../Models/AppState").default} AppState
 */

/**
 * A controller that just passes the value of `event.target`.
 * `sourceElement` is not needed as we are using `event.target` anyway.
 * @class
 * @implements {IController}
 */
class EventTargetPassingController {
  /**
   * @param {AppState} targetState
   */
  constructor(targetState) {
    /** @type {AppState} */
    this.targetState = targetState;
    /**
     * The update callback.
     * @type {function(Event): void}
     */
    this.update = (event) => {
      if (!event.target) {
        return;
      }
      // @ts-ignore
      this.targetState.setValue(event.target.value);
    };
  }
}

export default EventTargetPassingController;
