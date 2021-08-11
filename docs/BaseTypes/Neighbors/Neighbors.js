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
Neighbors.INT = class extends Neighbors { };

Neighbors.INT.X0 = new Neighbors.INT('0');

Neighbors.INT.X1c = new Neighbors.INT('1c');
Neighbors.INT.X1e = new Neighbors.INT('1e');

Neighbors.INT.X2c = new Neighbors.INT('2c');
Neighbors.INT.X2e = new Neighbors.INT('2e');
Neighbors.INT.X2k = new Neighbors.INT('2k');
Neighbors.INT.X2a = new Neighbors.INT('2a');
Neighbors.INT.X2i = new Neighbors.INT('2i');
Neighbors.INT.X2n = new Neighbors.INT('2n');

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

Neighbors.INT.X6c = new Neighbors.INT('6c');
Neighbors.INT.X6e = new Neighbors.INT('6e');
Neighbors.INT.X6k = new Neighbors.INT('6k');
Neighbors.INT.X6a = new Neighbors.INT('6a');
Neighbors.INT.X6i = new Neighbors.INT('6i');
Neighbors.INT.X6n = new Neighbors.INT('6n');

Neighbors.INT.X7c = new Neighbors.INT('7c');
Neighbors.INT.X7e = new Neighbors.INT('7e');

Neighbors.INT.X8 = new Neighbors.INT('8');

Object.freeze(Neighbors.INT);

Object.freeze(Neighbors);

export default Neighbors;
