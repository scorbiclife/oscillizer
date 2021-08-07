import { simpleBoardConwayLife } from '../../../../docs/lib/engine/Board/SimpleBoard/SimpleRules/TotalisticRule.js';

describe('Conway\'s Game of Life rule', () => {
  it('Should iterate the glider correctly (1 gen)', () => {
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderNextGen = [[0, 1], [2, 1], [1, 2], [2, 2], [1, 3]];
    expect(simpleBoardConwayLife(glider)).to.have.deep.members(gliderNextGen);
  });

  it('Should iterate the glider correctly (4 gens)', () => {
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderMoved = glider.map(([x, y]) => [x + 1, y + 1]);
    const gliderIterated = new Array(4).fill().reduce(simpleBoardConwayLife, glider);
    expect(gliderIterated).to.have.deep.members(gliderMoved);
  });

  it('Should iterate the mold correctly (4 gens)', () => {
    const moldInitial = [
      [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
      [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
    ];
    const moldIterated = new Array(4).fill().reduce(simpleBoardConwayLife, moldInitial);
    expect(moldIterated).to.have.deep.members(moldInitial);
  });
});
