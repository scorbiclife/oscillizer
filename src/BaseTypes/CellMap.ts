/**
 * @private
 * @type {function(number, number): string}
 */
const cellToString = (x, y) => `${x} ${y}`;

/**
 * @private
 * @type {function(string): Cell}
 */
const stringToCell = (s) => s.split(" ").map((e) => parseInt(e, 10));

/**
 * Map data structure that accepts Cells: [x: number, y: number] as keys.
 *
 * We need to implement this because
 * JS does not support non-primitive value types as keys (as of ES6)
 */
class CellMap {
  /**
   * @param {Array<CellEntry>} [entries=[]]
   */
  constructor(entries = []) {
    /** @type {Map<string, *>} */ this.map = new Map();
    entries.forEach(([x, y], value) => this.set([x, y], value));
  }

  /**
   * Generate and return a `CellMap` from list of keys.
   *
   * @param {Array} keys - Array of cells, each of type `[number, number]`.
   * @returns - The CellMap having the given keys with values mapped to null
   */
  static fromKeys(keys) {
    const map = new CellMap();
    keys.forEach(([x, y]) => map.set([x, y], null));
    return map;
  }

  /**
   * Generate and return a `CellMap` with the given entries.
   *
   * This is the same as the constructor, but is presented here
   * as an analogue to `fromKeys`.
   *
   * @param {Array} entries - Array of [cell, value] pairs
   * @returns The resulting CellMap having the given entries
   */
  static fromEntries(entries) {
    return new CellMap(entries);
  }

  /**
   * Return whether a cell is in the map to Map.
   *
   * @param {*} key - cell to search for, has type `[number, number]`.
   * @returns A boolean indicating whether the cell is in the set
   */
  has(key) {
    const [x, y] = key;
    return this.map.has(cellToString(x, y));
  }

  /**
   * Get the value for the given key.
   * If not found, return `defaultValue` as a fallback.
   *
   * @param {Cell} key - The key to get values for.
   * @param {*} defaultValue - The value to return when the key is not found.
   * @returns - The found value or `defaultValue`
   */
  get(key, defaultValue) {
    const [x, y] = key;
    const value = this.map.get(cellToString(x, y));
    return value !== undefined ? value : defaultValue;
  }

  /**
   * Set the value for the given key.
   *
   * @param {Cell} key - The key to set values for.
   * @param {*} value - The value to set.
   */
  set(key, value) {
    const [x, y] = key;
    this.map.set(cellToString(x, y), value);
  }

  /**
   * Return the number of keys of the map, analogous to `Map`.
   */
  get size() {
    return this.map.size;
  }

  /**
   * Return the keys of this map as in `Map`.
   * @returns A list of keys for the map.
   */
  keys() {
    return [...this.map.keys()].map(stringToCell);
  }

  /**
   * Return the entries (i.e. key, value pairs) of this map, as in `Map`.
   * @returns A list of entries for the map.
   */
  entries() {
    return [...this.map.entries()].map(([s, v]) => [stringToCell(s), v]);
  }
}

export default CellMap;
