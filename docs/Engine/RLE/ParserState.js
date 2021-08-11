/**
 * The intermediate state during RLE parsing.
 * @class
 */
class ParserState {
  /**
   * Initialize the parser with the given state.
   *
   * @param {Object} initialState - The initial state to override with
   * @property {boolean|undefined} initialState.isFinished
   * @property {Array<Cell>|undefined} initialState.cells
   * @property {Array<number>|undefined} initialState.runCount
   * @property {Cell|undefined} initialState.currentCell
   *
   */
  constructor(initialState = {}) {
    /** @type {boolean} */
    this.isFinished = initialState.isFinished || false;
    /** @type {Array<Cell>} */
    this.cells = initialState.cells || [];
    /** @type {number} */
    this.runCount = initialState.runCount || 0;
    /** @type {Cell} */
    this.currentCell = initialState.currentCell || [0, 0];
  }

  finishParsing() {
    this.isFinished = true;
  }

  addNewlines() {
    const [/* x */, y] = this.currentCell;
    const runCount = this.runCount || 1;
    this.currentCell = [0, y + runCount];
    this.runCount = 0;
  }

  // Append digit: integer to runCount: integer
  updateRunCount(digit) {
    this.runCount = this.runCount * 10 + digit;
  }

  drawRun(state) {
    const [x, y] = this.currentCell;
    const runCount = this.runCount || 1;
    const newCells = new Array(runCount).fill(0).map((v, i) => [x + i, y]);

    // Refactor addNewCells into a dependency if needs variation in behavior
    const addNewCells = (nc, s) => {
      if (s) { this.cells = this.cells.concat(nc); }
    };
    addNewCells(newCells, state);

    this.currentCell = [x + runCount, y];
    this.runCount = 0;
  }
}

export default ParserState;
