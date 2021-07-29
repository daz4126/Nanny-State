const {html, render} = require('lit-html')

function Nanny(
  state = {},
  {
    element = state.element || document.body,
    view = state.view || `NANNY STATE`,
    before = state.before,
    after = state.after,
    debug = state.debug,
    logState = state.logState,
  } = {}
) {
  // Initial state.
  render(view(state), element);

  if (debug || logState) {
    console.log(state);
  }

  return (transformer, ...params) => {
    if (before) {
      before(state);
    }

    // Update state based on the action and params submitted.
    const newState =
      typeof transformer(state) === "function"
        ? params.length
          ? transformer(state)(...params)
          : transformer(state)()
        : transformer(state);

    // If the state is an object, create a copy and augment any changes to it.
    state =
      Object.prototype.toString.call(state) === "[object Object]"
        ? { ...state, ...newState }
        : newState;

    if (after) {
      after(state);
    }

    // Update.
    render(view(state), element);

    if (debug || logState) {
      console.log(state);
    }

    return state;
  };
}

module.exports = { Nanny,html }