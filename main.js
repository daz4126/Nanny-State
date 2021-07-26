import {html , render} from 'https://unpkg.com/lit-html?module'
// Nanny State function
const Nanny = (state={},{ element=state.element || document.body,view=state.view || `Nanny State`,before=state.before,after=state.after,debug=state.debug,logState=state.logState}={}) => {  // initial render
  render(view(state),element);
  // log the state if in debug mode
  if(debug || logState) console.log(state);
  // return the update function
  return (transformer,...params) => {
    // call before function here
    if(before) before(state);
    // update the state based on the transformer function and params submitted
    state = Object.prototype.toString.call(state) === "[object Object]" // check if the state is an object
                     ? { ...state,...transformer(state,...params) } // shallow copy of the current state + any changes (should it be a deep copy?)
                     : transformer(state,...params);
    // call after function here
    if(after) after(state);
    // render the new state
    render(view(state),element);
    // log the state if in debug mode
    if(debug || logState) console.log(state);
    // return the new state
    return state;
  }
}
export { Nanny,html }
