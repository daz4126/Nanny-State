import {html, svg, render} from 'uhtml';

function Nanny(
  State = {},
  {
    Element = State.Element || document.body,
    Template = State.Layout || State.View || `NANNY STATE`,
    Views = State.Views,
    Before = State.Before,
    After = State.After,
    Debug = State.Debug,
    LocalStorageKey = State.LocalStorageKey,
    Render = State.Render || true
  } = {}
) {
  // Retrieve state from local storage.
  if(LocalStorageKey) {
    State = localStorage.getItem(LocalStorageKey) ? {...State,...JSON.parse(localStorage.getItem(LocalStorageKey))} : State;
  }
  // Remove any settings from the state object
  delete State.Element;
  delete State.Layout;
  delete State.Views;
  delete State.Before;
  delete State.After;
  delete State.Debug;
  delete State.LocalStorageKey;
  delete State.Render;
  if(typeof State.View === "function") {
    delete State.View;
  }

  // Set value of Content if required
  State.Content = Views && typeof Views[State.View] === "function" ? Views[State.View](State) : ""

  // Render view based on initial state.
  if(Render) {
    render(Element,Template(State));
  }

  if (Debug) {
    console.log(State);
  }

  return (transformer,{Render=true}={}) => {
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
    if(Render){
      render(Element,Template(State));
    }

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