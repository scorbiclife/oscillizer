/**
 * @typedef {import('../../../BaseTypes/BoundingBox').default} BoundingBox
 */

const colorscheme = {
  background: '#eeeeee',
  stator: '#000000',
  strictRotor: '#999999',
  liveCell: '#000000',
};

// Cell size follows `box-sizing: border-box`
// In other words, borders on all four sides are counted as cellSize.
const cellSizes = {
  cell: 10,
  border: 1,
  liveCell: 4,
  liveBorder: 2,
};

/** @type {function(number, number): string} */
const makeGradientColor = (numColors, i) => {
  const hue = Math.floor(360 * (i / numColors));
  return `hsl(${hue}, 100%, 70%)`;
};

/** @type {function(number, Array<number>): Map<number, string>} */
export const makeColorMap = (period, subperiods) => {
  // Note: `1` or `period` might not be in `subperiods`
  const sortedSubperiods = subperiods.slice().sort((a, b) => a - b);
  /** @type {Array<[number, string]>} */
  const rotorSubperiodsAndColors = sortedSubperiods.map(
    (sp, i) => [sp, makeGradientColor(sortedSubperiods.length, i)]
  );
  return new Map([
    ...rotorSubperiodsAndColors,
    [1, colorscheme.stator],
    [period, colorscheme.strictRotor],
  ]);
};

// Draw the initial grid
/**
 * @param {HTMLCanvasElement} canvas
 * @param {*} context
 * @param {BoundingBox} boundingBox
 */
export const drawGrid = (canvas, context, boundingBox) => {
  // We have to manipulate the canvas, so first beg pardon to ESLint
  /* eslint-disable no-param-reassign */

  const { cell: cellSize, border: borderWidth } = cellSizes;

  // First fill rect with empty cell backgrounds.
  const patternWidth = boundingBox.xmax - boundingBox.xmin + 1;
  const patternHeight = boundingBox.ymax - boundingBox.ymin + 1;

  // Add one cell for padding on each side.
  canvas.width = cellSize * (patternWidth + 2);
  canvas.height = cellSize * (patternHeight + 2);

  // Draw background
  context.fillStyle = colorscheme.background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw cell borders
  context.fillStyle = 'white';
  new Array(patternHeight + 2).fill().forEach((_, i) => {
    context.fillRect(0, cellSize * i, canvas.width, borderWidth);
    context.fillRect(0, cellSize * (i + 1) - borderWidth, canvas.width, borderWidth);
  });
  new Array(patternWidth + 2).fill().forEach((_, i) => {
    context.fillRect(cellSize * i, 0, canvas.height, borderWidth);
    context.fillRect(cellSize * (i + 1) - borderWidth, 0, borderWidth, canvas.height);
  });
};

/**
 * Draw the cell at `(x, y)` with the given color.
 * @param {*} context
 * @param {number} x
 * @param {number} y
 * @param {string} color
 */
export const drawCell = (context, x, y, color) => {
  context.fillStyle = color;
  // Displace cell by (+1, +1) to compensate for the 1-cell borders above.
  const cellSize = cellSizes.cell;
  const borderWidth = cellSizes.border;
  const rect = [
    (x + 1) * cellSize + borderWidth,
    (y + 1) * cellSize + borderWidth,
    cellSize - 2 * borderWidth,
    cellSize - 2 * borderWidth,
  ];
  context.fillRect(...rect);
};

/**
 * Draw the interior of the cell at (x, y), with styling as live cell.
 * @param {*} context
 * @param {number} x
 * @param {number} y
 */
export const drawLiveCellInterior = (context, x, y) => {
  context.fillStyle = colorscheme.liveCell;
  const { cell: cellSize, liveCell: liveCellSize } = cellSizes;
  const rect = [
    // Draw at (x + 1, y + 1) for the same reason.
    // Padding at each side is half the difference of cell sizes.
    (x + 1) * cellSize + 0.5 * (cellSize - liveCellSize),
    (y + 1) * cellSize + 0.5 * (cellSize - liveCellSize),
    liveCellSize,
    liveCellSize,
  ];
  context.fillRect(...rect);
};

/**
 * Draw the border of the cell at (x, y), with styling as a live cell.
 * @param {*} context
 * @param {number} x
 * @param {number} y
 */
export const drawLiveCellBorder = (context, x, y) => {
  context.fillStyle = colorscheme.liveCell;
  const {
    cell: cellSize,
    border: borderWidth,
    liveBorder: liveBorderWidth,
  } = cellSizes;
  // Draw at (x + 1, y + 1) for the same reason.
  const xLeft = (x + 1) * cellSize + borderWidth;
  const xRight = (x + 2) * cellSize - borderWidth - liveBorderWidth;
  const yTop = (y + 1) * cellSize + borderWidth;
  const yBottom = (y + 2) * cellSize - borderWidth - liveBorderWidth;
  const liveBorderLength = cellSize - 2 * borderWidth;
  context.fillRect(xLeft, yTop, liveBorderLength, liveBorderWidth);
  context.fillRect(xLeft, yBottom, liveBorderLength, liveBorderWidth);
  context.fillRect(xLeft, yTop, liveBorderWidth, liveBorderLength);
  context.fillRect(xRight, yTop, liveBorderWidth, liveBorderLength);
};
