import * as rle from '../../../docs/mvc/controller/helpers/rle.js';

describe('RLE Parser state', () => {
  it('Should process newlines correctly', () => {
    const state = new rle.ParserState({ runCount: 10, currentCell: [0, 0] });
    state.addNewlines();
    expect(state.runCount).to.equal(0);
    expect(state.currentCell).to.deep.equal([0, 10]);
  });

  it('Should update run counts correctly', () => {
    const state = new rle.ParserState({ runCount: 10, currentCell: [1, 2] });
    state.updateRunCount(3);
    expect(state.runCount).to.equal(103);
    expect(state.currentCell).to.deep.equal([1, 2]);
  });

  it('Should process new cells correctly', () => {
    const state = new rle.ParserState(
      { cells: [], runCount: 3, currentCell: [1, 2] }
    );
    state.drawRun(1);
    expect(state.runCount).to.equal(0);
    expect(state.cells).to.deep.equal([[1, 2], [2, 2], [3, 2]]);
  });
});

describe('RLE body parser', () => {
  it('Should parse the glider correctly', () => {
    const gliderCells = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    expect(rle.parseBody('bo$2bo$3o!')).to.have.deep.members(gliderCells);
  });
});
