import PatternParser from '../../../src/Engine/RLE/PatternParser.ts';

describe('RLE Parser state', () => {
  it('should process newlines correctly', () => {
    const state = new PatternParser({ runCount: 10, currentCell: [0, 0] });
    state.addNewlines();
    expect(state.runCount).to.equal(0);
    expect(state.currentCell).to.deep.equal([0, 10]);
  });

  it('should update run counts correctly', () => {
    const state = new PatternParser({ runCount: 10, currentCell: [1, 2] });
    state.updateRunCount(3);
    expect(state.runCount).to.equal(103);
    expect(state.currentCell).to.deep.equal([1, 2]);
  });

  it('should process new cells correctly', () => {
    const state = new PatternParser(
      { cells: [], runCount: 3, currentCell: [1, 2] }
    );
    state.drawRun(1);
    expect(state.runCount).to.equal(0);
    expect(state.cells).to.deep.equal([[1, 2], [2, 2], [3, 2]]);
  });
});
