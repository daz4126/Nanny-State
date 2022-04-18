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
    Path = window.location.pathname,
    LocalStorageKey = State.LocalStorageKey
  } = {}
){
  // Helper functions
  const StateIsObject = Object.prototype.toString.call(State) === "[object Object]";

  const findRoute = path => (path === '/' ? ['/'] : path.split('/').filter(char => char !== ''))
  .reduce(
    (obj, path, i) => {     
     const param = obj?.routes?.find(r => r.path[0] === ':');
     return obj?.routes?.find(r => r.path === path)
        ? {...obj?.routes?.find(r => r.path === path),params: obj.params}
        : { ...param, params: {...obj.params,[param.path.slice(1)]: path} }
    },{ routes: Routes }
  );

  function Render() {
    if(Routes.length){
      const route = findRoute(Path);
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
      if(StateIsObject && route?.view) State.Content = route?.view(State);
    }
    render(Element, View(State));
  }

  // Retrieve state from local storage.
  if(LocalStorageKey && localStorage.getItem(LocalStorageKey)) {
    State =  StateIsObject
        ? {...State,...JSON.parse(localStorage.getItem(LocalStorageKey))} 
        : JSON.parse(localStorage.getItem(LocalStorageKey));
  }

  // append Route method to State
  if(Routes && StateIsObject){
    State.Route = path => event => {
      event.preventDefault();
      Path = path || event.target.attributes.href.value;
      window.history.pushState({ Path }, Path, `${Path}`);
      Render()
    };

    window.addEventListener("popstate", event => {
      Path = window.location.pathname;
      Render();
    });
  }

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