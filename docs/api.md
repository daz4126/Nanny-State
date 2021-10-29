# API

## Nanny function

Function that renders the view based on the initial state and returns the `Update` function can then be used to update the state.

Nanny : (State,{ View, Element, Before, After, Debug }) -> function

returns: `Update` function

```
import { Nanny } from 'nanny-state'
```

In order to be able to use the `Update` function, it needs assigning to a variable, like this:

```
const Update = Nanny(State)
```

It can be assigned to any variable name, it doesn't have to be `Update`, although this is the convention.

### Parameters

The `Nanny` function accepts the following parameters (note that they are all capitialized):

State (required):
An object or value that represents the initial state of the app.
Default value is an empty object `{}`

View:
A function that accepts the state as a parameter and returns a string of HTML.
Default value is "NANNY STATE"

Element:
The element on the page that the view will be rendered inside.
Default value is `document.body`

Before:
A function that is called before the state is updated (see below for more details)

After:
A function that is called after the state has been updated (see below for more details)

Debug:
A Boolean value. If set to true then the value of the state will be logged to the console after it has been updated.

Default value is `false`


All of the parameters can either be provided as properties of the `State` object or as an options object provided as the second argument to the `Nanny` function. The following are equivalent:

Providing options as properties of `State`:

```javascript
const State = {
    hello: 'World',
    View: state => html`Hello ${name}`,
    Element: document.getElementById('app'),
    Debug: true
}
Nanny(State)
```

Providing options as a second argument:

```javascript
const State = {
    hello: 'World'
}
Nanny(State, { 
    View: state => html`Hello ${name}`,
    Element: document.getElementById('app'),
    Debug: true
})
```

## Update Function

returns: updated state object or value

This function is the **only** way the state can be updated in Nanny State. It is returned by the `Nanny` function.

Note that this function can be be named anything, but is usually called `Update` by convention.

```javascript
Update(transformer,...options)
```

The first parameter is an object representing a new state or fragment of the new state or a transformer function. The current state is implicityly passed to the transformer function as its first argument. 

Calling the `Update` function will update the state then trigger a page re-render based on any changes to the state. Only the parts of the view that have changed due to the change in state will be re-rendered thanks to lit-html.

For example, the following transformer function will increase the `count` property of the current state by 1:

```javascript
const increase = state => ({count: state.count + 1})
```

This can be passed to the `Update` function like so:

```javascript
Update(increase)
```

Note that the only parameter that the `increase` transformer function accepts is the state and we don't need to pass as an argument because Nanny State does this implicitly (in a similar way to how the event object is implicityly passed to event handlers).

The next example shows a transformer function that accepts a parameter that decreases the `count` property by a given amount:

```javascript
const decrease => n => state => ({count: state.count - n})
```

When this is passed to the `Update` function, we need to pass a value for `n` using partial application. This involves calling the function with a single argument. This will return another function that will bind the argument in a closure and then have the state passed to it implicitly. For example, the following code will decrease the `count` property by 3:

```javascript
Update(decrease(3))
```

## Before Function
A function that is called immediately before the state is updated.
Accepts the state as an arguemnt. Should be used to run any functions that will cause side-effects based on the current value of the state before it changes, since transformers are pure functions.

## After Function
A function that is called immediately after the state is updated.
Accepts the state as an arguemnt. Should be used to run any functions that will cause side-effects based on the new value of the state, since transformers are pure functions.