const colorscheme = {
  background: '#eeeeee',
  stator: '#666666',
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

const makeGradientColor = (numColors, i) => {
  const hue = Math.floor(360 * (i / numColors));
  return `hsl(${hue}, 100%, 70%)`;
};

export const makeColorMap = (period, subperiods) => {
  const sortedSubperiods = subperiods.slice().sort((a, b) => a - b);
  const rotorSubperiods = sortedSubperiods.slice(1);

  const rotorSubperiodsAndColors = rotorSubperiods.map(
    (sp, i) => [sp, makeGradientColor(rotorSubperiods.length, i)]
  );

  return new Map([
    [1, colorscheme.stator],
    ...rotorSubperiodsAndColors,
    [period, colorscheme.strictRotor],
  ]);
};

// Draw the initial grid
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

// Draw cell at position [x, y]
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
