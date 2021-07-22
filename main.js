import {html , render} from 'https://unpkg.com/lit-html?module'
// Nanny State function
const Nanny = (state={},{ element=document.body,view=state.view,before,after,debug,logState}={}) => {
  // initial render
  render(view(state),element);
  // log the state if in debug mode
  if(debug || logState) console.log(state);
  // return function used to update the state
  return (action,...params) => {
    // call before function here
    if(before) before(state);
    // create a new state based on the action and params submitted
    const newState = Object.prototype.toString.call(state) === "[object Object]"
                     ? { ...state,...action(state,...params) }
                     : action(state,...params);
    // set the new state
    state = newState;
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
