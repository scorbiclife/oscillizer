import Rule from '../../BaseTypes/Rule/Rule.js';

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
};
