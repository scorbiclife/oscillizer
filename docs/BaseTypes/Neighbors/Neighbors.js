/* eslint-disable max-classes-per-file */

/**
 * A union type with all neighbor types.
 * @readonly
 * @class
 * @property {string} name - A name for each enum value.
 */
class Neighbors {
  constructor(name) {
    this.name = name;
  }
}

const intNeighborsByName = new Map();

// Transition index is the weighted sum of the 3x3 neighborhood under these weights:
//  1   2   4
//  8   16  32
//  64  128 256
// i.e. the binary value with little-endian bit order.
const intNeighborsByIndex = [];

/**
 * An Enum class for specifying neighbors for INT rules.
 *
 * The X in the property names means anything in B (Births) or S (Survivals).
 * (e.g. X2c means Births or Survials in 2c neighbor configuration)
 *
 * @readonly
 * @enum {Neighbors.INT}
 * @class
 */
Neighbors.INT = class extends Neighbors {
  static fromName(name) {
    return intNeighborsByName.get(name);
  }

  static fromIndex(index) {
    return intNeighborsByIndex[index];
  }
};

Neighbors.INT.X0 = new Neighbors.INT('0');
intNeighborsByName.set('0', Neighbors.INT.X0);

Neighbors.INT.X1c = new Neighbors.INT('1c');
Neighbors.INT.X1e = new Neighbors.INT('1e');
intNeighborsByName.set('1c', Neighbors.INT.X1c);
intNeighborsByName.set('1e', Neighbors.INT.X1e);

Neighbors.INT.X2c = new Neighbors.INT('2c');
Neighbors.INT.X2e = new Neighbors.INT('2e');
Neighbors.INT.X2k = new Neighbors.INT('2k');
Neighbors.INT.X2a = new Neighbors.INT('2a');
Neighbors.INT.X2i = new Neighbors.INT('2i');
Neighbors.INT.X2n = new Neighbors.INT('2n');
intNeighborsByName.set('2c', Neighbors.INT.X2c);
intNeighborsByName.set('2e', Neighbors.INT.X2e);
intNeighborsByName.set('2k', Neighbors.INT.X2k);
intNeighborsByName.set('2a', Neighbors.INT.X2a);
intNeighborsByName.set('2i', Neighbors.INT.X2i);
intNeighborsByName.set('2n', Neighbors.INT.X2n);

Neighbors.INT.X3c = new Neighbors.INT('3c');
Neighbors.INT.X3e = new Neighbors.INT('3e');
Neighbors.INT.X3k = new Neighbors.INT('3k');
Neighbors.INT.X3a = new Neighbors.INT('3a');
Neighbors.INT.X3i = new Neighbors.INT('3i');
Neighbors.INT.X3n = new Neighbors.INT('3n');
Neighbors.INT.X3y = new Neighbors.INT('3y');
Neighbors.INT.X3q = new Neighbors.INT('3q');
Neighbors.INT.X3j = new Neighbors.INT('3j');
Neighbors.INT.X3r = new Neighbors.INT('3r');
intNeighborsByName.set('3c', Neighbors.INT.X3c);
intNeighborsByName.set('3e', Neighbors.INT.X3e);
intNeighborsByName.set('3k', Neighbors.INT.X3k);
intNeighborsByName.set('3a', Neighbors.INT.X3a);
intNeighborsByName.set('3i', Neighbors.INT.X3i);
intNeighborsByName.set('3n', Neighbors.INT.X3n);
intNeighborsByName.set('3j', Neighbors.INT.X3j);
intNeighborsByName.set('3q', Neighbors.INT.X3q);
intNeighborsByName.set('3r', Neighbors.INT.X3r);
intNeighborsByName.set('3y', Neighbors.INT.X3y);

Neighbors.INT.X4c = new Neighbors.INT('4c');
Neighbors.INT.X4e = new Neighbors.INT('4e');
Neighbors.INT.X4k = new Neighbors.INT('4k');
Neighbors.INT.X4a = new Neighbors.INT('4a');
Neighbors.INT.X4i = new Neighbors.INT('4i');
Neighbors.INT.X4n = new Neighbors.INT('4n');
Neighbors.INT.X4y = new Neighbors.INT('4y');
Neighbors.INT.X4q = new Neighbors.INT('4q');
Neighbors.INT.X4j = new Neighbors.INT('4j');
Neighbors.INT.X4r = new Neighbors.INT('4r');
Neighbors.INT.X4t = new Neighbors.INT('4t');
Neighbors.INT.X4w = new Neighbors.INT('4w');
Neighbors.INT.X4z = new Neighbors.INT('4z');
intNeighborsByName.set('4c', Neighbors.INT.X4c);
intNeighborsByName.set('4e', Neighbors.INT.X4e);
intNeighborsByName.set('4k', Neighbors.INT.X4k);
intNeighborsByName.set('4a', Neighbors.INT.X4a);
intNeighborsByName.set('4i', Neighbors.INT.X4i);
intNeighborsByName.set('4n', Neighbors.INT.X4n);
intNeighborsByName.set('4j', Neighbors.INT.X4j);
intNeighborsByName.set('4q', Neighbors.INT.X4q);
intNeighborsByName.set('4r', Neighbors.INT.X4r);
intNeighborsByName.set('4y', Neighbors.INT.X4y);
intNeighborsByName.set('4t', Neighbors.INT.X4t);
intNeighborsByName.set('4w', Neighbors.INT.X4w);
intNeighborsByName.set('4z', Neighbors.INT.X4z);

Neighbors.INT.X5c = new Neighbors.INT('5c');
Neighbors.INT.X5e = new Neighbors.INT('5e');
Neighbors.INT.X5k = new Neighbors.INT('5k');
Neighbors.INT.X5a = new Neighbors.INT('5a');
Neighbors.INT.X5i = new Neighbors.INT('5i');
Neighbors.INT.X5n = new Neighbors.INT('5n');
Neighbors.INT.X5y = new Neighbors.INT('5y');
Neighbors.INT.X5q = new Neighbors.INT('5q');
Neighbors.INT.X5j = new Neighbors.INT('5j');
Neighbors.INT.X5r = new Neighbors.INT('5r');
intNeighborsByName.set('5c', Neighbors.INT.X5c);
intNeighborsByName.set('5e', Neighbors.INT.X5e);
intNeighborsByName.set('5k', Neighbors.INT.X5k);
intNeighborsByName.set('5a', Neighbors.INT.X5a);
intNeighborsByName.set('5i', Neighbors.INT.X5i);
intNeighborsByName.set('5n', Neighbors.INT.X5n);
intNeighborsByName.set('5j', Neighbors.INT.X5j);
intNeighborsByName.set('5q', Neighbors.INT.X5q);
intNeighborsByName.set('5r', Neighbors.INT.X5r);
intNeighborsByName.set('5y', Neighbors.INT.X5y);

Neighbors.INT.X6c = new Neighbors.INT('6c');
Neighbors.INT.X6e = new Neighbors.INT('6e');
Neighbors.INT.X6k = new Neighbors.INT('6k');
Neighbors.INT.X6a = new Neighbors.INT('6a');
Neighbors.INT.X6i = new Neighbors.INT('6i');
Neighbors.INT.X6n = new Neighbors.INT('6n');
intNeighborsByName.set('6c', Neighbors.INT.X6c);
intNeighborsByName.set('6e', Neighbors.INT.X6e);
intNeighborsByName.set('6k', Neighbors.INT.X6k);
intNeighborsByName.set('6a', Neighbors.INT.X6a);
intNeighborsByName.set('6i', Neighbors.INT.X6i);
intNeighborsByName.set('6n', Neighbors.INT.X6n);

Neighbors.INT.X7c = new Neighbors.INT('7c');
Neighbors.INT.X7e = new Neighbors.INT('7e');
intNeighborsByName.set('7c', Neighbors.INT.X7c);
intNeighborsByName.set('7e', Neighbors.INT.X7e);

Neighbors.INT.X8 = new Neighbors.INT('8');
intNeighborsByName.set('8', Neighbors.INT.X8);

// Initialize the  index to transition table.
`
0 1c 1e 2a 1c 2c 2a 3i 1e 2a 2e 3a 2k 3n 3j 4a
0 1c 1e 2a 1c 2c 2a 3i 1e 2a 2e 3a 2k 3n 3j 4a
1e 2k 2e 3j 2a 3n 3a 4a 2i 3r 3e 4r 3r 4i 4r 5i
1e 2k 2e 3j 2a 3n 3a 4a 2i 3r 3e 4r 3r 4i 4r 5i
1c 2c 2k 3n 2n 3c 3q 4n 2a 3i 3j 4a 3q 4n 4w 5a
1c 2c 2k 3n 2n 3c 3q 4n 2a 3i 3j 4a 3q 4n 4w 5a
2k 3y 3k 4k 3q 4y 4q 5j 3r 4t 4j 5n 4z 5r 5q 6a
2k 3y 3k 4k 3q 4y 4q 5j 3r 4t 4j 5n 4z 5r 5q 6a
1e 2k 2i 3r 2k 3y 3r 4t 2e 3j 3e 4r 3k 4k 4j 5n
1e 2k 2i 3r 2k 3y 3r 4t 2e 3j 3e 4r 3k 4k 4j 5n
2e 3k 3e 4j 3j 4k 4r 5n 3e 4j 4e 5c 4j 5y 5c 6c
2e 3k 3e 4j 3j 4k 4r 5n 3e 4j 4e 5c 4j 5y 5c 6c
2a 3n 3r 4i 3q 4y 4z 5r 3a 4a 4r 5i 4q 5j 5q 6a
2a 3n 3r 4i 3q 4y 4z 5r 3a 4a 4r 5i 4q 5j 5q 6a
3j 4k 4j 5y 4w 5k 5q 6k 4r 5n 5c 6c 5q 6k 6n 7c
3j 4k 4j 5y 4w 5k 5q 6k 4r 5n 5c 6c 5q 6k 6n 7c
1c 2n 2k 3q 2c 3c 3n 4n 2k 3q 3k 4q 3y 4y 4k 5j
1c 2n 2k 3q 2c 3c 3n 4n 2k 3q 3k 4q 3y 4y 4k 5j
2a 3q 3j 4w 3i 4n 4a 5a 3r 4z 4j 5q 4t 5r 5n 6a
2a 3q 3j 4w 3i 4n 4a 5a 3r 4z 4j 5q 4t 5r 5n 6a
2c 3c 3y 4y 3c 4c 4y 5e 3n 4n 4k 5j 4y 5e 5k 6e
2c 3c 3y 4y 3c 4c 4y 5e 3n 4n 4k 5j 4y 5e 5k 6e
3n 4y 4k 5k 4n 5e 5j 6e 4i 5r 5y 6k 5r 6i 6k 7e
3n 4y 4k 5k 4n 5e 5j 6e 4i 5r 5y 6k 5r 6i 6k 7e
2a 3q 3r 4z 3n 4y 4i 5r 3j 4w 4j 5q 4k 5k 5y 6k
2a 3q 3r 4z 3n 4y 4i 5r 3j 4w 4j 5q 4k 5k 5y 6k
3a 4q 4r 5q 4a 5j 5i 6a 4r 5q 5c 6n 5n 6k 6c 7c
3a 4q 4r 5q 4a 5j 5i 6a 4r 5q 5c 6n 5n 6k 6c 7c
3i 4n 4t 5r 4n 5e 5r 6i 4a 5a 5n 6a 5j 6e 6k 7e
3i 4n 4t 5r 4n 5e 5r 6i 4a 5a 5n 6a 5j 6e 6k 7e
4a 5j 5n 6k 5a 6e 6a 7e 5i 6a 6c 7c 6a 7e 7c 8
4a 5j 5n 6k 5a 6e 6a 7e 5i 6a 6c 7c 6a 7e 7c 8
`.trim().split(/\s/).forEach(
    (s, i) => { intNeighborsByIndex[i] = intNeighborsByName.get(s); }
  );

Object.freeze(Neighbors.INT);
Object.freeze(intNeighborsByName);
Object.freeze(intNeighborsByIndex);

Object.freeze(Neighbors);

export default Neighbors;
