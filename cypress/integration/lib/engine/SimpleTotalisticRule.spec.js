import { simpleBoardConwayLife } from '../../../../docs/lib/engine/Board/SimpleBoard/SimpleRules/TotalisticRule.js';

describe('Conway\'s Game of Life rule', () => {
  it('Should iterate the glider correctly (1 gen)', () => {
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderNextGen = [[0, 1], [2, 1], [1, 2], [2, 2], [1, 3]];
    expect(simpleBoardConwayLife(glider)).to.have.deep.members(gliderNextGen);
  });

  it('Should iterate the glider correctly (4 gens)', () => {
    let glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderMoved = glider.map(([x, y]) => [x + 1, y + 1]);
    for (let i = 0; i < 4; i += 1) {
      glider = simpleBoardConwayLife(glider);
    }
    expect(glider).to.have.deep.members(gliderMoved);
  });
});
