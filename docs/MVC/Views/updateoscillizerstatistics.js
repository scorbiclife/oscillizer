const makeUpdateOscillatorStatistics = (source, targetElement) => (/* event */) => {
  /* eslint-disable no-param-reassign */
  targetElement.textContent = JSON.stringify(source, undefined, 2);
};

export default makeUpdateOscillatorStatistics;
