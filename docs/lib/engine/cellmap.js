const cellToString = (x, y) => `${x} ${y}`;
const stringToCell = (s) => s.split(' ').map((e) => parseInt(e, 10));

export default class CellMap {
  constructor(entries) {
    this.map = new Map();
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
    return this.map.has(cellToString(x, y));
  }

  get([x, y], defaultValue) {
    return this.map.get(cellToString(x, y), defaultValue);
  }

  set([x, y], value) {
    this.map.set(cellToString(x, y), value);
  }

  get size() {
    return this.map.size;
  }

  keys() {
    return [...this.map.keys()].map(stringToCell);
  }

  entries() {
    return [...this.map.entries()].map(([s, v]) => [stringToCell(s), v]);
  }
}
