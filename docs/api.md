# API

## Nanny function

Function that renders the view based on the initial state and returns the `Update` function can then be used to update the state.

Nanny : (state,{ view, element, before, after, debug, logState }) -> function

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

The `Nanny` function accepts the following parameters:

state (required):
An object or value that represents the initial state of the app.
Default value is an empty object `{}`

view:
A function that accepts the state as a parameter and returns a string of HTML.
Default value is "NANNY STATE"

element:
The element on the page that the view will be rendered inside.
Default value is `document.body`

before:
A function that is called before the state is updated (see below for more details)

after:
A function that is called after the state has been updated (see below for more details)

debug:
A Boolean value. If set to true then the value of the state will be logged to the console after it has been updated.

Default value is `false`

logState:
An alias for the `debug` parameter. Also a Boolean value. If set to true then the value of the state will be logged to the console after it has been updated.

Default value is `false`

## Update Function

returns: updated state object or value

This function is the **only** way the state can be updated in Nanny State. It is returned by the `Nanny` function.

Note that this function can be be named anything, but is usually called `Update` by convention.

```javascript
Update(transformer,...parmams)
```

The first parameter is a transformer function, any other parameters are passed as arguments to the transformer function.

The current state is implicityly passed to the transformer function as its first argument. 

Calling the `Update` function will update the state then trigger a page re-render based on any changes to the state. Only the parts of the view that have changed due to the change in state will be re-rendered thanks to lit-html.

For example, the following transformer function will increase the `count` property of the current state by 1:

```javascript
const increase = state => ({count: state.count + 1})
```

This can be passed to the `Update` function like so:

```javascript
Update(increase)
```

Note that the only parameter that the `increase` transformer function accepts is the state and we don't need to pass as an argument because Nanny State does this automatically.

The next example shows a transformer function that accepts a parameter that decreases the `count` property by a given amount:

```javascript
const decrease => state => n => ({count: state.count - n})
```

When this is passed to the `Update` function, we also need to pass a value for `n`. For example, if we wanted to decrease the `count` property by 3, we would use the following:

```javascript
Update(decrease,3)
```

## Before Function
A function that is called immediately before the state is updated.
Accepts the state as an arguemnt. Should be used to run any functions that will cause side-effects based on the current value of the state before it changes, since transformers are pure functions.

## After Function
A function that is called immediately after the state is updated.
Accepts the state as an arguemnt. Should be used to run any functions that will cause side-effects based on the new value of the state, since transformers are pure functions.