export default class CellMap {
  constructor(entries) {
    this.maps = new Map();
    (entries || []).forEach(([x, y], value) => this.set([x, y], value));
  }

  static fromKeys(keys) {
    const map = new CellMap();
    keys.forEach(([x, y]) => map.set([x, y], null));
    return map;
  }

  static fromEntries(entries) {
    return new CellMap(entries);
  }

  has([x, y]) {
    return this.maps.has(x) && this.maps.get(x).has(y);
  }

  get([x, y], defaultValue) {
    if (!this.has([x, y])) {
      return defaultValue;
    }
    return this.maps.get(x).get(y);
  }

  set([x, y], value) {
    if (!this.maps.has(x)) {
      this.maps.set(x, new Map());
    }
    this.maps.get(x).set(y, value);
  }

  get size() {
    return [...this.maps.values()].map((m) => m.size).reduce((a, b) => a + b, 0);
  }

  keys() {
    const addEntryToArray = (array, [x, mapY]) => {
      const newCells = [...mapY.keys()].map((y) => [x, y]);
      return array.concat(newCells);
    };
    return [...this.maps.entries()].reduce(addEntryToArray, []);
  }

  entries() {
    const addEntryToArray = (array, [x, mapY]) => {
      const newEntries = [...mapY.entries()].map(([y, value]) => [[x, y], value]);
      return array.concat(newEntries);
    };
    return [...this.maps.entries()].reduce(addEntryToArray, []);
  }
}
