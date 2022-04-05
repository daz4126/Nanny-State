import {html, svg, render} from 'uhtml';

function Nanny(
  State = {},
  {
    Element = State.Element || document.body,
    View = State.View,
    Initiate = State.Initiate,
    Before = State.Before,
    After = State.After,
    Debug = State.Debug,
    LocalStorageKey = State.LocalStorageKey
  } = {}
)
  // Retrieve state from local storage.
  if(LocalStorageKey) {
    State = localStorage.getItem(LocalStorageKey) 
      ? Object.prototype.toString.call(State) === "[object Object]"
        ? {...State,...JSON.parse(localStorage.getItem(LocalStorageKey))} 
        : JSON.parse(localStorage.getItem(LocalStorageKey))
      : State;
  }

  // append Route method to State
  State.Route = path => event => {
    event.preventDefault();
    path = State.Path = path || event.target.attributes.href.value;
    const route = State.Routes.find(route => route.path === State.Path);
    document.title = route.title;
    State.Content = route.view(State);
    render(Element, View(State));
    window.history.pushState({ path }, path, `${path}`);
  };

  // event listener to update State.Path when the URL changes
  window.addEventListener("popstate", event => {
    State.Path = window.location.pathname;
    State.Content = State.Routes.find(route => route.path === State.Path).view(State);
    render(Element, View(State));
  });

  // set the path to the address bar
  State.Path = window.location.pathname;

  // Set value of Content if required
  State.Content = State.Routes.find((route) => route.path === State.Path).view(State);

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
    State.Content = State.Routes.find((route) => route.path === State.Path).view(State);

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