export const colorscheme = {
  background: '#eeeeee',
  stator: '#000000',
  strictRotor: '#999999',
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
