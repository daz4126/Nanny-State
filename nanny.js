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
    LocalStorageKey = State.LocalStorageKey,
    Render = State.Render || true
  } = {}
) {
  const Template = Layout || View || "NANNY STATE"
  // Retrieve state from local storage.
  if(LocalStorageKey) {
    State = localStorage.getItem(LocalStorageKey) ? {...State,...JSON.parse(localStorage.getItem(LocalStorageKey))} : State;
  }
  // Set value of Content if required
  State.Content = typeof State[State.View] === "function" ? State[State.View](State) : ""
  // Run any setup code once
  if(Initiate) {
    State =
      Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...Initiate(State) }
        : Initiate(State);
  }
  // Render view based on initial state.
  if(Render) {
    render(Element,Template(State));
  }

  if (Debug) {
    console.log(State);
  }

  return (transformer,{Render=true}={}) => {
    if (Before) {
      State =
      Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...Before(State) }
        : Before(State);
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
      State =
      Object.prototype.toString.call(State) === "[object Object]"
        ? { ...State, ...After(State) }
        : After(State);
    }

    // Set value of Content if required
    State.Content = typeof State[State.View] === "function" ? State[State.View](State) : ""
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