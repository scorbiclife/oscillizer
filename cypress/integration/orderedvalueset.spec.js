import OrderedValueSet from '../../docs/lib/orderedvalueset';

describe('OrderedValueSets', () => {
  const makePrimitiveSet = () => new OrderedValueSet([1, 4, 3, 2, 5, 8, 9, 7, 6]);
  const makeObjectSet = () => new OrderedValueSet(
    [[0, 0], [0, 1], [2, 3], [100, -100]],
    ([xa, ya], [xb, yb]) => ((xa + ya) - (xb + yb)) || (xa - xb)
  );
  it('Should have the items ordered', () => {
    const expectedItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(makePrimitiveSet().items).to.deep.equal(expectedItems);
  });

  it('Should have the items ordered (with non-primitive items)', () => {
    const expectedItems = [[0, 0], [100, -100], [0, 1], [2, 3]];
    expect(makeObjectSet().items).to.deep.equal(expectedItems);
  });

  it('Should only consider unique elements', () => {
    const nonUniqueItems = new OrderedValueSet([1, 2, 1, 3, 1, 2, 1, 4]).items;
    const expectedItems = [1, 2, 3, 4];
    expect(nonUniqueItems).to.deep.equal(expectedItems);
  });

  it('Should successfully add items even when it is empty', () => {
    const emptySet = new OrderedValueSet([]);
    emptySet.set(0);
    expect(emptySet.items).to.deep.equal([0]);
  });

  it('Should successfully add object items even when it is empty', () => {
    const emptySet = new OrderedValueSet([], (a, b) => a.value - b.value);
    emptySet.set({ value: 0 });
    expect(emptySet.items).to.deep.equal([{ value: 0 }]);
  });

  it('Should overwrite objects when an identical value exists', () => {
    const objectSet = makeObjectSet();
    objectSet.set([0, 1, 3]);
    const expectedMembers = [[0, 0], [100, -100], [0, 1, 3], [2, 3]];
    expect(objectSet.items).to.deep.equal(expectedMembers);
  });

  it('Should be ordered after adding items', () => {
    const exampleSet = makePrimitiveSet();
    exampleSet.set(0);
    const expectedItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(exampleSet.items).to.deep.equal(expectedItems);
  });

  it('Should be ordered after adding items (non-primitive)', () => {
    const exampleSet = makeObjectSet();
    exampleSet.set([1, 3]);
    const expectedItems = [[0, 0], [100, -100], [0, 1], [1, 3], [2, 3]];
    expect(exampleSet.items).to.deep.equal(expectedItems);
  });

  it('Should be ordered after adding items (non-primitive case 2)', () => {
    const cmp = ({ cell: [xa, ya] }, { cell: [xb, yb] }) => (xa - xb) || (ya - yb);
    const exampleSet = new OrderedValueSet([], cmp);
    exampleSet.set({ cell: [0, 0] });
    exampleSet.set({ cell: [0, 1] });
    const expectedItems = [{ cell: [0, 0] }, { cell: [0, 1] }];
    expect(exampleSet.items).to.deep.equal(expectedItems);
  });

  it('Should be ordered after removing items', () => {
    const exampleSet = makePrimitiveSet();
    exampleSet.unset(5);
    const expectedItems = [1, 2, 3, 4, 6, 7, 8, 9];
    expect(exampleSet.items).to.deep.equal(expectedItems);
  });

  it('Should return the item at index', () => {
    const exampleSet = makePrimitiveSet();
    expect(exampleSet.indexOf(0)).to.equal(-1);
    const exampleIndices = exampleSet.items.map((i) => exampleSet.indexOf(i));
    expect(exampleIndices).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('Should return the item at index (with non-primitive items)', () => {
    const exampleSet = makeObjectSet();
    const exampleSet2 = makeObjectSet();
    expect(exampleSet.indexOf([0, 2])).to.equal(-1);
    const exampleIndices = exampleSet2.items.map((i) => exampleSet.indexOf(i));
    expect(exampleIndices).to.deep.equal([0, 1, 2, 3]);
  });
});
