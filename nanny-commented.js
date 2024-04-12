// import three functions from the dependecy uhtml. 'html' is for holding all the HTML content we want on the screen, 'render' allows us to turn the contents of 'html' into the actual HTML we see on the screen, and 'svg' is a different markup language for graphics that can be used instead.
import {html, svg, render} from 'uhtml';

// declaring the 'Nanny' function as an export. 'State' is the only parameter required. The other parameters 'Routes', 'Effects' and 'Calcs' are declared if they exist in 'State' or they are given their default values. And 'Path' is given the default value of the url from the address bar.

export default function Nanny(State, Path = window.location.pathname,Routes = State.Routes || [], Effects = State.Effects || [],Calcs = State.Calculations || []){
  // Retrieve state from local storage, by checking if a local storage key has been declared in state and the data stored in localStorage under the key in State exists. If both these exist, then we fill State with the data saved from localStorage.
  if (State.LocalStorageKey && localStorage.getItem(State.LocalStorageKey)) {
    State =  {...State,...JSON.parse(localStorage.getItem(State.LocalStorageKey))} 
  }
  
  // Built-In State Methods
  // This function takes a property name as a parameter and returns its value from State, otherwise if no property name is defined then the whole State is returned.
  State.Evaluate = prop => prop === undefined ? {...State} : {...State}[prop];
  // This function transforms the State into a JSON string
  State.JSON = () => JSON.stringify(State);
  // These functions take on the 'html' and 'svg' function imported from our dependency 'uhtml', and makes them methods of the State. 
  State.HTML = html;
  State.SVG = svg;
  // When the built in router is being used, this method can be used to create a link to a specific path (given as a parameter or as the href attribute in the HTML if the parameter is not defined.)
  State.Link = path => event => {
    event.preventDefault();
    Path = path || event.target.attributes.href.value;
    // Pushing the path into the window.history array so that the back button works
    window.history.pushState({ Path }, Path, `${Path}`);
    Render();
  };
  // This event occurs when the user types something into the address bar, so update the Path variable and rerender the page.
  window.addEventListener("popstate", event => {
        Path = window.location.pathname;
    Render();
  });

  // helper functions
  // Adds another route to the Routes array
  State.Route = route => Routes.append(route);
  // This function updates values in State (given from the transformer function) at a regular interval (given from moment)
  State.Every = (moment,...transformers) => setInterval(_ => State.Update(...transformers),moment);
  // This function updates values in State (given from the transformer function) after a specified amount of time.
  State.Delay = (moment,...transformers) => setTimeout(_ => State.Update(...transformers),moment);
  // This adds adds a set value (with a default of 1) to a specified property in State
  State.Increment = (prop,n=1) => State.Update({[prop]: State[prop] + n});
  // This subtracts a set value (with a default of 1) from a specified property in State
  State.Decrement = (prop,n=1) => State.Update({[prop]: State[prop] - n});
  // This negates the value of a given property in State
  State.Toggle = prop => State.Update({[prop]: !State[prop]});
  // This adds an item to the end of a list property in State
  State.Append = (list,value) => State.Update({[list]: [ ...State[list], value ]});
  // This adds an item to a specific place (given through an index) in a list property in state
  State.Insert = (list,index,value) => State.Update({[list]: [...State[list].slice(0,index), value,...State[list].slice(index, State[list].length)]});
  // This replaces a given item in a list with a new specified value
  State.Replace = (list,index,value) => State.Update({[list]: [...State[list].slice(0,index),value,...State[list].slice(index+1, State[list].length)]});
  // This removes an item (referenced by its index) from a list property in state
  State.Remove = (list,index) => State.Update({[list]: [...State[list].slice(0,index),...State[list].slice(index+1, State[list].length)]});
  // This function is for adding side effects
  // Effects is an array of functions that will run when the State changes. Therefore, need to check if the function we want to add (effect in the parameter) already exists. So need to turn the functions into strings and see if they are the same. 'list' is a comma separated string of properties that will trigger the effect to run (if no list provided runs all effects). If it doesn't already exist, add the effect to the Effects array
  State.Effect = (effect,list) => {
    if(!Effects.some(e => e[0].toString() === effect.toString() && e[1] === list)) Effects.push([effect,list]);
  };
  // This function is for running calculations on properties automatically, not to do with the actual prograam.
  State.Calculate = calc => {
    // creates a string of all the properties involved in the calculate function provided as a parameter.
    const list = calc.toString().match(/state\.[a-z_$]+/g).map(x => x.slice(6));
    // if the calculation doesn't already exist then add the calculation and the list of dependent properties to the Calcs array.
    if(!Calcs.some(c => c[0].toString() === calc.toString() && c[1].toString() === list.toString())) Calcs.push([calc,list]);
  };
  // This is the main update function that takes the transformer functions as a parameter (but unpacked)
  State.Update = (...transformers) => {  
    // takes the setState function from below, and changes the values in State as denoted from the transformer function  
    setState(...transformers);
    // if there is a local storage key property in state, then add this key and the JSON string of State to localStorage
    if (State.LocalStorageKey){
      const localState = {...State};
      // BlackList is a comma separated list of properties that are not saved in local storage.
      if(State.LocalStorageBlackList){
        State.LocalStorageBlackList.split(",").forEach(key => delete localState[key]);
      }
      localStorage.setItem(State.LocalStorageKey,JSON.stringify(localState));
 }
// if there the debug property has been set to true, log the JSON string of State to the console after every updated
    if (State.Debug) console.log(State.JSON());
// render function from below is called so that the updates to State can be reflected in the DOM  
    Render();
  };
  
  // Run any setup code once and then render the initial state
  if (State.Initiate) setState(State.Initiate)
  State.View(State);
  setState(State);
  // Repeated for the setup code
  if (State.Debug) console.log(State.JSON());
  Render();
       
  // Helper functions
  // this function creates an array of all the key-value pairs of newObj and loops through them, so the values of oldObj can be updated to match the new value
  function update(oldObj,newObj){
    Object.entries(newObj).forEach(([prop,value]) => oldObj[prop]  = value)
  }
  
  // 
  function setState(...transformers){
    // transformers are either a function that maps the old State to the new State or just an object that represents the new state
    State = transformers.reduce((state,transformer) => {
        // creating a local variable newState that only contains the properties the user has created (to prevent the inbuild methods being updated)
        // if the transformer is a function, the function is run to obtain an object, otherwise the transformer is left as it is
      const {Update,HTML,SVG,Evaluate,JSON,Link,Every,Delay,Content,Effect,Calculate,Increment,Decrement,Toggle,Append,Insert,Replace,Remove,...newState} = typeof(transformer) === "function" ? transformer(state) : transformer;
      // run the update function with the newState object
      update(state,newState);
      // does a filter to check if the properties listed in the lists of Effects and Calcs has changed. If they have, the respective side effects/calculations are run.
      Effects.filter(effect => !effect[1] || effect[1].split(",").some(prop => newState.hasOwnProperty(prop))).forEach(effect => effect[0](state));    
      Calcs.filter(calc => !calc[1] || calc[1].some(prop => newState.hasOwnProperty(prop))).forEach(calc => {
        update(state,calc[0](state));
        Effects.filter(effect => effect[1] && effect[1].split(",").some(prop => calc[0](state).hasOwnProperty(prop))).forEach(effect => effect[0](state));
      });
      return state
      },State);

      // this is a reduce which facillitates the 'comma method' where updates to state can be made sequentially, to avoid using a stale state.
  }
  // This function takes the path and looks up which route this path represents, so the correct code is run.
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
    // checks if the router is being used
    if (Routes.length){
    // need to update the title of the page and find the associated view.
      const route = findRoute(Path);
      document.title = route.title || document.title
      if (route.update) {
        setState(route.params ? route.update(route.params) : route.update);
      }
      if (route.view) {
        State.Content = route.view(State);
      }
    }
    // If no routes are being used, just render the default View. And the element can be specified, but the default is the body of the document.
    render(State.Element || document.body, State.View(State));
  }
// needs to return the update function, so that old apps (where update is used as a global variable) don't break.
  return State.Update
}

export { Nanny, html, svg }