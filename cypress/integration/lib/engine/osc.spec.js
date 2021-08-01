import * as osc from '../../../../docs/lib/engine/osc.js';

describe('Oscillator period finder', () => {
  it('Should return 2 for the period of the blinker', () => {
    const blinker = [[0, 0], [1, 0], [2, 0]];
    expect(osc.getPeriod(blinker)).to.equal(2);
  });

  it('Should return 4 for the period of the mold', () => {
    const mold = [
      [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
      [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
    ];
    expect(osc.getPeriod(mold)).to.equal(4);
  });
  it('Should return 0 for non-oscillators', () => {
    const rpentomino = [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]];
    expect(osc.getPeriod(rpentomino, 100)).to.equal(0);
  });
});

describe('Oscillator subperiod finder', () => {
  const getSubperiodOfCells = (cells) => {
    const iteratedPatterns = osc.getAllPhases(cells);
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
