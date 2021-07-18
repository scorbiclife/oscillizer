import * as osc from '../../../docs/lib/ca/osc.js';

describe('Generations when the cell is alive for each cell', () => {
  it('Should be none when there are no cells', () => {
    const emptyPatternData = osc.getCellAliveGenerations([], 1);
    expect(emptyPatternData.items).to.be.deep.equal([]);
  });

  it('Should evaluate the blinker correctly', () => {
    const blinkerData = osc.getCellAliveGenerations([[0, 0], [1, 0], [2, 0]], 2);
    expect(blinkerData.items).to.have.deep.members([
      { cell: [1, 0], aliveGens: [0, 1] },
      { cell: [0, 0], aliveGens: [0] },
      { cell: [2, 0], aliveGens: [0] },
      { cell: [1, 1], aliveGens: [1] },
      { cell: [1, -1], aliveGens: [1] },
    ]);
  });

  it('Should evaluate the mold correctly', () => {
    const moldData = osc.getCellAliveGenerations(
      [
        // https://conwaylife.com/w/images/c/ce/Mold.png
        [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
        [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
      ], 4
    );
    expect(moldData.items).to.have.deep.members([
      { cell: [0, 2], aliveGens: [0] },
      { cell: [0, 3], aliveGens: [3] },
      { cell: [0, 4], aliveGens: [0, 2, 3] },
      { cell: [1, 2], aliveGens: [2, 3] },
      { cell: [1, 3], aliveGens: [1, 2, 3] },
      { cell: [1, 4], aliveGens: [1, 3] },
      { cell: [1, 5], aliveGens: [0, 1, 2] },
      { cell: [2, 1], aliveGens: [0, 1, 2, 3] },
      { cell: [2, 3], aliveGens: [1, 3] },
      { cell: [2, 4], aliveGens: [0, 1, 3] },
      { cell: [2, 5], aliveGens: [1] },
      { cell: [3, 0], aliveGens: [0, 1, 2, 3] },
      { cell: [3, 2], aliveGens: [0, 1, 2, 3] },
      { cell: [3, 4], aliveGens: [0, 1] },
      { cell: [3, 5], aliveGens: [2] },
      { cell: [4, 0], aliveGens: [0, 1, 2, 3] },
      { cell: [4, 3], aliveGens: [0, 1, 2, 3] },
      { cell: [5, 1], aliveGens: [0, 1, 2, 3] },
      { cell: [5, 2], aliveGens: [0, 1, 2, 3] },
    ]);
  });
});

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
});

describe('Oscillator subperiod finder', () => {
  it('Should evaluate the blinker correctly', () => {
    const blinker = [[0, 0], [0, 1], [0, 2]];
    const expectedSubperiods = [
      { cell: [0, 0], subperiod: 2 },
      { cell: [0, 1], subperiod: 1 },
      { cell: [0, 2], subperiod: 2 },
      { cell: [-1, 1], subperiod: 2 },
      { cell: [1, 1], subperiod: 2 },
    ];
    expect(osc.getSubperiods(blinker)).to.have.deep.members(expectedSubperiods);
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
    expect(osc.getSubperiods(mold)).to.have.deep.members(expectedSubperiods);
  });
});
