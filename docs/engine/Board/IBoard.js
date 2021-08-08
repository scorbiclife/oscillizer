/**
 * A board generally contains these information:
 *  A pattern to operate on,
 *  A rule to generate new patterns,
 *  and other auxillary info like bounding boxes and generation.
 * These are tightly coupled and needs each other's implementation details
 * in order to operate, so they are grouped into one big interface.
 * For a sample implementation, see {@link SimpleBoard}.
 *
 * @interface IBoard
 */

/**
 * Get the cells from the board.
 *
 * @function IBoard#getCells
 * @returns {Array<Cell>} - The cells that are on as an array
 */

/**
 * Get the cells and their states from the board
 *
 * @function IBoard#getCellsAndStates
 * @returns {Array<Array<Cell|number>>} - An array of entries, each entry of type `[Cell, number]`
 */

/**
 * Return a new board with the pattern iterated by the given amount.
 *
 * @function IBoard#after
 * @param {number} [gens=1] - Number of generations to iterate
 * @returns {IBoard} - The new board
 */

/**
 * Get the bounding box of the pattern.
 *
 * @function IBoard#getBox
 * @returns {BoundingBox}
 */

/**
 * Get the population of the pattern.
 *
 * @function IBoard#getPop
 * @returns {number}
 */
