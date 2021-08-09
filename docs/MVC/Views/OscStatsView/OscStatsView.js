/**
 * @class
 * @implements {IView}
 */
class OscStatsView {
  constrcutor(sourceState, targetElement) {
    this.sourceState = sourceState;
    this.targetElement = targetElement;
    this.update = (/* event */) => {
      this.targetElement.textContent = JSON.stringify(this.sourceState, undefined, 2);
    };
  }
}

export default OscStatsView;
