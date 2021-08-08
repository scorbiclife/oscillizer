/**
 * An Enum class for specifying neighbors for INT rules.
 *
 * The X in the property names means anything in B (Births) or S (Survivals).
 * (e.g. X2c means Births or Survials in 2c neighbor configuration)
 *
 * @readonly
 * @enum {INTNeighbors}
 * @property {string} name - The name of each enum value info
 */
class INTNeighbors {
  constructor(name) {
    this.name = name;
  }
}

INTNeighbors.X0 = new INTNeighbors('0');

INTNeighbors.X1c = new INTNeighbors('1c');
INTNeighbors.X1e = new INTNeighbors('1e');

INTNeighbors.X2c = new INTNeighbors('2c');
INTNeighbors.X2e = new INTNeighbors('2e');
INTNeighbors.X2k = new INTNeighbors('2k');
INTNeighbors.X2a = new INTNeighbors('2a');
INTNeighbors.X2i = new INTNeighbors('2i');
INTNeighbors.X2n = new INTNeighbors('2n');

INTNeighbors.X3c = new INTNeighbors('3c');
INTNeighbors.X3e = new INTNeighbors('3e');
INTNeighbors.X3k = new INTNeighbors('3k');
INTNeighbors.X3a = new INTNeighbors('3a');
INTNeighbors.X3i = new INTNeighbors('3i');
INTNeighbors.X3n = new INTNeighbors('3n');
INTNeighbors.X3y = new INTNeighbors('3y');
INTNeighbors.X3q = new INTNeighbors('3q');
INTNeighbors.X3j = new INTNeighbors('3j');
INTNeighbors.X3r = new INTNeighbors('3r');

INTNeighbors.X4c = new INTNeighbors('4c');
INTNeighbors.X4e = new INTNeighbors('4e');
INTNeighbors.X4k = new INTNeighbors('4k');
INTNeighbors.X4a = new INTNeighbors('4a');
INTNeighbors.X4i = new INTNeighbors('4i');
INTNeighbors.X4n = new INTNeighbors('4n');
INTNeighbors.X4y = new INTNeighbors('4y');
INTNeighbors.X4q = new INTNeighbors('4q');
INTNeighbors.X4j = new INTNeighbors('4j');
INTNeighbors.X4r = new INTNeighbors('4r');
INTNeighbors.X4t = new INTNeighbors('4t');
INTNeighbors.X4w = new INTNeighbors('4w');
INTNeighbors.X4z = new INTNeighbors('4z');

INTNeighbors.X5c = new INTNeighbors('5c');
INTNeighbors.X5e = new INTNeighbors('5e');
INTNeighbors.X5k = new INTNeighbors('5k');
INTNeighbors.X5a = new INTNeighbors('5a');
INTNeighbors.X5i = new INTNeighbors('5i');
INTNeighbors.X5n = new INTNeighbors('5n');
INTNeighbors.X5y = new INTNeighbors('5y');
INTNeighbors.X5q = new INTNeighbors('5q');
INTNeighbors.X5j = new INTNeighbors('5j');
INTNeighbors.X5r = new INTNeighbors('5r');

INTNeighbors.X6c = new INTNeighbors('6c');
INTNeighbors.X6e = new INTNeighbors('6e');
INTNeighbors.X6k = new INTNeighbors('6k');
INTNeighbors.X6a = new INTNeighbors('6a');
INTNeighbors.X6i = new INTNeighbors('6i');
INTNeighbors.X6n = new INTNeighbors('6n');

INTNeighbors.X7c = new INTNeighbors('7c');
INTNeighbors.X7e = new INTNeighbors('7e');

INTNeighbors.X8 = new INTNeighbors('8');

Object.freeze(INTNeighbors);

export default INTNeighbors;
