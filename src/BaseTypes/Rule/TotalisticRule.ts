/**
 * A Totalistic Rule subclass with the given birth and survival conditions.
 */
class TotalisticRule {
  /**
   * @param {Array<number>} births
   * @param {Array<number>} survivals
   */
  constructor(births, survivals) {
    /** @type {Array<number>} */ this.births = births;
    /** @type {Array<number>} */ this.survivals = survivals;
  }
}
export default TotalisticRule;
