import getBoundingBox from '../../../../docs/lib/engine/boundingbox.js';

describe('Bounding box evaluator', () => {
  it('Should return correct bounding box for single cell', () => {
    const pattern = [[2, 4]];
    const expectedBox = {
      xmin: 2, xmax: 2, ymin: 4, ymax: 4,
    };
    expect(getBoundingBox(pattern)).to.deep.equal(expectedBox);
  });
  it('Should return correct bounding box for multiple cells', () => {
    const pattern = [[2, 4], [0, 0], [-5, 5]];
    const expectedBox = {
      xmin: -5, xmax: 2, ymin: 0, ymax: 5,
    };
    expect(getBoundingBox(pattern)).to.deep.equal(expectedBox);
  });
});
