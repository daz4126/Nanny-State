import {html, svg, render} from 'uhtml';

function Nanny(
  State = {},
  {
    Element = State.Element || document.body,
    View = State.View || `NANNY STATE`,
    Before = State.Before,
    After = State.After,
    Debug = State.Debug,
    LocalStorageKey = State.LocalStorageKey
  } = {}
) {
  // Retrieve state from local storage.
  if(LocalStorageKey) {
    State = localStorage.getItem(LocalStorageKey) ? JSON.parse(localStorage.getItem(LocalStorageKey)) : State;
  }
  // render view based on initial state.
  render(Element,View(State));

  if (Debug) {
    console.log(State);
  }

  return (transformer,options) => {
    if (Before) {
      Before(State);
    }

    // Update state based on the arguments.
    const newState =
      typeof transformer === "function"
        ? transformer(State)
        : transformer;

    // If the state is an object, create a copy and augment any changes to it.
    State =
      Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...newState }
        : newState;

    if (After) {
      After(State);
    }

    // Re-render the view based on updated state.
    render(Element,View(State));

    if(LocalStorageKey){
      LocalStorage.setItem(LocalStorageKey,JSON.stringify(State))
    }
    if (Debug) {
      console.log(State);
    }

    return State;
  };
}

export { Nanny,html,svg };