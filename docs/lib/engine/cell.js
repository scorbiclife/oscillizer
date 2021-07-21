export const cellToString = ([x, y]) => `${x} ${y}`;
export const cellFromString = (s) => {
  const [sx, sy] = s.split(' ');
  return [parseInt(sx, 10), parseInt(sy, 10)];
};
