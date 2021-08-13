import SimpleINTBoard from '../../../docs/Engine/Board/SimpleBoard/SimpleINTBoard.js';
import Rule from '../../../docs/BaseTypes/Rule/Rule.js';
import Neighbors from '../../../docs/BaseTypes/Neighbors/Neighbors.js';

const { INT } = Neighbors;

// tlife is b3-i/s2-i34q
const tlife = new Rule.INTRule(
  [INT.X3c, INT.X3e, INT.X3a, INT.X3k, INT.X3i, INT.X3n, INT.X3j, INT.X3q, INT.X3r, INT.X3y],
  [
    INT.X2c, INT.X2e, INT.X2a, INT.X2k, INT.X2n,
    INT.X3c, INT.X3e, INT.X3a, INT.X3k, INT.X3i, INT.X3n, INT.X3j, INT.X3q, INT.X3r, INT.X3y,
    INT.X4q,
  ]
);

const tlifeGlider = new SimpleINTBoard([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]], tlife);

const tlifeAnt = new SimpleINTBoard(
  [[1, 0], [2, 0], [3, 1], [1, 2], [2, 2], [0, 3], [1, 3]],
  tlife
);

const tlifeT = new SimpleINTBoard([[0, 0], [1, 0], [2, 0], [1, 1]], tlife);

describe('A board that runs tlife', () => {
  it('should iterate the glider once correctly', () => {
    const expectedCells = [[0, 1], [2, 1], [1, 2], [2, 2], [1, 3]].sort();
    const nextGlider = tlifeGlider.after(1);
    const actualCells = nextGlider.getCells().sort();
    expect(actualCells).to.have.deep.members(expectedCells);
  });

  it('should iterate the glider correctly', () => {
    const expectedCells = tlifeGlider.getCells().map(([x, y]) => [x + 1, y + 1]).sort();
    const nextGlider = tlifeGlider.after(4);
    const actualCells = nextGlider.getCells().sort();
    expect(actualCells).to.have.deep.members(expectedCells);
  });

  it('should iterate the ant correctly', () => {
    const expectedCells = tlifeAnt.getCells().map(([x, y]) => [x + 1, y + 1]).sort();
    const nextAnt = tlifeAnt.after(4);
    const actualCells = nextAnt.getCells().sort();
    expect(actualCells).to.have.deep.members(expectedCells);
  });

  it('should iterate the t-tetromino correctly', () => {
    const expectedCells = tlifeT.getCells().map(([x, y]) => [x, y + 1]).sort();
    const nextT = tlifeT.after(5);
    const actualCells = nextT.getCells().sort();
    expect(actualCells).to.have.deep.members(expectedCells);
  });
});
