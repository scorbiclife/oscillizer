/** @module */

/**
 * An enum for specifying neighbors for INT rules.
 */
export const INT = {
  // eslint-disable-next-line quote-props
  0: "0",

  "1c": "1c",
  "1e": "1e",

  "2c": "2c",
  "2e": "2e",
  "2a": "2a",
  "2k": "2k",
  "2i": "2i",
  "2n": "2n",

  "3c": "3c",
  "3e": "3e",
  "3a": "3a",
  "3k": "3k",
  "3i": "3i",
  "3n": "3n",
  "3j": "3j",
  "3q": "3q",
  "3r": "3r",
  "3y": "3y",

  "4c": "4c",
  "4e": "4e",
  "4a": "4a",
  "4k": "4k",
  "4i": "4i",
  "4n": "4n",
  "4j": "4j",
  "4q": "4q",
  "4r": "4r",
  "4y": "4y",
  "4t": "4t",
  "4w": "4w",
  "4z": "4z",

  "5c": "5c",
  "5e": "5e",
  "5a": "5a",
  "5k": "5k",
  "5i": "5i",
  "5n": "5n",
  "5j": "5j",
  "5q": "5q",
  "5r": "5r",
  "5y": "5y",

  "6c": "6c",
  "6e": "6e",
  "6a": "6a",
  "6k": "6k",
  "6i": "6i",
  "6n": "6n",

  "7c": "7c",
  "7e": "7e",

  // eslint-disable-next-line quote-props
  8: "8",
};

/**
 * @typedef {keyof(INT)} INTNeighbor
 */

// Initialize the index to neighbor table.
/** @type {Array<INTNeighbor>} */
export const intNeighborsByIndex = `
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
  `
  .trim()
  .split(/\s+/);
