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

export const makeColorMap = (subperiods) => {
  const sortedSubperiods = subperiods.slice().sort((a, b) => a - b);
  const period = sortedSubperiods[sortedSubperiods.length - 1];
  const properSubperiods = sortedSubperiods.slice(1, subperiods.length - 1);

  const indexToColor = (
    (properSubperiods.length > 15)
      ? makeRandomColor
      : (i) => {
        const hue = Math.floor(210 * (i / (properSubperiods.length - 1)));
        return `hsl(${hue}, 100%, 70%)`;
      }
  );

  const properSubperiodsAndColors = properSubperiods.map((sp, i) => [sp, indexToColor(i)]);

  return new Map([
    [1, colorscheme.stator],
    ...properSubperiodsAndColors,
    [period, colorscheme.strictRotor],
  ]);
};
