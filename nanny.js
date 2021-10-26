import {html, svg, render} from 'uhtml';

function Nanny(
  state = {},
  {
    Element = state.Element || document.body,
    View = state.View || `NANNY STATE`,
    Before = state.Before,
    After = state.After,
    Debug = state.Debug,
    LocalStorageKey = state.LocalStorageKey
  } = {}
) {
  // Retrieve state from local storage.
  if(LocalStorageKey) {
    state = localStorage.getItem(LocalStorageKey) ? JSON.parse(localStorage.getItem(LocalStorageKey)) : state;
  }
  // render view based on initial state.
  render(element,view(state));

  if (debug) {
    console.log(state);
  }

  return (transformer,options) => {
    if (before) {
      before(state);
    }

    // Update state based on the arguments.
    const newState =
      typeof transformer === "function"
        ? transformer(state)
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
    if (debug) {
      console.log(state);
    }

    return state;
  };
}

export { Nanny,html,svg };