import INTRule from '../../BaseTypes/Rule/INTRule.js';
import TotalisticRule from '../../BaseTypes/Rule/TotalisticRule.js';

/**
 * Try to parse totalistic rule from rulestring.
 * @param {string} ruleString
 * @returns {TotalisticRule|undefined} - A totalistic rule on success, `undefined` on fail.
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
  return new TotalisticRule(births, survivals);
};

/**
 * Try to parse an INT rule from rulestring.
 * @param {string} ruleString
 * @returns {INTRule|undefined} - An INT rule on success, `undefined` on fail.
 */
export const parseINTRule = (ruleString) => {
  // Dependent function and objects

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
      '0',
    ],
    [
      '1c', '1e',
    ],
    [
      '2c', '2e',
      '2a', '2k', '2i', '2n',
    ],
    [
      '3c', '3e',
      '3a', '3k', '3i', '3n',
      '3j', '3q', '3r', '3y',
    ],
    [
      '4c', '4e',
      '4a', '4k', '4i', '4n',
      '4j', '4q', '4r', '4y',
      '4t', '4w', '4z',
    ],
    [
      '5c', '5e',
      '5a', '5k', '5i', '5n',
      '5j', '5q', '5r', '5y',
    ],
    [
      '6c', '6e',
      '6a', '6k', '6i', '6n',
    ],
    [
      '7c', '7e',
    ],
    [
      '8',
    ],
  ];

  const neighborsByCountAndChar = [
    new Map(),
    new Map([
      ['c', '1c'],
      ['e', '1e'],
    ]),
    new Map([
      ['c', '2c'],
      ['e', '2e'],
      ['a', '2a'],
      ['k', '2k'],
      ['i', '2i'],
      ['n', '2n'],
    ]),
    new Map([
      ['c', '3c'],
      ['e', '3e'],
      ['a', '3a'],
      ['k', '3k'],
      ['i', '3i'],
      ['n', '3n'],
      ['j', '3j'],
      ['q', '3q'],
      ['r', '3r'],
      ['y', '3y'],
    ]),
    new Map([
      ['c', '4c'],
      ['e', '4e'],
      ['a', '4a'],
      ['k', '4k'],
      ['i', '4i'],
      ['n', '4n'],
      ['j', '4j'],
      ['q', '4q'],
      ['r', '4r'],
      ['y', '4y'],
      ['w', '4w'],
      ['t', '4t'],
      ['z', '4z'],
    ]),
    new Map([
      ['c', '5c'],
      ['e', '5e'],
      ['a', '5a'],
      ['k', '5k'],
      ['i', '5i'],
      ['n', '5n'],
      ['j', '5j'],
      ['q', '5q'],
      ['r', '5r'],
      ['y', '5y'],
    ]),
    new Map([
      ['c', '6c'],
      ['e', '6e'],
      ['a', '6a'],
      ['k', '6k'],
      ['i', '6i'],
      ['n', '6n'],
    ]),
    new Map([
      ['c', '7c'],
      ['e', '7e'],
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
  return new INTRule([...finalState.births], [...finalState.survivals]);
};
