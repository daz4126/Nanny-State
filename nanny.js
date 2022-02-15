import {html, svg, render} from 'uhtml';

function Nanny(
  State = {},
  {
    Element = State.Element || document.body,
    Template = State.Layouyt || State.View || `NANNY STATE`,
    Views = State.Views,
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
  // Remove any functions from the state object
  if(typeof State.Layout === "function") delete State.Layout
  if(typeof State.View === "function") delete State.View
  if(Views) delete State.Views

  // Set value of Content if required
  State.Content = Views && typeof Views[State.View] === "function" ? Views[State.View](State) : ""

  // Render view based on initial state.
  render(Element,Template(State));

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

    // Set value of Content if required
    State.Content = Views && typeof Views[State.View] === "function" ? Views[State.View](State) : ""

    // Re-render the view based on updated state.
    render(Element,Template(State));

    if(LocalStorageKey){
      localStorage.setItem(LocalStorageKey,JSON.stringify(State))
    }
    if (Debug) {
      console.log(State);
    }

    return State;
  };
}

export { Nanny,html,svg };