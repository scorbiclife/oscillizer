import * as rle from '../../../src/MVC/Controllers/OscStatsController/RLEHelpers.ts';

describe('RLE body parser', () => {
  it('should parse the glider correctly', () => {
    const gliderCells = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    expect(rle.parseBody('bo$2bo$3o!')).to.have.deep.members(gliderCells);
  });
});
