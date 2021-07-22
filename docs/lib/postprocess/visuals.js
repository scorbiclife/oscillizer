export const colorscheme = {
  background: '#eeeeee',
  stator: '#000000',
  strictRotor: '#999999',
};

const makeRandomColor = () => {
  const makeRandomUInt8 = () => Math.floor(Math.random() * 256);
  const r = makeRandomUInt8();
  const g = makeRandomUInt8();
  const b = makeRandomUInt8();
  return `rgb(${r},${g},${b})`;
};

const makeGradientColor = (numColors) => (i) => {
  const hue = Math.floor(360 * (i / numColors));
  return `hsl(${hue}, 100%, 70%)`;
};

export const makeColorMap = (period, subperiods) => {
  const sortedSubperiods = subperiods.slice().sort((a, b) => a - b);
  const rotorSubperiods = sortedSubperiods.slice(1);

  const indexToColor = (
    (rotorSubperiods.length > 16)
      ? makeRandomColor
      : makeGradientColor(rotorSubperiods.length)
  );
  const rotorSubperiodsAndColors = rotorSubperiods.map(
    (sp, i) => [sp, indexToColor(i)]
  );

  return new Map([
    [1, colorscheme.stator],
    ...rotorSubperiodsAndColors,
    [period, colorscheme.strictRotor],
  ]);
};
