const {html, render} = require('lit-html')
// Nanny State function
const Nanny = (state={},{ element=state.element || document.body,view=state.view || `NANNY STATE`,before=state.before,after=state.after,debug=state.debug,logState=state.logState}={}) => {
  // initial render
  render(view(state),element);
  // log the state if in debug mode
  if(debug || logState) console.log(state);
  // return update function
  return (transformer,...params) => {
    // call before function here
    if(before) before(state);
    // update state based on the action and params submitted
    state = Object.prototype.toString.call(state) === "[object Object]"
                     ? { ...state,...transformer(state,...params) }
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
module.exports = { Nanny,html }