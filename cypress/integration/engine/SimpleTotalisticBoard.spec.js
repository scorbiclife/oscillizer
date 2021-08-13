import SimpleTotalisticBoard from '../../../docs/Engine/Board/SimpleBoard/SimpleTotalisticBoard.js';
import Rule from '../../../docs/BaseTypes/Rule/Rule.js';
import BoundingBox from '../../../docs/BaseTypes/BoundingBox.js';

const conwaylife = new Rule.TotalisticRule([3], [2, 3]);
const gliderBoard = new SimpleTotalisticBoard([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]], conwaylife);
const blinkerBoard = new SimpleTotalisticBoard([[0, 0], [1, 0], [2, 0]], conwaylife);

describe('A SimpleBoard', () => {
  it('should get the cells properly', () => {
    expect(gliderBoard.getCells())
      .to.have.deep.members([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]);
  });
  it('should get the population of a glider properly', () => {
    expect(gliderBoard.getPop()).to.equal(5);
  });
  it('should get the population of a blinker properly', () => {
    expect(blinkerBoard.getPop()).to.equal(3);
  });
  it('should get the bounding box of a glider properly', () => {
    expect(gliderBoard.getBox()).to.deep.equal(new BoundingBox(0, 2, 0, 2));
  });
  it('should get the bounding box of a blinker properly', () => {
    expect(blinkerBoard.getBox()).to.deep.equal(new BoundingBox(0, 2, 0, 0));
  });
});

describe('A SimpleBoard', () => {
  it('should iterate the blinker properly', () => {
    const actualCells = blinkerBoard.after(1).getCells();
    const expectedCells = [[1, -1], [1, 0], [1, 1]];
    expect(actualCells).to.have.deep.members(expectedCells);
    expect(actualCells).to.not.have.deep.members(blinkerBoard.getCells());
  });
  it('should iterate the glider properly (4 gens)', () => {
    const actualCells = gliderBoard.after(4).getCells();
    const expectedCells = gliderBoard.getCells().map(([x, y]) => [x + 1, y + 1]);
    expect(actualCells).to.have.deep.members(expectedCells);
  });
  it('should iterate the mold correctly (4 gens)', () => {
    const moldInitial = new SimpleTotalisticBoard(
      [
        [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
        [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
      ],
      conwaylife
    );
    const moldIterated = moldInitial.after(4);
    expect(moldIterated.getCells()).to.have.deep.members(moldInitial.getCells());
  });
});
