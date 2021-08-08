export default class AppState {
  constructor(value, eventTarget) {
    this.eventTarget = eventTarget || new EventTarget();
    this.value = value;
  }

  // Set value and trigger onChange event
  setValue(newValue) {
    this.value = newValue;
    this.eventTarget.dispatchEvent(
      new CustomEvent('change', { detail: this.value })
    );
  }
}
