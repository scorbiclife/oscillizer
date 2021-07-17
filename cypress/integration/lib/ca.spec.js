import * as ca from '../../../docs/lib/ca/carules';
import OrdSet from '../../../docs/lib/ca/orderedvalueset';

describe('Neighbor Counts', () => {
  const mooreCompare = ([xa, ya], [xb, yb]) => (xa - xb) || (ya - yb);
  const mooreNeighborCounts = (cells) => (
    ca.getNeighborCounts(new OrdSet(cells, mooreCompare), ca.neighborhood.moore)
  );
  it('Should be an empty list for an empty pattern', () => {
    expect(mooreNeighborCounts([]).items).to.eql([]);
  });
  it('Should count as 1 for its neighbors for a single cell', () => {
    expect(mooreNeighborCounts([[0, 0]]).items).to.have.deep.members([
      { cell: [-1, -1], count: 1 },
      { cell: [-1, 0], count: 1 },
      { cell: [-1, 1], count: 1 },
      { cell: [0, -1], count: 1 },
      { cell: [0, 1], count: 1 },
      { cell: [1, -1], count: 1 },
      { cell: [1, 0], count: 1 },
      { cell: [1, 1], count: 1 },
    ]);
  });
  it('Should give correct results for a glider', () => {
    const gliderNeighborCounts = (
      mooreNeighborCounts([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]])
    );
    expect(gliderNeighborCounts.items).to.have.deep.members([
      { cell: [-1, 1], count: 1 },
      { cell: [-1, 2], count: 1 },
      { cell: [-1, 3], count: 1 },
      { cell: [0, -1], count: 1 },
      { cell: [0, 0], count: 1 },
      { cell: [0, 1], count: 3 },
      { cell: [0, 2], count: 1 },
      { cell: [0, 3], count: 2 },
      { cell: [1, -1], count: 1 },
      { cell: [1, 0], count: 1 },
      { cell: [1, 1], count: 5 },
      { cell: [1, 2], count: 3 },
      { cell: [1, 3], count: 3 },
      { cell: [2, -1], count: 1 },
      { cell: [2, 0], count: 2 },
      { cell: [2, 1], count: 3 },
      { cell: [2, 2], count: 2 },
      { cell: [2, 3], count: 2 },
      { cell: [3, 0], count: 1 },
      { cell: [3, 1], count: 2 },
      { cell: [3, 2], count: 2 },
      { cell: [3, 3], count: 1 },
    ]);
  });
});

describe('Conway\'s Game of Life rule', () => {
  it('Should iterate the glider correctly (1 gen)', () => {
    const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderNextGen = [[0, 1], [2, 1], [1, 2], [2, 2], [1, 3]];
    expect(ca.conwaylife(glider)).to.have.deep.members(gliderNextGen);
  });

  it('Should iterate the glider correctly (4 gens)', () => {
    let glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    const gliderMoved = glider.map(([x, y]) => [x + 1, y + 1]);
    for (let i = 0; i < 4; i += 1) {
      glider = ca.conwaylife(glider);
    }
    expect(glider).to.have.deep.members(gliderMoved);
  });
});
