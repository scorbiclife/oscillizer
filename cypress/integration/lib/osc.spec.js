import * as osc from '../../../docs/MVC/Controllers/OscStatsController/OscHelpers.js';
import Rule from '../../../docs/BaseTypes/Rule/Rule.js';
import SimpleBoard from '../../../docs/Engine/Board/SimpleBoard/SimpleTotalisticBoard.js';

const conwaylife = new Rule.TotalisticRule([3], [2, 3]);
const makeBoard = (cells) => new SimpleBoard(cells, conwaylife);

describe('Oscillator phases finder', () => {
  it('should return correct phases for the blinker', () => {
    const blinker = [[0, 0], [1, 0], [2, 0]];
    const blinkerPhases = [
      [[0, 0], [1, 0], [2, 0]],
      [[1, -1], [1, 0], [1, 1]],
    ];
    expect(osc.getPhases(makeBoard(blinker)).map((b) => b.getCells()))
      .to.have.deep.members(blinkerPhases);
  });

  it('should return 4 for the period of the mold', () => {
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
  it('should return [] for non-oscillators', () => {
    const rpentomino = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
    expect(osc.getPhases(makeBoard(rpentomino), 100)).to.have.deep.members([]);
  });
});

describe('Oscillator subperiod finder', () => {
  const getSubperiodOfCells = (cells) => {
    const board = makeBoard(cells);
    const iteratedPatterns = osc.getPhases(board);
    const result = osc.getSubperiodByCell(iteratedPatterns);
    return result;
  };
  it('should evaluate the blinker correctly', () => {
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

  it('should evaluate the mold correctly', () => {
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
  it('should return [] for non-oscillators', () => {
    const rpentomino = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
    expect(getSubperiodOfCells(rpentomino, 100)).to.deep.equal([]);
  });
});
