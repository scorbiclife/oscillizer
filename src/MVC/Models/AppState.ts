/**
 * A class that represents a single group of state.
 * @class
 */
class AppState {
  /**
   * @param {*} value - The initial value of this state
   * @param {EventTarget} [eventTarget] - The EventTarget to use for firing state changes
   */
  constructor(value, eventTarget) {
    /** @type {EventTarget} */
    this.eventTarget = eventTarget || new EventTarget();
    /** @type {*} */
    this.value = value;
  }

  /**
   * Set the value and fire `change` event.
   * @param {*} newValue - The new value
   */
  setValue(newValue) {
    this.value = newValue;
    this.eventTarget.dispatchEvent(
      new CustomEvent("change", { detail: { source: this } })
    );
  }
}

export default AppState;
