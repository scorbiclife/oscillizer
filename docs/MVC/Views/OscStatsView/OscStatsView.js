/** @typedef {import('../../Models/AppState').default} AppState */

/**
 * @class
 * @implements {IView}
 */
class OscStatsView {
  /**
   * @param {AppState} sourceState
   * @param {HTMLElement} targetElement
   */
  constructor(sourceState, targetElement) {
    this.sourceState = sourceState;
    this.targetElement = targetElement;
    /** @type {function(Event): void} */
    this.update = (/* event */) => {
      this.targetElement.textContent = JSON.stringify(this.sourceState, undefined, 2);
    };
  }
}

export default OscStatsView;
