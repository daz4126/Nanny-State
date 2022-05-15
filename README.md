<div align="center">

# ![NANNY STATE](https://user-images.githubusercontent.com/16646/164916454-c7c9d9e8-2d58-4629-af46-7a5205d39304.png)

_simple, fast & minimal state management for vanilla JS_

[![npm](https://img.shields.io/npm/v/nanny-state)](https://www.npmjs.com/package/nanny-state)
[![License](https://img.shields.io/badge/License-Unlicense-hotpink)](#license)
![Blazingly Fast](https://img.shields.io/badge/speed-blazing%20🔥-gold.svg)

</div>

**NANNY STATE** makes it simple to build dynamic, state-based web apps in vanilla JS.

- **SIMPLE** - build interactive user-interfaces with just a few lines of code.
- **FAST** - automatic page renders that are blazingly fast.
- **MINIMAL** - only 3kb minified and zipped.

## The State Is Everything

**NANNY STATE** stores everything about the app in a single state object and automatically re-renders the view when the state changes. This means that your code is more organized and easier to maintain without the bloat of other libraries. And everything is written in vanilla JS and HTML, which means you don't have to learn any new syntax!

It's easy to get started - just follow the [examples](#examples) below and you'll see some impressive results in just a few lines of code.

## What Is NANNY STATE?

NANNY STATE uses a one-way data flow model comprised of 3 interdependent parts:

* **State** - an object or value that stores all the app data
* **View** -  a function that returns a string of HTML based on the current state
* **Update** - a function that is the only way to change the state and re-render the view

<div align="center">
  
![Nanny State data flow diagram](https://user-images.githubusercontent.com/16646/164986422-203df76e-05c8-49f7-bc3b-3a0a108aca03.png)

</div>

In NANNY STATE, the state is everything. It is the single source of truth in the application and it can only be changed using the `Update` function, ensuring that any changes are deterministic with predictable outcomes. The view is an HTML representation of the data stored in the state. When a user interacts with the page, the `Update` function changes the state and the view is automatically re-rendered to reflect these changes.

## Background

NANNY STATE was inspired by [Hyperapp](https://hyperapp.dev) and [Redux](https://redux.js.org) and uses the [µhtml](https://github.com/WebReflection/uhtml) library for rendering. It is open source software; please feel free to help out or contribute.

The name is inspired by the [British phrase](https://en.wikipedia.org/wiki/Nanny_state) for an overly protective, centralised government. In a similar way, NANNY STATE protects all the app data by storing it centrally.

## Installation

### Using NPM CLI

Install [nanny-state](https://www.npmjs.com/package/nanny-state) from NPM.

```bash
npm install nanny-state
```

Then import like this:

```javascript
import { Nanny, html } from "nanny-state"
```

### ES Modules

If you use ES Modules, you don't need NPM. You can import from a CDN URL in your browser or on CodePen.

```html
<script type="module">
  import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state'
</script>
```

## Quick Start Guide

Building a NANNY STATE app is simple and straightforward. It always follows these steps:

1. Import the `Nanny` and `html` functions:
   ```javascript
   import { Nanny, html } from 'nanny-state'
   ````

2. Create the `View` template - a pure function that accepts the state as its only parameter and outputs a string of HTML:
   ```javascript
   const View = state =>
      html`<h1>Hello ${state.name}
           <button onclick=${state._changeName}>Click Me</button>`
   ```
   
3. Create an event handler to call the `Update` function and update the state:
  ```javascript
  const _changeName = event => Update({ name: "Nanny State" })
  ```
  
4. Create the initial `State` object (everything goes in the State, props, the View and event handlers):
   ````javascript
   const State = { 
      name: "World",
      _changeName,
      View
     }
   ```

5. Assign the `Update` function to the return value of `Nanny(State)`:
  ```javascript
  const Update = Nanny(State)
  ```

<div id="examples">
  
## Usage examples

The easiest way to learn how NANNY STATE works is to try coding some examples. All the examples below can be coded on [CodePen](https://codepen.io) by simply entering the code in the 'JS' section. 

Alternatively you could set up a basic HTML file and place all the code inside the `<script>` tags. You can see [example files here](https://github.com/daz4126/Nanny-State/tree/main/examples/counter).

And if you want it to look pretty, just copy the CSS code from the examples on CodePen!

### Hello World Example

<div align="center">

![Hello World screenshot](https://user-images.githubusercontent.com/16646/164986455-102d1310-c092-45a5-a8af-c939252da436.png)

</div>

This example will show how the 3 elements of Nanny State, State, View and the Update function, work.

Start by importing the relevant functions:

```javascript
import { Nanny, html } from 'nanny-state'
```

Next we'll create the view. This is a function that accepts the state as an argument and returns a string of HTML that depends on the value of the state's properties. 

```javascript
const View = state => html`<h1>Hello World</h1>`
```

Views in NANNY STATE use the `html` template function that is part of µhtml. This is a tag function that accepts a template literal as an argument. The template literal contains the HTML code that we want to display in our app. 

These values are then bound to the view and will automatically update to reflect any changes in the state. In this example we are inserting the value of the state object's 'name' property into the `<h1>` element.

In NANNY STATE, everything is stored as a property of the state, even the app settings such as the view! This means that we have to add the `View` code to the `State` object. Since we named the variable `View`, we can just use object-shortand notation to add this to the `State` object, like so:

```javascript
const State = { 
  View 
}
```

Last of all, we need to call the `Nanny` function with `State` provided as an argument:

```javascript
Nanny(State)
```

This passes the `State` object into the `Nanny` function, which renders the view based on the initial state.

You can this code on [CodePen](https://codepen.io/daz4126/pen/gOoBryB).

This is just a static piece of HTML though. The view in Nanny State can display dynamic expressions using `${expression}` placeholders to insert properties from the state.

Let's add a property called 'name', with a value of the string "World", to the state:
  
  ```javascript
  State = {
    name: "World",
    View
  }
  ```
  
Now let's update the `View` to use this property:
  
```javascript
const View = state => html`<h1>Hello ${state.name}</h1>`
```
Even though, outwardly, nothing seems to have changed, we are now using properties of the `State` in the `View`.

You can this code on [CodePen](https://codepen.io/daz4126/pen/jOYeqoN).

Our next job is to make the view dynamic. First of all we'll add a button to the view:
  
```javascript
const View = state => 
  html`<h1>Hello ${state.name}</h1>
       <button onclick=${state._changeName}>Hello</button>`
```

The button element has an inline event listener. When the button is clicked the event handler `_changeName` will be called (by convention, event handlers start with an `_` to differentiate them from other properties in the State). We want this function to update the state object so the 'name' property changes to 'Nanny State'. This is exactly what the `Update` function is for.
  
The `Update` function is returned when the `Nanny` function is called. Calling the `Nanny` function does 2 things:

1. Renders the initial view based on the initial value of the `State` variable that is passed to it.
2. Returns the `Update` function - this is the only way that the state can be updated in the app.
  
To create the `Update` function, change the last line of code so it assigns the variable `Update` to the return value of `Nanny(State)`:
  
```javascript
const Update = Nanny(State)
```
  
*Note that it is only called `Update` by convention and can actually be called any legal variable name.*

Now we can use the `Update` function to update the state when the button is clicked. This is really easy to do - simply pass an object representing the new state as an argument to the `Update` function.
  
To do this we need to add the `_changeName` event handler to the State:
  
```javascript
 const State = {
  name: "World",
  _changeName: event => Update({name: "Nanny State"}),
  View
} 
```

Because `_changeName` is an event handler, its only parameter is the `event` object (although it isn't actually needed in this example, but it is useful to identify the function as an event handler). In this case, the purpose of the function is to call the `Update` function that changes the 'name' property to "Nanny State" by passing the object `{name: "Nanny State"}` as an argument to the `Update` function. Note that you ony have to include any properties of the State that need updating in this object(**Nanny State** assumes that all the other properties will stay the same). **NANNY STATE** will then automatically re-render the view using µhtml, which only updates the parts of the view that have actually changed. This means that re-rendering after a state update is fast and efficient.

We now have everything wired up correctly. When the user clicks the button, the `_changeName` event handler is called. This calls the `Update` function which changes the 'name' property to 'Nanny State' and re-renders the page based on this new state.

You can this code on [CodePen](https://codepen.io/daz4126/pen/gOoBrJB). Try clicking the button to see the view change!

Now let's try adding an event handler that uses some information passed to it in the `event` object. We'll create an input field that allows the user to update the `name` property as they type. Change the view to the following:
  
```javascript
const View = state => html`<h1>Hello ${state.name}</h1>
<input oninput=${state._changeName}>`
```
  
We've replaced the button element with an input field that uses the inline event listener `oninput` to call the `_changeName` event handler. We need to update this function inside the `State` object:
  
```javascript
 const State = {
  name: "World",
  _changeName: event => Update({name: event.target.value}),
  View
} 
```
  
This time the `Update` function is passed an object that replaces the `name` property of the state with the value of `event.target.value` which corresponds to the text entered into the input field. Every time the input changes, this event will fire and the view will be re-rendered to correspond to what has been typed into the input field.

You can this code on [CodePen](https://codepen.io/daz4126/pen/qBpJNOp). Try typing into the input field and see the view change as you type!
  
![May-15-2022 22-44-35](https://user-images.githubusercontent.com/16646/168495145-b2f74553-3515-4874-8b9e-a4bc1e1f542a.gif)


### Counter Example

The next example will be a simple counter app that lets the user increase or decrease the count by pressing buttons. The state will change with every click of a button, so this example will show how easy NANNY STATE makes dynamic updates.

<div align="center">

![Counter Example screenshot](https://user-images.githubusercontent.com/16646/139466309-5574464c-756e-4afa-8bc6-e1e4a62a9ded.png)

</div>

You can see the finished app and code on [CodePen](https://codepen.io/daz4126/pen/vYgdLdX)

The value of the count will be stored in the state as a number (the state is usually an object, but it doesn't have to be).
Let's import the relevant functions and initialize the state with a value of 10:

```javascript
import { Nanny, html } from 'nanny-state';

const State = 10;
```

Now let's create the view that will return the HTML we want to display:

```javascript
const View = state => 
html`<h1>Nanny State</h1>
     <h2>Counter Example</h2>
     ${Counter(state)}`
```

This view contains a **component** called `Counter`. A component is a function that returns some view code that can be reused throughout the app. They are easy to insert into the main view using the `${ComponentName}` placeholder notation inside the template literal.

Now we need to write the code for the `Counter` component (note it is convention to use PascalCase when naming components):

```javascript
const Counter = state => 
html`<div id='counter'>${state}</div>
     <button onclick=${e=>Update(state - 1)}>-</button>
     <button onclick=${e=>Update(state + 1)}>+</button>`
```

The two buttons call inline event handlers that call the `Update` function to change the value of the state when they are pressed.

Last of all, we just need to call the `Nanny` function and assign its return value to the variable `Update`. In this example, the state is a number, so we cannot assign any properties to it. This means we can't make the view a property of `State`. Fortunately, the `Nanny` function accepts a second `options` parameter. This is an object that has a property called 'view' that can be assigned to the variable `View` using the object property shorthand notation:

```javascript
const Update = Nanny(State,{ View })
```

This will render the initial view with the count set to 10 and allow you to increase or decrease the count by clicking on the buttons.
  
## Transformer Functions
  
In the examples we've just seen, the `Update` function was passed a new representation of the state, but it can also accept a *transformer function*. They are particularly useful when the new state is based on the previous state.

A transformer function accepts the current state as an argument and returns a new representation of the state. They are basically a mapping function from the current state to a new state as shown in the diagram below:

<div align="center">

![Transformer function diagram](https://user-images.githubusercontent.com/16646/125978502-29d3f173-626a-48b1-8214-5368f1fe7824.png)

</div>
  
ES6 arrow functions are perfect for transformer functions as they visually show the mapping of the current state to a new representation of the state.

Transformer functions must be **[pure functions](https://en.wikipedia.org/wiki/Pure_function)**. They should always return the same value given the same arguments and should not cause any side-effects. They take the following structure:

```javascript
state => newState
```

If the transformer function needs to accept parameters, then the 'double arrow' notation is used to perform [partial application](#partial-application):

```javascript
state => params => newState
```

In the Counter example above, we could use the following transformer functions:
  
```
const increment = state => state + 1
const decrement = state => state - 1
```
  
Transformer functions are passed *by reference* to the `Update` function. The current state is implicityly passed as an argument to any transformer function (similiar to the way the event object is implicitly passed to event handlers).
  
For example, we could use the `increment` and `decrement` transformer functions in the Counter example with the following view:
  
```javascript
const Counter = state => 
html`<div id='counter'>${state}</div>
     <button onclick=${e=>Update(decrement)}>-</button>
     <button onclick=${e=>Update(increment)}>+</button>`
```
  
  _Note: The current state is implicitly provided as an argument by the Update function, so does not need to be included when calling `Update`._
  
  Transformer functions don't need to return an object that represents every property of the new state. They only need to return an object that contains the properties that have actually changed. For example, if the initial state is represented by the following object:

```javascript
const State = {
  name: "World",
  count: 10
}
```

If we write a transformer function that doubles the count, then we only need to return an object that shows the new value of the 'count' property and don't need to worry about the 'name' property:

```javascript
const double = state => ({ count: state.count * 2})
```

_Note: when arrow functions return an object literal, it needs wrapping in parentheses_

The state object in the parameter can also be destructured so that it only references properties required by the transformer function:

```javascript
const double = { count } => ({ count: count * 2})
```

### Adding Additional Arguments to Transformer Functions

If you want a transformer function to have parameters in addition to the state, then this must be done using a 'double-arrow' function and partial application. The additional arguments always come first and the state should be the last parameter provided to the transfomer function:

```javascript
const transformer = params = state => newState
```

For example, if we wanted a counter app that had buttons that increased the count by 1, 2 or 3, instead of writing a separate transformer function for each button, we could write a single transformer function with a parameter of how much to increase the value of `state.count` by. It would look like this:

```javascript
const increaseBy = n => state => ({count: state.count + n})
```

Here the parameter `n` is used to determine how much `state.count` is increased by, making the transformer function more flexible.

When passing a transformer function with parameters to the `Update` function, it needs to be partially applied with any arguments. For example, this is how we could use the `increaseBy` transformer function in the view:

```javascript
const Counter = number => 
html`<div id='counter'>${number}</div>
     <button onclick=${e=>Update(increaseBy(1))}>Add 1</button>
     <button onclick=${e=>Update(increaseBy(2))}>Add 2</button>
     <button onclick=${e=>Update(increaseBy(3))}>Add 3</button>
```
  
### Anonymous Or Named Functions?
  
Because NANNY STATE uses vanilla JS, you can choose to use named or anonymous event handlers and transformer functions or a combination of the two in your code. This is often a question of coding style, but there are a few nuances to condsider with each appraoch. To demonstrate the different approaches, let's look at 4 different ways of writing the code for the counter example:
  
  1) Anonymous event handlers, anonymous transformer functions:
  ```javascript
  const Counter = state => 
     html`<div id='counter'>${state}</div>
     <button onclick=${e=>Update(state => state - 1)}>-</button>
     <button onclick=${e=>Update(state => state + 1)}>+</button>`
  ```
  
  2) Named event handlers, anonymous transformer functions:
  ```javascript
  const Counter = state => 
     html`<div id='counter'>${state}</div>
     <button onclick=${increment}>-</button>
     <button onclick=${decrement}>+</button>`
  
  const decrement = event => Update(state => state - 1)
  const increment = event => Update(state => state + 1)
  ```
  
  3) Anonymous event handlers, named transformer functions:
  ```javascript
  const Counter = state => 
     html`<div id='counter'>${state}</div>
     <button onclick=${e=>Update(count(-1))}>-</button>
     <button onclick=${e=>Update(count(1))}>+</button>`
  
 const count = n => state => state + n
  ```
  
  4) Named event handler, named transformer functions:
  ```javascript
  const Counter = state => 
     html`<div id='counter'>${state}</div>
     <button onclick=${increment}>-</button>
     <button onclick=${decrement}>+</button>`
  
  const decrement = event => Update(count(-1))
  const increment = event => Update(count(1))
  const count = n => state => state + n
  ```
  
Named event handlers and transformer functions work in a similar way. A named event handler will have the event object passed to it implicityly and named transformer functions have the state passed to them implicitly. One thing to consider is that anonymous event handlers can access the state becasue they are defined inside the `View` function, which accepts the current state as an argument, whereas named event handlers do not have access to the state.

## More NANNY STATE Examples

You can see a full set of examples of how Nanny State can be used, with source code, on [CodePen](https://codepen.io/collection/RzbNmw). This includes:

* [Numble](https://numble.online) - A numerical Wordle clone (by Olivia Gibson)
* [Times Tables Quiz](https://codepen.io/goldenrod/pen/PoKjrYV) (by Olivia Gibson)
* [Shopping Cart](https://codepen.io/daz4126/pen/WNjmQyB)
* [Noughts & Crosses (Tic-Tac-Toe)](https://codepen.io/daz4126/pen/xxdYvpz)
* [To Do List](https://codepen.io/daz4126/pen/wvgrLme)
* [Caesar Cipher](https://codepen.io/daz4126/pen/OJprPrL)
* [Random Fact API](https://codepen.io/daz4126/pen/ExZqKLO)
* [Timer](https://codepen.io/daz4126/pen/MWvWVZZ)
  
  </div>

## Extra Info

Now that you've learnt the basics of NANNY STATE, here's some extra info that helps give you some extra control over the settings.

### Before and After Functions

`Before` and `After` are properties of the state object and are functions that are called before or after a state update respectively. They can also be passed to the `Nanny` function as part of the `options` object.

For example, try updating the last line of the 'Hello Batman' example to the following code instead:

```javascript
State.Before = state => console.log('Before:', state)
State.After = state => console.log('After:', state)

const Update = Nanny(State)
```

Now, when you press the `I'm Batman` button, the following is logged to the console, showing how the state has changed:

```
"Before:"
{
  "name": "Bruce Wayne"
}
"After:"
{
  "name": "Batman"
}
```

### Default Element

By Default the view will be rendered inside the `body` element of the page. This can be changed using the `Element` property of the state object or by providing it as part of the `options` object of the `Nanny` function. For example, if you wanted the view to be rendered inside an element with the id of 'app', you just need to specify this as an option when you call the `Nanny` function:

```javascript
State.Element = document.getElementById('app')
```

### Debug Mode

`Debug` is a property of the state that is `false` by default, but if you set it to `true`, then the value of the state will be logged to the console after the initial render and after any state update"

```javascript
State.Debug = true
```
  
### Local Storage

`LocalStorageKey` is a property of the state that ensures that the state is automatically persisted using the browser's [local storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). It will also retrieve the state from the user's local storage every time they visit the site, ensuring persitance of the state between sessions. To use it, simply set this property to the string value that you want to be used as the local storage key. For example, the following setting will use the string "nanny" as the local storage key and ensure that the state is saved to local storage after every update:
  
  ```javascript
  State.LocalStorageKey = 'nanny'
  ```

## Docs

You can see [more in-depth docs here](https://github.com/daz4126/Nanny-State/tree/main/docs)

* The Nanny State [API](https://github.com/daz4126/Nanny-State/blob/main/docs/api.md)
* [Code Organization](https://github.com/daz4126/Nanny-State/blob/main/docs/code-organization.md) in Nanny State
* Nanny State [Structure](https://github.com/daz4126/Nanny-State/blob/main/docs/structure.md)


## License

Released under [Unlicense](/LICENSE) by [@daz4126](https://github.com/daz4126).
