export default class OrderedValueSet {
  // An ordered set operating on value comparisons.
  // Assumes the items are all unique (with `this.compare`)
  constructor(items, compareFunction = (a, b) => a - b) {
    this.compare = compareFunction;
    const sortedItems = [...items].sort(this.compare);
    const isItemFirstOfKind = (
      (v, i) => (i === 0) || this.compare(v, sortedItems[i - 1])
    );
    const sortedUniqueItems = sortedItems.filter(isItemFirstOfKind);
    this.items = sortedUniqueItems;
  }

  indexOf(key, startIndex = 0) {
    // Assumptions:
    //  All items are ordered and no two items `this.compare` equal.
    // Invariants:
    //  this.items.slice(startIndex, lo).every([k, v] => k < key)
    //  this.items.slice(hi).every([k, v] => k > key)
    // So that we only have to check this.items.slice(lo, hi)
    let [lo, hi] = [startIndex, this.items.length];
    // Edge case: empty collection
    if (lo >= hi) {
      return -1;
    }
    while (hi - lo > 1) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const pivotKey = this.items[mid];
      const cmpResult = Math.sign(this.compare(key, pivotKey));
      switch (cmpResult) {
        case 0:
          return mid;
        case 1:
          lo = mid;
          break;
        case -1:
          hi = mid;
          break;
        default:
          throw new Error('Comparison returned non-numeric value');
      }
    }
    return this.compare(key, this.items[lo]) ? -1 : lo;
  }

  has(key) {
    return this.indexOf(key) !== -1;
  }

  get(key) {
    const indexOfKey = this.indexOf(key);
    if (indexOfKey === -1) {
      return undefined;
    }
    return this.items[indexOfKey];
  }

  set(key) {
    const indexOfKey = this.indexOf(key);
    if (indexOfKey === -1) {
      this.items.push(key);
      this.items.sort(this.compare);
      return;
    }
    this.items[indexOfKey] = key;
  }

  unset(key) {
    const indexOfKey = this.indexOf(key);
    if (indexOfKey === -1) {
      return;
    }
    this.items.splice(indexOfKey, 1);
  }

  dataEquals(data) {
    if (this.items.length !== data.length) {
      return false;
    }
    return this.items.every((item, i) => this.compare(item, data[i]) === 0);
  }

  equals(other) {
    return this.dataEquals(other.items);
  }
}
