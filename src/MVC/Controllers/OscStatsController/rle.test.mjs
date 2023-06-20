import * as rle from "./RLEHelpers.js";

describe("RLE body parser", () => {
  function expectCellsToBeEqual(expected, actual) {
    expected.sort();
    actual.sort();
    expect(expected).toStrictEqual(actual);
  }
  it("should parse the glider correctly", () => {
    const gliderCells = [
      [1, 0],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ];
    expectCellsToBeEqual(rle.parseBody("bo$2bo$3o!"), gliderCells);
  });
});
