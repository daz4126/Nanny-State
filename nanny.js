import {html, svg, render} from 'uhtml';

export default function Nanny(State, Path = window.location.pathname,Routes = State.Routes || [], Effects = [],Calcs = []){
  // Retrieve state from local storage.
  if (State.LocalStorageKey && localStorage.getItem(State.LocalStorageKey)) {
    State =  {...State,...JSON.parse(localStorage.getItem(State.LocalStorageKey))} 
  }
  
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
  State.Increment = prop => State.Update({[prop]: State[prop] + 1});
  State.Decrement = prop => State.Update({[prop]: State[prop] - 1});
  State.Increment = prop => State.Update({[prop]: State[prop] + 1});
  State.Toggle = prop => State.Update({[prop]: !State[prop]});
  State.Append = (list,value) => State.Update({[list]: [ ...State[list], value ]});
  State.Insert = (list,index,value) => State.Update({[list]: [...State[list].slice(0,index), value,...State[list].slice(index, State[list].length)]});
  State.Replace = (list,index,value) => State.Update({[list]: [...State[list].slice(0,index),value,...State[list].slice(index+1, State[list].length)]});
  State.Remove = (list,index) => State.Update({[list]: [...State[list].slice(0,index),...State[list].slice(index+1, State[list].length)]});
  State.Effect = (effect,list) => {
    if(!Effects.some(e => e[0].toString() === effect.toString() && e[1] === list)) Effects.push([effect,list]);
  };
  State.Calculate = (calc,list) => {
    if(!Calcs.some(c => c[0].toString() === calc.toString() && c[1] === list)) Calcs.push([calc,list]);
  };
  State.Update = (...transformers) => {
    if (State.Before) setState(State.Before(State) || {});
    
    setState(...transformers);
    
    if (State.After) setState(State.After(State) || {});

    if (State.LocalStorageKey){
      const localState = {...State};
      if(State.LocalStorageBlackList){
        State.LocalStorageBlackList.split(",").forEach(key => delete localState[key]);
      }
      localStorage.setItem(State.LocalStorageKey,JSON.stringify(localState));
    }

    if (State.Debug) console.log(State.JSON());
   
    Render();
  };
  
  // Run any setup code once and then render the initial state
  if (State.Initiate) setState(State.Initiate)
  State.View(State);
  setState(State);
  if (State.Debug) console.log(State.JSON());
  Render();
       
  // Helper functions
  function update(oldObj,newObj){
    Object.entries(newObj).forEach(([prop,value]) => oldObj[prop]  = value)
  }
  
  function setState(...transformers){
    State = transformers.reduce((state,transformer) => {
      const {Update,HTML,SVG,Evaluate,JSON,Link,Every,Delay,Content,Effect,Calculate,...newState} = typeof(transformer) === "function" ? transformer(state) : transformer;
      update(state,newState);
      Effects.filter(effect => !effect[1] || effect[1].split(",").some(prop => newState.hasOwnProperty(prop))).forEach(effect => effect[0](state));    
      Calcs.filter(calc => !calc[1] || calc[1].split(",").some(prop => newState.hasOwnProperty(prop))).forEach(calc => update(state,calc[0](state)));
      return state
    },State);
  }
  
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
        setState(route.params ? route.update(route.params) : route.update);
      }
      if (route.view) {
        State.Content = route.view(State);
      }
    }
    render(State.Element || document.body, State.View(State));
  }
  
  return State.Update
}

export { Nanny, html, svg }