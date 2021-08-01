const makeUpdateOscillatorStatistics = (appState, targetElement) => (/* event */) => {
  /* eslint-disable no-param-reassign */
  targetElement.textContent = JSON.stringify(appState.oscStatistics.value, undefined, 2);
};

export default makeUpdateOscillatorStatistics;
