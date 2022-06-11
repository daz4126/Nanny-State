import {html, svg, render} from 'uhtml';

function Nanny(State, Path = window.location.pathname){
  // Default settings
  const Element = State.Element || document.body,
        Routes = State.Routes || []
       

  // Helper function to find the route object in the state given the path
  const findRoute = path => (path === '/' ? ['/'] : path.split('/').filter(char => char !== ''))
  .reduce(
    (obj, path) => {     
     const param = obj.routes.find(r => r.path[0] === ':');
     return obj.routes.find(r => r.path === path)
        ? {...obj.routes.find(r => r.path === path),params: obj.params}
        : { ...param, params: {...obj.params,[param.path.slice(1)]: path} }
    },{ routes: Routes }
  );

  function Render() {
    if (Routes.length){
      const route = findRoute(Path);
      document.title = route.title || document.title
      if (route.update) {
        State = { ...State, ...(route.params ? route.update(route.params)(State) : route.update(State)) };
      }
      if (route.view) {
        State.Content = route.view(State);
      }
    }
    render(Element, State.View(State));
  }

  // Retrieve state from local storage.
  if (State.LocalStorageKey && localStorage.getItem(State.LocalStorageKey)) {
    State =  {...State,...JSON.parse(localStorage.getItem(State.LocalStorageKey))} 
  }

  if (Routes.length) {
      // append Route method to State
      State.Route = path => event => {
        event.preventDefault();
        Path = path || event.target.attributes.href.value;
        window.history.pushState({ Path }, Path, `${Path}`);
        Render();
      };
      // grab the path from the address bar
      window.addEventListener("popstate", event => {
        Path = window.location.pathname;
        Render();
      });
  }

  // Run any setup code once
  if (State.Initiate) {
    State = { ...State, ...State.Initiate(State) };
  }

  // Render view based on initial state.
  Render();

  if (State.Debug) {
    console.log(JSON.stringify(State));
  }

  return (newState) => {
    if (State.Before) {
      State = { ...State, ...State.Before(State) };
    }

    State = { ...State, ...(typeof newState === "function" ? newState(State) : newState) };

    if (State.After) {
      State = { ...State, ...State.After(State) };
    }

    if (State.LocalStorageKey){
      localStorage.setItem(State.LocalStorageKey,JSON.stringify(State));
    }

    if (State.Debug) {
      console.log(JSON.stringify(State));
    } 
    
    // Re-render the view based on updated state
    Render();

    return State;
  };
}

export { Nanny,html,svg };