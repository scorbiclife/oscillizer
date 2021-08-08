/* eslint-disable max-classes-per-file */

/**
 * This is a union type for various types of rules.
 * Match each subtype by checking its constructor.
 * e.g. `switch (rule.constructor) { case Rule.TotalisticRule: ...; }`
 *
 * @class
 * @param {Array} births - The birth conditions
 * @param {Array} survivals - The survival conditions
 */
class Rule {
  constructor(births, survivals) {
    this.births = births;
    this.survivals = survivals;
  }
}

/**
 * A Totalistic Rule subclass with the given birth and survival conditions.
 *
 * @class
 * @param {Array<number>} births - The birth conditions
 * @param {Array<number>} survivals - The survival conditions
 */
Rule.TotalisticRule = class extends Rule { };

/**
 * An Isotropic non-totalistic rule with the given birth and survival conditions.
 *
 * @class
 * @param {Array<INTNeighbors>} births - The birth conditions
 * @param {Array<INTNeighbors>} survivals - The survival conditions
 */
Rule.INTRule = class extends Rule { };
