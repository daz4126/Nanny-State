import {html, svg, render} from 'uhtml';

function Nanny(
  State = {},
  {
    Element = State.Element || document.body,
    Layout = State.Layout,
    View = State.View,
    Initiate = State.Initiate,
    Before = State.Before,
    After = State.After,
    Debug = State.Debug,
    LocalStorageKey = State.LocalStorageKey
  } = {}
) {
  const Template = Layout || View || "NANNY STATE"
  // Retrieve state from local storage.
  if(LocalStorageKey) {
    State = localStorage.getItem(LocalStorageKey) 
      ? Object.prototype.toString.call(State) === "[object Object]"
        ? {...State,...JSON.parse(localStorage.getItem(LocalStorageKey))} 
        : JSON.parse(localStorage.getItem(LocalStorageKey))
      : State;
  }
  // Set value of Content if required
  if(Object.prototype.toString.call(State) === "[object Object]" && typeof State[State.View] === "function") {
    State.Content = State[State.View](State)
  }
  // Run any setup code once
  if(Initiate) {
    const newState = Initiate(State);
    State = newState
      ? Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...newState }
        : newState
      : State;
  }
  // Render view based on initial state.
  render(Element,Template(State));

  if (Debug) {
    console.log(State);
  }

  return (transformer,{Render=true}={}) => {
    if (Before) {
      const newState = Before(State);
    State = newState
      ? Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...newState }
        : newState
      : State;
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
      const newState = After(State);
    State = newState
      ? Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...newState }
        : newState
      : State;
    }

    // Set value of Content if required
    if(Object.prototype.toString.call(State) === "[object Object]" && typeof State[State.View] === "function") {
      State.Content = State[State.View](State)
    }
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