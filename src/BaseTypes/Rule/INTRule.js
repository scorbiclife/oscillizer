/**
 * @typedef {import('../Neighbors/INTNeighbors').INTNeighbor} INTNeighbor
 */

/**
 * An Isotropic non-totalistic rule with the given birth and survival conditions.
 */
class INTRule {
  /**
   * @param {Array<INTNeighbor>} births - The birth conditions
   * @param {Array<INTNeighbor>} survivals - The survival conditions
   */
  constructor(births, survivals) {
    /** @type {Array<INTNeighbor>} */ this.births = births;
    /** @type {Array<INTNeighbor>} */ this.survivals = survivals;
  }
}
export default INTRule;
