const pipe = (state) => (event) => {
  if (!event.target) {
    return;
  }
  state.setValue(event.target.value);
};

export default pipe;
