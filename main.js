import {html , render} from 'https://unpkg.com/lit-html?module'
// Nanny State function
export Nanny = (state={},{view=``,element=document.body,before,after}={}) => {
  // initial render
  render(view(state),element);
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
    // return the new state
    return state;
  }
}
export {html, render}
