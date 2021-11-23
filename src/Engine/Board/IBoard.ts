/**
 * @typedef {import('../../BaseTypes/BoundingBox').default} BoundingBox
 */

/**
 * A board generally contains these information:
 *  A pattern to operate on,
 *  A rule to generate new patterns,
 *  and other auxillary info like bounding boxes and generation.
 * These are tightly coupled and needs each other's implementation details
 * in order to operate, so they are grouped into one big interface.
 * For a sample implementation,
 * see {@link import('./SimpleBoard/SimpleTotalisticBoard').SimpleTotalisticBoard}.
 *
 * @typedef IBoard
 * @property {function(): Array<Cell>} getCells - Get the cells.
 * @property {function(): Array<Array<Cell|number>>} getCellsAndStates - Get the cells and states.
 * @property {function(number=): IBoard} after
 *  Return a new board with the pattern iterated by the given number of gens.
 * @property {function(): BoundingBox} getBox - Get the bounding box.
 * @property {function(): number} getPop - Get the population.
 */

export {};
