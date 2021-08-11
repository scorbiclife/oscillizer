import Rule from '../../BaseTypes/Rule/Rule.js';
import Neighbors from '../../BaseTypes/Neighbors/Neighbors.js';

/**
 * Try to parse totalistic rule from rulestring.
 * @param {string} ruleString
 * @returns {Rule.TotalisticRule|undefined} - A totalistic rule on success, `undefined` on fail.
 */
export const parseTotalisticRule = (ruleString) => {
  const updateState = (state, c) => {
    if (!state.success) {
      return state;
    }

    const {
      success, births, survivals, isBirth,
    } = state;

    switch (c) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8':
        (isBirth ? births : survivals).push(parseInt(c, 10));
        return {
          success, births, survivals, isBirth,
        };
      case 'b': case 'B':
        return {
          success, births, survivals, isBirth: true,
        };
      case 's': case 'S':
        return {
          success, births, survivals, isBirth: false,
        };
      case '/':
        return {
          success, births, survivals, isBirth: !isBirth,
        };
      default:
        return { success: false };
    }
  };
  const finalState = Array.from(ruleString).reduce(
    updateState, { success: true, births: [], survivals: [] }
  );
  if (!finalState.success) {
    return undefined;
  }
  const births = [...new Set(finalState.births).keys()];
  const survivals = [...new Set(finalState.survivals).keys()];
  return new Rule.TotalisticRule(births, survivals);
};

/**
 * Try to parse an INT rule from rulestring.
 * @param {string} ruleString
 * @returns {Rule.INTRule|undefined} - An INT rule on success, `undefined` on fail.
 */
export const parseINTRule = (ruleString) => {
  // Dependent function and objects
  const { INT } = Neighbors;

  const copyWithBirth = (state) => ({
    isBirth: true,
    births: state.births,
    survivals: state.survivals,
    hasError: state.hasError,
  });

  const copyWithSurvival = (state) => ({
    isBirth: false,
    births: state.births,
    survivals: state.survivals,
    hasError: state.hasError,
  });

  const copyWithToggledBirth = (state) => ({
    isBirth: !state.isBirth,
    births: state.births,
    survivals: state.survivals,
    hasError: state.hasError,
  });

  // Assumes word matches `/[0-8][-cekainyqjrtwz]/`
  const allNeighborsByCount = [
    [
      INT.X0,
    ],
    [
      INT.X1c, INT.X1e,
    ],
    [
      INT.X2c, INT.X2e,
      INT.X2a, INT.X2k, INT.X2i, INT.X2n,
    ],
    [
      INT.X3c, INT.X3e,
      INT.X3a, INT.X3k, INT.X3i, INT.X3n,
      INT.X3j, INT.X3q, INT.X3r, INT.X3y,
    ],
    [
      INT.X4c, INT.X4e,
      INT.X4a, INT.X4k, INT.X4i, INT.X4n,
      INT.X4j, INT.X4q, INT.X4r, INT.X4y,
      INT.X4t, INT.X4w, INT.X4z,
    ],
    [
      INT.X5c, INT.X5e,
      INT.X5a, INT.X5k, INT.X5i, INT.X5n,
      INT.X5j, INT.X5q, INT.X5r, INT.X5y,
    ],
    [
      INT.X6c, INT.X6e,
      INT.X6a, INT.X6k, INT.X6i, INT.X6n,
    ],
    [
      INT.X7c, INT.X7e,
    ],
    [
      INT.X8,
    ],
  ];

  const neighborsByCountAndChar = [
    new Map(),
    new Map([
      ['c', INT.X1c],
      ['e', INT.X1e],
    ]),
    new Map([
      ['c', INT.X2c],
      ['e', INT.X2e],
      ['a', INT.X2a],
      ['k', INT.X2k],
      ['i', INT.X2i],
      ['n', INT.X2n],
    ]),
    new Map([
      ['c', INT.X3c],
      ['e', INT.X3e],
      ['a', INT.X3a],
      ['k', INT.X3k],
      ['i', INT.X3i],
      ['n', INT.X3n],
      ['j', INT.X3j],
      ['q', INT.X3q],
      ['r', INT.X3r],
      ['y', INT.X3y],
    ]),
    new Map([
      ['c', INT.X4c],
      ['e', INT.X4e],
      ['a', INT.X4a],
      ['k', INT.X4k],
      ['i', INT.X4i],
      ['n', INT.X4n],
      ['j', INT.X4j],
      ['q', INT.X4q],
      ['r', INT.X4r],
      ['y', INT.X4y],
      ['w', INT.X4w],
      ['t', INT.X4t],
      ['z', INT.X4z],
    ]),
    new Map([
      ['c', INT.X5c],
      ['e', INT.X5e],
      ['a', INT.X5a],
      ['k', INT.X5k],
      ['i', INT.X5i],
      ['n', INT.X5n],
      ['j', INT.X5j],
      ['q', INT.X5q],
      ['r', INT.X5r],
      ['y', INT.X5y],
    ]),
    new Map([
      ['c', INT.X6c],
      ['e', INT.X6e],
      ['a', INT.X6a],
      ['k', INT.X6k],
      ['i', INT.X6i],
      ['n', INT.X6n],
    ]),
    new Map([
      ['c', INT.X7c],
      ['e', INT.X7e],
    ]),
    new Map(),
  ];

  const getNeighborsFromWord = (word) => {
    const neighborSet = new Set();
    const count = parseInt(word[0], 10);
    // The chars before the first `-` are births
    // The chars after them are survivals
    const [birthsString, ...survivalsStrings] = word.slice(1).split('-');
    if (birthsString === '') {
      allNeighborsByCount[count].forEach((n) => neighborSet.add(n));
    } else {
      Array.from(birthsString).forEach(
        (c) => neighborSet.add(neighborsByCountAndChar[count].get(c))
      );
    }
    Array.from(survivalsStrings.join('')).forEach(
      (c) => neighborSet.delete(neighborsByCountAndChar[count].get(c))
    );
    return neighborSet;
  };

  // Main logic
  const initialState = {
    isBirth: false, births: new Set(), survivals: new Set(),
  };

  const words = ruleString.match(/[bBsS/]|[0-8][-cekainyqjrtwz]*/g);
  if (words.reduce((psum, w) => psum + w.length, 0) !== ruleString.length) {
    return undefined;
  }
  const finalState = words.reduce(
    (state, word) => {
      if (word === 'b' || word === 'B') {
        return copyWithBirth(state);
      }
      if (word === 's' || word === 'S') {
        return copyWithSurvival(state);
      }
      if (word === '/') {
        return copyWithToggledBirth(state);
      }
      // Neighbors
      const neighborsSet = getNeighborsFromWord(word);
      const targetSet = (state.isBirth ? state.births : state.survivals);
      neighborsSet.forEach((n) => targetSet.add(n));
      return state;
    },
    initialState
  );
  return new Rule.INTRule([...finalState.births], [...finalState.survivals]);
};
