import * as osc from "./OscHelpers.js";
import TotalisticRule from "../../../../src/BaseTypes/Rule/TotalisticRule.js";
import SimpleBoard from "../../../../src/Engine/Board/SimpleBoard/SimpleTotalisticBoard.js";

const conwaylife = new TotalisticRule([3], [2, 3]);
const makeBoard = (cells) => new SimpleBoard(cells, conwaylife);

function expectPhasesToEqual(expectedPhases, actualPhases) {
  expect(expectedPhases.length).toEqual(actualPhases.length);
  for (let i = 0; i < expectedPhases.length; ++i) {
    expectedPhases[i].sort();
    actualPhases[i].sort();
    expect(expectedPhases[i]).toStrictEqual(actualPhases[i]);
  }
}

describe("Oscillator phases finder", () => {
  it("should return correct phases for the blinker", () => {
    const blinker = [
      [0, 0],
      [1, 0],
      [2, 0],
    ];
    const blinkerPhases = [
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [1, -1],
        [1, 0],
        [1, 1],
      ],
    ];
    expectPhasesToEqual(
      osc.getPhases(makeBoard(blinker)).map((b) => b.getCells()),
      blinkerPhases
    );
  });

  it("should return 4 for the period of the mold", () => {
    const mold = [
      [3, 0],
      [4, 0],
      [2, 1],
      [5, 1],
      [0, 2],
      [3, 2],
      [5, 2],
      [4, 3],
      [0, 4],
      [2, 4],
      [3, 4],
      [1, 5],
    ];
    const moldPhases = [
      [
        [3, 0],
        [4, 0],
        [2, 1],
        [5, 1],
        [3, 2],
        [5, 2],
        [4, 3],
        [0, 2],
        [0, 4],
        [2, 4],
        [3, 4],
        [1, 5],
      ],
      [
        [3, 0],
        [4, 0],
        [2, 1],
        [5, 1],
        [3, 2],
        [5, 2],
        [4, 3],
        [1, 3],
        [2, 3],
        [1, 4],
        [2, 4],
        [3, 4],
        [1, 5],
        [2, 5],
      ],
      [
        [3, 0],
        [4, 0],
        [2, 1],
        [5, 1],
        [3, 2],
        [5, 2],
        [4, 3],
        [1, 2],
        [1, 3],
        [0, 4],
        [1, 5],
        [3, 5],
      ],
      [
        [3, 0],
        [4, 0],
        [2, 1],
        [5, 1],
        [3, 2],
        [5, 2],
        [4, 3],
        [1, 2],
        [0, 3],
        [1, 3],
        [2, 3],
        [0, 4],
        [1, 4],
        [2, 4],
      ],
    ];
    expectPhasesToEqual(
      osc.getPhases(makeBoard(mold)).map((b) => b.getCells()),
      moldPhases
    );
  });
  it("should return [] for non-oscillators", () => {
    const rpentomino = [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ];
    expectPhasesToEqual(osc.getPhases(makeBoard(rpentomino), 100), []);
  });
});

describe("Oscillator subperiod finder", () => {
  function compareSubperiodData(lhs, rhs) {
    const dx = lhs.cell[0] - rhs.cell[0];
    if (dx !== 0) {
      return dx;
    }
    const dy = lhs.cell[1] - rhs.cell[1];
    if (dy !== 0) {
      return dy;
    }
    return lhs.subperiod - rhs.subperiod;
  }
  function expectSubperiodsToBeEqual(expected, actual) {
    expected.sort(compareSubperiodData);
    actual.sort(compareSubperiodData);
    expect(expected).toEqual(actual);
  }

  const getSubperiodOfCells = (cells) => {
    const board = makeBoard(cells);
    const iteratedPatterns = osc.getPhases(board);
    const result = osc.getSubperiodByCell(iteratedPatterns);
    return result;
  };
  it("should evaluate the blinker correctly", () => {
    const blinker = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    const expectedSubperiods = [
      { cell: [0, 0], subperiod: 2 },
      { cell: [0, 1], subperiod: 1 },
      { cell: [0, 2], subperiod: 2 },
      { cell: [-1, 1], subperiod: 2 },
      { cell: [1, 1], subperiod: 2 },
    ];
    expectSubperiodsToBeEqual(getSubperiodOfCells(blinker), expectedSubperiods);
  });

  it("should evaluate the mold correctly", () => {
    const mold = [
      [3, 0],
      [4, 0],
      [2, 1],
      [5, 1],
      [0, 2],
      [3, 2],
      [5, 2],
      [4, 3],
      [0, 4],
      [2, 4],
      [3, 4],
      [1, 5],
    ];
    const expectedSubperiods = [
      { cell: [0, 2], subperiod: 4 },
      { cell: [0, 3], subperiod: 4 },
      { cell: [0, 4], subperiod: 4 },
      { cell: [1, 2], subperiod: 4 },
      { cell: [1, 3], subperiod: 4 },
      { cell: [1, 4], subperiod: 2 },
      { cell: [1, 5], subperiod: 4 },
      { cell: [2, 1], subperiod: 1 },
      { cell: [2, 3], subperiod: 2 },
      { cell: [2, 4], subperiod: 4 },
      { cell: [2, 5], subperiod: 4 },
      { cell: [3, 0], subperiod: 1 },
      { cell: [3, 2], subperiod: 1 },
      { cell: [3, 4], subperiod: 4 },
      { cell: [3, 5], subperiod: 4 },
      { cell: [4, 0], subperiod: 1 },
      { cell: [4, 3], subperiod: 1 },
      { cell: [5, 1], subperiod: 1 },
      { cell: [5, 2], subperiod: 1 },
    ];
    expectSubperiodsToBeEqual(getSubperiodOfCells(mold), expectedSubperiods);
  });
  it("should return [] for non-oscillators", () => {
    const rpentomino = [
      [1, 0],
      [2, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ];
    expectSubperiodsToBeEqual(getSubperiodOfCells(rpentomino), []);
  });
});
