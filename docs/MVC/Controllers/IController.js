/**
 * Common interface for implementing controllers.
 * @interface
 */
class IController {
  /**
   * Pass
   * @constructor
   * @param {AppState} targetAppState - The target AppState the event will pass to
   * @param {HTMLElement} sourceElement - The source of the HTML event
   */
  constructor(targetState, sourceElement) {
    /** @type {HTMLElement} */
    this.sourceElement = sourceElement;
    /** @type {AppState} */
    this.targetState = targetState;
    /** @type {function(event)} */
    this.update = (event) => this.templateForUpdate(event);
  }

  /**
   * @abstract
   * @param {Event} event - The passed in event. Usually has some `detail` field to work with.
   */
  templateForUpdate(event) {
    throw new Error(
      'This is meant to be run in a concrete implementation of this interface.\n'
      + `\tthis: ${this}\n`
      + `\tevent: ${event}\n`
    );
  }
}

export default IController;
