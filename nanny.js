import {html, svg, render} from 'uhtml';

export default function Nanny(State, Path = window.location.pathname,Routes = State.Routes || []){  
  // Retrieve state from local storage.
  if (State.LocalStorageKey && localStorage.getItem(State.LocalStorageKey)) {
    State =  {...State,...JSON.parse(localStorage.getItem(State.LocalStorageKey))} 
  }
  // Run any setup code once
  if (State.Initiate) {
    State = { ...State, ...State.Initiate(State)};
  }
  // Set intial State
  State = { ...State, ...(State.Calculate ? State.Calculate(State) : {}) };
  // Built-In State Methods
  State.Evaluate = prop => prop === undefined ? {...State} : {...State}[prop];
  State.JSON = () => JSON.stringify(State);
  State.HTML = html;
  State.SVG = svg;
  State.Link = path => event => {
    event.preventDefault();
    Path = path || event.target.attributes.href.value;
    window.history.pushState({ Path }, Path, `${Path}`);
    Render();
  };
  window.addEventListener("popstate", event => {
    Path = window.location.pathname;
    Render();
  });
  State.Every = (moment,...transformers) => setInterval(_ => State.Update(...transformers),moment);
  State.Delay = (moment,...transformers) => setTimeout(_ => State.Update(...transformers),moment);
  State.Update = (...transformers) => {
    if (State.Before) {
      State = { ...State, ...State.Before(State),...(State.Calculate ? State.Calculate(State.Before(State)) : {}) };
    }
    
    State = transformers.reduce((oldState,transformer) => {
      const {Update,HTML,SVG,Evaluate,JSON,Link,...newState} = typeof(transformer) === "function" ? transformer(oldState) : transformer;
      Object.entries(newState).forEach(([prop,value]) => value && value.toString() === "[object Object]" ? newState[prop] = {...State[prop],...value} : value)
      const updatedState = { ...oldState, ...newState, ...(State.Calculate ? State.Calculate({...oldState,...newState}) : {}) };
      if(State.Effects) {
        State.Effects.filter(effect => !effect[1] || effect[1].split(",").some(prop => newState.hasOwnProperty(prop))).forEach(effect => effect[0](updatedState));
      }
      return updatedState
    },State);
    
    if (State.After) {
      State = { ...State, ...State.After(State), ...(State.Calculate ? State.Calculate(State.After(State)) : {}) };
    }

    if (State.LocalStorageKey){
      localStorage.setItem(State.LocalStorageKey,JSON.stringify(State));
    }

    if (State.Debug) {
      console.log(State.JSON());
    } 
    
    // Re-render the view basd on updated state
    Render();
  };
       
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
        State = { ...State, ...(route.params ? route.update(route.params)(State) : route.update(State)), ...(State.Calculate ? State.Calculate(route.params ? route.update(route.params)(State) : route.update(State)) : {}) };
      }
      if (route.view) {
        State.Content = route.view(State);
      }
    }
    render(State.Element || document.body, State.View(State));
  }
  // Render view based on initial state.
  State.Update(State);
  
  return State.Update
}

export { Nanny, html, svg }