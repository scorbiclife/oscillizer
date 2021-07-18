import * as rle from '../../../docs/lib/ca/rle.js';

describe('RLE body extractor', () => {
  it('Should process a simple RLE correctly', () => {
    const rleString = (
      `x = 3, y = 3, rule = B3/S23
        bo$
        2bo$
        3o!
      `
    );
    expect(rle.extractBody(rleString)).to.equal('bo$2bo$3o!');
  });

  it('Should process RLE with comments correctly', () => {
    const rleString = (
      `# Some comment line
      # Another comment line
      x = 3, y = 3, rule = B3/S23
          bo$
          2bo$
          3o!
      `
    );
    expect(rle.extractBody(rleString)).to.equal('bo$2bo$3o!');
  });

  it('Should process RLE without headers correctly', () => {
    const rleString = (
      `
        bo$
        2bo$
        3o!
      `
    );
    expect(rle.extractBody(rleString)).to.equal('bo$2bo$3o!');
  });
});

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
