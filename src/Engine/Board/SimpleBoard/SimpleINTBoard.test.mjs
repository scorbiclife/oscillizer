import SimpleINTBoard from "./SimpleINTBoard.js";
import INTRule from "../../../BaseTypes/Rule/INTRule.js";

// tlife is b3-i/s2-i34q
const tlife = new INTRule(
  ["3c", "3e", "3a", "3k", "3i", "3n", "3j", "3q", "3r", "3y"],
  [
    "2c",
    "2e",
    "2a",
    "2k",
    "2n",
    "3c",
    "3e",
    "3a",
    "3k",
    "3i",
    "3n",
    "3j",
    "3q",
    "3r",
    "3y",
    "4q",
  ]
);

const tlifeGlider = new SimpleINTBoard(
  [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  tlife
);

const tlifeAnt = new SimpleINTBoard(
  [
    [1, 0],
    [2, 0],
    [3, 1],
    [1, 2],
    [2, 2],
    [0, 3],
    [1, 3],
  ],
  tlife
);

const tlifeT = new SimpleINTBoard(
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ],
  tlife
);

describe("A board that runs tlife", () => {
  it("should iterate the glider once correctly", () => {
    const expectedCells = [
      [0, 1],
      [2, 1],
      [1, 2],
      [2, 2],
      [1, 3],
    ].sort();
    const nextGlider = tlifeGlider.after(1);
    const actualCells = nextGlider.getCells().sort();
    expect(actualCells).toStrictEqual(expectedCells);
  });

  it("should iterate the glider correctly", () => {
    const expectedCells = tlifeGlider
      .getCells()
      .map(([x, y]) => [x + 1, y + 1])
      .sort();
    const nextGlider = tlifeGlider.after(4);
    const actualCells = nextGlider.getCells().sort();
    expect(actualCells).toStrictEqual(expectedCells);
  });

  it("should iterate the ant correctly", () => {
    const expectedCells = tlifeAnt
      .getCells()
      .map(([x, y]) => [x + 1, y + 1])
      .sort();
    const nextAnt = tlifeAnt.after(4);
    const actualCells = nextAnt.getCells().sort();
    expect(actualCells).toStrictEqual(expectedCells);
  });

  it("should iterate the t-tetromino correctly", () => {
    const expectedCells = tlifeT
      .getCells()
      .map(([x, y]) => [x, y + 1])
      .sort();
    const nextT = tlifeT.after(5);
    const actualCells = nextT.getCells().sort();
    expect(actualCells).toStrictEqual(expectedCells);
  });
});
