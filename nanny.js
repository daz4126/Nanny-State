import {html, svg, render} from 'uhtml';

function Nanny(
  state = {},
  {
    element = state.element || document.body,
    view = state.view || `NANNY STATE`,
    before = state.before,
    after = state.after,
    debug = state.debug,
    logState = state.logState,
    localStateKey = state.localStateKey
  } = {}
) {
  // Retrieve state from local storage.
  if(localStorageKey) {
    state = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : state;
  }
  // render view based on initial state.
  render(element,view(state));

  if (debug || logState) {
    console.log(state);
  }

  return (transformer, ...params) => {
    if (before) {
      before(state);
    }

    // Update state based on the arguments.
    const newState =
      typeof transformer === "function"
        ?  typeof transformer(state) === "function"
          ? params.length
            ? transformer(state)(...params)
            : transformer(state)()
          : transformer(state)
        : transformer;

    // If the state is an object, create a copy and augment any changes to it.
    state =
      Object.prototype.toString.call(state) === "[object Object]"
        ? { ...state, ...newState }
        : newState;

    if (after) {
      after(state);
    }

    // Re-render the view based on updated state.
    render(element,view(state));

    if(localStorageKey){
      localStorage.setItem(localStorageKey,JSON.stringify(state))
    }
    if (debug || logState) {
      console.log(state);
    }

    return state;
  };
}

export { Nanny,html,svg };