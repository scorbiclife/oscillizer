/**
 * The `TwoStatePattern` datatype represents a pattern or multiple cells.
 * This is used for exchaging two-state pattern data throughout the codebase.
 *
 * N.B. Rationale for fixing the representation of cells?
 *  <br>
 *  CA Implementations may have a different internal pattern representation,
 *  but currently all the exchangable pattern formats (e.g. RLEs, Bitmaps etc.)
 *  are based on sequence of cells.
 *  Therefore, fixing the interface for patterns with the same structure
 *  should have an insignificant performance penalty
 *  (since you have to convert from sequential formats anyway)
 *  and simplify the codebase significantly.
 *
 * @typedef TwoStatePattern
 * @type {Array<Cell>}
 */
