/**
 * An abstract class for easy definitions of controllers in the MVC structure.
 * @class
 */
class AbstractController {
  /**
   * @constructor
   * @param {AppState} targetAppState - The target AppState to update
   * @param {HTMLElement} [sourceElement] - The source of the HTML event
   */
  constructor(targetState, sourceElement) {
    /**
     * The target app state to update.
     * @type {AppState}
     */
    this.targetState = targetState;

    /**
     * The source element.
     * Might not be used in `this.update`, in which case it is `undefined`.
     * @type {HTMLElement|undefined}
     */
    this.sourceElement = sourceElement;
    /**
     * The main update callback.
     *
     * `this.templateForUpdate` cannot be used as a callback
     * because it loses `this` object when used as one.
     * @type {function(event)}
     */
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

export default AbstractController;
