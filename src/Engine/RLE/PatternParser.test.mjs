import PatternParser from "./PatternParser";

describe("RLE Parser state", () => {
  it("should process newlines correctly", () => {
    const state = new PatternParser({ runCount: 10, currentCell: [0, 0] });
    state.addNewlines();
    expect(state.runCount).toBe(0);
    expect(state.currentCell).toStrictEqual([0, 10]);
  });

  it("should update run counts correctly", () => {
    const state = new PatternParser({ runCount: 10, currentCell: [1, 2] });
    state.updateRunCount(3);
    expect(state.runCount).toBe(103);
    expect(state.currentCell).toStrictEqual([1, 2]);
  });

  it("should process new cells correctly", () => {
    const state = new PatternParser({
      cells: [],
      runCount: 3,
      currentCell: [1, 2],
    });
    state.drawRun(1);
    expect(state.runCount).toStrictEqual(0);
    expect(state.cells).toStrictEqual([
      [1, 2],
      [2, 2],
      [3, 2],
    ]);
  });
});
