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
    Routes = State.Routes || [],
    LocalStorageKey = State.LocalStorageKey
  } = {}
){
  // Helper functions
  const StateIsObject = Object.prototype.toString.call(State) === "[object Object]";

  const findRoute = path => (path === '/' ? ['/'] : path.split('/').filter(char => char !== ''))
  .reduce((obj, path, i) => 
        obj?.routes?.find(r => r.path === path)
          ? obj?.routes?.find(r => r.path === path)
          : { ...obj?.routes?.find(r => r.path[0] === ':'), params: path },
      { routes: Routes }
    );

  function Render() {
    const route = State.Path ? findRoute(State.Path) : null;
    document.title = route?.title || document.title
    if (route?.update) {
      const newState = route.params
        ? route.update(route.params)(State)
        : route.update(State);
      State = newState
        ? StateIsObject
          ? { ...State, ...newState }
          : newState
        : State;
    }
    if(StateIsObject) State.Content = route?.view ? route?.view(State) : '';
    render(Element, View(State));
  }

  // Retrieve state from local storage.
  if(LocalStorageKey && localStorage.getItem(LocalStorageKey)) {
    State =  StateIsObject
        ? {...State,...JSON.parse(localStorage.getItem(LocalStorageKey))} 
        : JSON.parse(localStorage.getItem(LocalStorageKey));
  }

  // append Route method to State
  if(StateIsObject){
    State.Route = path => event => {
      event.preventDefault();
      path = State.Path = path || event.target.attributes.href.value;
      Render()
      window.history.pushState({ path }, path, `${path}`);
    };
  }

  // event listener to update State.Path when the URL changes
  window.addEventListener("popstate", event => {
    if(StateIsObject) State.Path = window.location.pathname;
    Render();
  });

  // set the path to the address bar
  if(StateIsObject) State.Path = window.location.pathname;

  // Run any setup code once
  if(Initiate) {
    const newState = Initiate(State);
    State = newState
      ? StateIsObject
        ? { ...State, ...newState }
        : newState
      : State;
  }

  // Render view based on initial state.
  Render();

  if (Debug) {
    console.log(State);
  }

  return (transformer) => {
    if (Before) {
      const newState = Before(State);
      State = newState
        ? StateIsObject
          ? { ...State, ...newState }
          : newState
        : State;
    }

    // Update state based on the arguments.
    const newState =
      typeof transformer === "function"
        ? transformer(State)
        : transformer;

    State = StateIsObject
        ? { ...State, ...newState }
        : newState;

    if (After) {
      const newState = After(State);
      State = newState
        ? StateIsObject
          ? { ...State, ...newState }
          : newState
        : State;
    }

    // Re-render the view based on updated state
    Render();

    if(LocalStorageKey){
      localStorage.setItem(LocalStorageKey,JSON.stringify(State));
    }

    if (Debug) {
      console.log(State);
    }

    return State;
  };
}

export { Nanny,html,svg };