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
      const data = this.sourceState.value;
      if (!data.success) {
        this.targetElement.innerText = `Failure: ${data.message}`;
      } else {
        this.targetElement.innerHTML = `
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr class="stripe-dark">
                <td>Period</td>
                <td>${data.period}</td>
              </tr>
              <tr class="stripe-dark">
                <td>Population</td>
                <td>Avg: ${data.avgPop}<br>Min: ${data.minPop}<br>Max: ${data.maxPop}</td>
              </tr>
              <tr class="stripe-dark">
                <td>Cells</td>
                <td>
                  Rotor: ${data.numRotorCells}<br>
                  Stator: ${data.numStatorCells}<br>
                  Total: ${data.numRotorCells + data.numStatorCells}
                </td>
              </tr>
              <tr class="stripe-dark">
                <td>Volatility</td>
                <td>${data.volatility}<br>(Strict: ${data.strictVolatility})</td>
              </tr>
              <tr class="stripe-dark">
                <td>Bounding Box</td>
                <td>
                  ${data.boundingBox.xmax - data.boundingBox.xmin + 1}
                  x ${data.boundingBox.ymax - data.boundingBox.ymin + 1}
                </td>
              </tr>
            </tbody>
          </table>
        `;
      } // if ... else
    }; // this.update
  }
}

export default OscStatsView;
