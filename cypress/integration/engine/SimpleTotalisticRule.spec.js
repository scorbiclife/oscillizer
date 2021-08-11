import { simpleBoardTotalisticRule } from '../../../docs/Engine/Board/SimpleBoard/SimpleRules/TotalisticRule.js';
import Rule from '../../../docs/BaseTypes/Rule/Rule.js';

const conwaylife = simpleBoardTotalisticRule(
  new Rule.TotalisticRule([3], [2, 3])
);

describe('Conway\'s Game of Life rule', () => {
  it('should iterate the glider correctly (1 gen)', () => {
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderNextGen = [[0, 1], [2, 1], [1, 2], [2, 2], [1, 3]];
    expect(conwaylife(glider)).to.have.deep.members(gliderNextGen);
  });

  it('should iterate the glider correctly (4 gens)', () => {
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderMoved = glider.map(([x, y]) => [x + 1, y + 1]);
    const gliderIterated = new Array(4).fill().reduce(conwaylife, glider);
    expect(gliderIterated).to.have.deep.members(gliderMoved);
  });

  it('should iterate the mold correctly (4 gens)', () => {
    const moldInitial = [
      [3, 0], [4, 0], [2, 1], [5, 1], [0, 2], [3, 2], [5, 2],
      [4, 3], [0, 4], [2, 4], [3, 4], [1, 5],
    ];
    const moldIterated = new Array(4).fill().reduce(conwaylife, moldInitial);
    expect(moldIterated).to.have.deep.members(moldInitial);
  });
});
