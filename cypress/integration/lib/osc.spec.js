import SimpleBoard from '../../../docs/engine/Board/SimpleBoard/SimpleBoard.js';
import { simpleBoardConwayLife } from '../../../docs/engine/Board/SimpleBoard/SimpleRules/TotalisticRule.js';
import * as osc from '../../../docs/mvc/controller/helpers/osc.js';

const makeBoard = (cells) => new SimpleBoard(cells, simpleBoardConwayLife);

describe('Oscillator phases finder', () => {
  it('Should return correct phases for the blinker', () => {
    const blinker = [[0, 0], [1, 0], [2, 0]];
    const blinkerPhases = [
      [[0, 0], [1, 0], [2, 0]],
      [[1, -1], [1, 0], [1, 1]],
    ];
    expect(osc.getPhases(makeBoard(blinker)).map((b) => b.getCells()))
      .to.have.deep.members(blinkerPhases);
  });

  it('Should return 4 for the period of the mold', () => {
    const mold = [
      [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
      [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
    ];
    const moldPhases = [
      [
        [3, 0], [4, 0], [2, 1], [5, 1], [3, 2], [5, 2], [4, 3],
        [0, 2], [0, 4], [2, 4], [3, 4], [1, 5],
      ],
      [
        [3, 0], [4, 0], [2, 1], [5, 1], [3, 2], [5, 2], [4, 3],
        [1, 3], [2, 3], [1, 4], [2, 4], [3, 4], [1, 5], [2, 5],
      ],
      [
        [3, 0], [4, 0], [2, 1], [5, 1], [3, 2], [5, 2], [4, 3],
        [1, 2], [1, 3], [0, 4], [1, 5], [3, 5],
      ],
      [
        [3, 0], [4, 0], [2, 1], [5, 1], [3, 2], [5, 2], [4, 3],
        [1, 2], [0, 3], [1, 3], [2, 3], [0, 4], [1, 4], [2, 4],
      ],
    ];
    const sortCells = (ps) => ps.map((p) => p.sort());
    expect(sortCells(osc.getPhases(makeBoard(mold)).map((b) => b.getCells())))
      .to.have.deep.members(sortCells(moldPhases));
  });
  it('Should return [] for non-oscillators', () => {
    const rpentomino = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
    expect(osc.getPhases(makeBoard(rpentomino), 100)).to.have.deep.members([]);
  });
});

describe('Oscillator period finder', () => {
  it('Should return 2 for the period of the blinker', () => {
    const blinker = [[0, 0], [1, 0], [2, 0]];
    expect(osc.getPeriod(makeBoard(blinker))).to.equal(2);
  });

  it('Should return 4 for the period of the mold', () => {
    const mold = [
      [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
      [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
    ];
    expect(osc.getPeriod(makeBoard(mold))).to.equal(4);
  });
  it('Should return 0 for non-oscillators', () => {
    const rpentomino = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
    expect(osc.getPeriod(makeBoard(rpentomino), 100)).to.equal(0);
  });
});

describe('Oscillator subperiod finder', () => {
  const getSubperiodOfCells = (cells) => {
    const board = makeBoard(cells);
    const iteratedPatterns = osc.getPhases(board);
    const result = osc.getSubperiodByCell(iteratedPatterns);
    return result;
  };
  it('Should evaluate the blinker correctly', () => {
    const blinker = [[0, 0], [0, 1], [0, 2]];
    const expectedSubperiods = [
      { cell: [0, 0], subperiod: 2 },
      { cell: [0, 1], subperiod: 1 },
      { cell: [0, 2], subperiod: 2 },
      { cell: [-1, 1], subperiod: 2 },
      { cell: [1, 1], subperiod: 2 },
    ];
    expect(getSubperiodOfCells(blinker)).to.have.deep.members(expectedSubperiods);
  });

  it('Should evaluate the mold correctly', () => {
    const mold = [
      [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
      [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
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
    expect(getSubperiodOfCells(mold)).to.have.deep.members(expectedSubperiods);
  });
  it('Should return [] for non-oscillators', () => {
    const rpentomino = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
    expect(getSubperiodOfCells(rpentomino, 100)).to.deep.equal([]);
  });
});