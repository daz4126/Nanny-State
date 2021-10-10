<div align="center">

# ![NANNY STATE](https://user-images.githubusercontent.com/16646/133849971-f17ac8f0-819f-441a-891a-22e6a0e6ab8a.png)
  
> simple state management for vanilla JS

[![npm](https://img.shields.io/npm/v/nanny-state)](https://www.npmjs.com/package/nanny-state)
[![License](https://img.shields.io/badge/License-Unlicense-blue)](#license)
![Blazingly Fast](https://img.shields.io/badge/speed-blazing%20🔥-blue.svg)

</div>

**NANNY STATE** makes it simple to build state-based web apps in vanilla JS.

- **SIMPLE** - build interactive user-interfaces with just a few lines of code.
- **FAST** - automatic page renders that are blazingly fast.
- **MINIMAL** - only 3kb minified and zipped.

**NANNY STATE** stores data in a single state object and automatically renders the view when it changes. This keeps your code organized and easier to maintain without the bloat of other libraries.

It's easy to get started - just follow the [examples](#examples) below and you'll see some impressive results in just a few lines of code.

## What Is NANNY STATE?

NANNY STATE uses a one-way data flow model comprised of 3 interdependent parts:

* **State** - usually an object that stores all the app data
* **View** -  a function that returns a string of HTML based on the current state
* **Update Function** - the only way to change the state and re-render the view

<div align="center">
  
![Nanny State data flow diagram](https://user-images.githubusercontent.com/16646/135819511-36cbb9cf-54b4-4ea5-93df-1d203f31fe76.png)

</div>

The state is the single source of truth in the application and it can only be changed using the `Update` function, ensuring that any changes are deterministic with predictable outcomes. The view is an HTML representation of the data stored in the state. When a user interacts with the page, the `Update` function changes the state and the view is automatically re-rendered to reflect these changes.

## Background

NANNY STATE was inspired by [Hyperapp](https://hyperapp.dev) and [Redux](https://redux.js.org) and uses the [µhtml](https://github.com/WebReflection/uhtml) library for rendering. It is open source software; please feel free to help out or contribute.

The name is inspired by the [British phrase](https://en.wikipedia.org/wiki/Nanny_state) for an overly protective, centralised government. In a similar way, NANNY STATE is overly protective of all the app data that it stores centrally. I'm also a big fan of [the non-alcoholic beer with the same name](https://www.brewdog.com/uk/nanny-state-4-x-cans).

## Installation

### Using NPM CLI

Install [nanny-state](https://www.npmjs.com/package/nanny-state) from NPM.

```bash
npm install nanny-state
```

Then import like this:

```javascript
import { Nanny, html } from "nanny-state";
```

### ES Modules

If you use ES Modules, you don't need NPM. You can import from a CDN URL in your browser or on CodePen.

```html
<script type="module">
  import { Nanny,html } from 'https://cdn.skypack.dev/nanny-state';
</script>
```

## Quick Start Guide

Building a NANNY STATE app is simple and straightforward. It always follows these steps:

1. Import the `Nanny` and `html` functions:
   ```javascript
   import { Nanny, html } from 'nanny-state'
   ````
2. Decide on the structure of your data and create a state object:
   ````javascript
   const State = { 
      name: "World",
      view
     }
   ```
3. Decide how you want the data to be displayed and create a view template:
   ```javascript
   const view = state =>
      html`<h1>Hello ${name}
           <button onclick=${hello}>Click Me</button>`
   ```
4. Create an event handler to call the `Update` function and update the state:
  ```javascript
  const hello = event => Update({ name: "Nanny State" })
  ```

5. Assign the `Update` function to the return value of `Nanny(State)`:
  ```javascript
  const Update = Nanny(State)
  ```

The basic structure of any NANNY STATE app is:

```javascript
import { Nanny, html } from 'nanny-state'

const view = state => html`some view code here`
const State = { 
  prop: value, 
  view
}

const handler = event => Update({newState})

const Update = Nanny(State)
```

<div id="examples">
  
## Usage examples

The easiest way to learn how NANNY STATE works is to try coding some examples. All the examples below can be coded on [CodePen](https://codepen.io) by simply entering the code in the 'JS' section. 

Alternatively you could set up a basic HTML file and place all the code inside the `<script>` tags. You can see [example files here](https://github.com/daz4126/Nanny-State/tree/main/examples/counter).

And if you want it to look pretty, just copy the CSS code from the examples on CodePen!

### Hello World Example

<div align="center">

![Hello World screenshot](https://user-images.githubusercontent.com/16646/126525155-dcb10d3d-7331-4bbc-92f3-0b6e90c1931a.png)

</div>

This is a simple example to show how Nanny State renders the view based on the state.

You can see finished app and code on [CodePen](https://codepen.io/daz4126/pen/zYwZjWw).

Start by importing the two functions that we need:

```javascript
import { Nanny, html } from 'nanny-state'
```

Next, create an object to represent the initial state (the state is usally an object, but can be any data-type). The state stores every bit of information about our app as data. In this simple example, we just want to store the value of a property called 'name':

```javascript
const State = { name: "World" }
```

Our next job is to create the view - this is a function that accepts the state as an argument and returns a string of HTML that depends on the value of the state's properties. In NANNY STATE, everything is stored as a property of the state, even the view!

It is stored as a property called 'view', which we can create like so:

```javascript
State.view = state => html`<h1>Hello ${state.name}</h1>`
```

Views in NANNY STATE use the `html` template function that is part of µhtml. This is a tag function that accepts a template literal as an argument. The template literal contains the HTML code for the view and uses `${expression}` placeholders to insert values from the state.

These values are then bound to the view which ensures the view will automatically update to reflect any changes in the state. In this example we are inserting the value of the state object's 'name' property into the `<h1>` element.

Last of all, we need to call the `Nanny` function with `State` provided as an argument:

```javascript
Nanny(State)
```

This passes the `State` object into the `Nanny` function, which renders the view based on the initial state.

### Hello Batman Example

<div align="center">

![Hello Batman screenshot](https://user-images.githubusercontent.com/16646/125826661-0b799f2d-613d-45b8-9bef-5c0d214fe669.png)

</div>

This example shows how the state object can be updated using the `Update` function.

You can see the finished app and code on [CodePen](https://codepen.io/daz4126/pen/oNWZdyd).

It starts in the same way as the last example, by importing the two functions we'll be using:

```javascript
import { Nanny, html } from 'nanny-state'
```

Next we'll create the view template and assign it to the variable `view`:

```javascript
const view = state => 
  html`<h1>Hello ${state.name}</h1>
       <button onclick=${beBatman}>I'm Batman</button>`
```

This view is similar to the one we used in the Hello World example, but it also contains a button with an event listener. We'll get to this soon, but first we need to create the initial state:

```javascript
const State = { 
  name: 'Bruce Wayne', 
  view 
}
```

Notice that as well as assigning the 'name' property the value of 'Bruce Wayne', we also add the `view` variable as a property of the `State` object using the shorthand object assignment.

Now let's take a look at the inline event listener attached to the button, using `onclick`. When the button is clicked the event handler 'beBatman' will be called. We want this function to update the state object so the 'name' property changes to 'Batman'.

The only way we can update the state is to use the `Update` function that is returned by the `Nanny` function.

Calling the `Nanny` function does 2 things:

1. Renders the initial view based on the initial state provided as an argument (as we saw in the Hello World example).
2. Returns the `Update` function that is the only way to update the state.

To be able to use the `Update` function, we need to assign it to a variable when we call the `Nanny` function. The convention is to call it `Update` but it can be any legal variable name:

```javascript
const Update = Nanny(State)
```

The `Update` function can now be used to make changes to the state by passing a new representation of the state as an argument. After any change to the state, NANNY STATE will automatically re-render the view using µhtml, which only updates the parts of the view that have actually changed. This means that re-rendering after a state update is fast and efficient.

To see this in action, let's write the `beBatman` event handler function to update the state and change the 'name' property to 'Batman' when the button is clicked. To do this, we need to pass a new object with a 'name' property of 'Batman' as an argument to the `Update` function (note that this function needs to go *before* the `view` function in your code):

```javascript
const beBatman = event => Update({name: "Batman"})
```

**Note that when arrow functions return an object literal, it needs wrapping in parentheses**

Because this is an event handler, the only parameter is the event object (although it isn't actually needed in this example). The purpose of this event handler is to call the `Update` function that changes the 'name' property to 'Batman'. 

We now have everything wired up correctly. When the user clicks the button, the `beBatman` event handler is called. This calls the `Update` function which changes the 'name' property to 'Batman' and then re-renders the page based on this new state.

Try clicking the button to see the view change based on user input!

### Counter Example

The next example will be a simple counter app that lets the user increase or decrease the count by pressing buttons. The state will change with every click of a button, so this example will show how easy NANNY STATE makes dynamic updates.

<div align="center">

![Counter Example screenshot](https://user-images.githubusercontent.com/16646/131525466-69b5fd87-a811-4b7f-87f7-4f333780f08f.png)

</div>

You can see the finished app and code on [CodePen](https://codepen.io/daz4126/pen/vYgdLdX)

The value of the count will be stored in the state as a number (the state is usually an object, but it doesn't have to be).
Let's initialize it with a value of 10:

```javascript
import { Nanny, html } from 'nanny-state';

const State = 10;
```

Now let's create the view that will return the HTML we want to display:

```javascript
const view = number => html`<h1>Nanny State</h1>
                            <h2>Counter Example</h2>
                            ${Counter(number)}`
```

This view contains a **component** called `Counter`. A component is a function that returns some view code that can be reused throughout the app. They are easy to insert into the main view using the `${ComponentName}` placeholder notation inside the template literal.

Now we need to write the code for the `Counter` component (note it is convention to use PascalCase when naming components):

```javascript
const Counter = number => html`<div id='counter'>${number}</div>
                               <button onclick=${e=>Update(number - 1)}>-</button>
                               <button onclick=${e=>Update(number + 1)}>+</button>`
```

The two buttons call inline event handlers that call the `Update` function to change the value of the counter when they are pressed.

Last of all, we just need to call the `Nanny` function and assign its return value to the variable `Update`. In this example, the state is a number, so we cannot assign any properties to it. This means we can't make the view a property of `State`. Fortunately, the `Nanny` function accepts a second `options` parameter. This is an object that has a property called 'view' that can be assigned to the variable `view` using the object property shorthand notation:

```javascript
const Update = Nanny(State,{ view })
```

This will render the initial view with the count set to 10 and allow you to increase or decrease the count by clicking on the buttons.
  
### Transformer Functions
  
In the examples we've just seen, the `Update` function was passed a new representation of the state, but it can also accept a *transformer function*. They are particularly useful when the new state is based on the previous state.

A transformer function accepts the current state as an argument and returns a new representation of the state. They are basically a mapping function from the current state to a new state as shown in the diagram below:

<div align="center">

![Transformer function diagram](https://user-images.githubusercontent.com/16646/125978502-29d3f173-626a-48b1-8214-5368f1fe7824.png)

</div>
  
ES6 arrow functions are perfect for transformer functions as they visually show the mapping of the current state to a new representation of the state.

Transformer functions must be **[pure functions](https://en.wikipedia.org/wiki/Pure_function)**. They should always return the same value given the same arguments and should not cause any side-effects. They take the following structure:

```javascript
state => params => newState
```

If the transformer doesn't have any other parameters, apart from the current state, then you can omit them and just write the transformer in the form:

```javascript
state => newState
```

In the Counter example above, we could use the following transformer functions:
  
```
const increment = state => state + 1
const decrement = state => state - 1
```
  
Transformer functions are passed *by reference* to the `Update` function, which will then implicityly pass the current state as an argument.
  
For example, we could use the `increment` and `decrement` transformer functions in the Counter example with the following view:
  
```javascript
const Counter = number => html`<div id='counter'>${number}</div>
                               <button onclick=${e=>Update(decrement)}>-</button>
                               <button onclick=${e=>Update(increment)}>+</button>`
```
  
  _Note: The first parameter of every transformer functions is always the state. This will be implicitly provided as an argument by the Update function, so does not need to be included when calling `Update`. Any additional arguments are added after the name of the function._
  
  Transformer functions don't need to return an object that represents the full state. You only need to return an object that contains the properties that have changed. For example, if the initial state is represented by the following object:

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

We can also destructure the state object in the parameter so that it only references properties required by the transformer function:

```javascript
const double = { count } => ({ count: count * 2})
```


### More Examples

You can see a full set of examples of how Nanny State can be used, with source code, on [CodePen](https://codepen.io/collection/RzbNmw). This includes:

* [Shopping Cart](https://codepen.io/daz4126/pen/WNjmQyB)
* [Noughts & Crosses (Tic-Tac-Toe)](https://codepen.io/daz4126/pen/xxdYvpz)
* [To Do List](https://codepen.io/daz4126/pen/wvgrLme)
* [Caesar Cipher](https://codepen.io/daz4126/pen/OJprPrL)
* [Random Fact API](https://codepen.io/daz4126/pen/ExZqKLO)
  
  </div>

## Extra Info

Now that you've learnt the basics of NANNY STATE, here's some extra info that helps give you some extra control over the settings.

### Before and After Functions

`before` and `after` are properties of the state object and are functions that are called before or after a state update respectively. They can also be passed to the `Nanny` function as part of the `options` object.

For example, try updating the last line of the 'Hello Batman' example to the following code instead:

```javascript
State.before = state => console.log('Before:', state)
State.after = state => console.log('After:', state)

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

The `after` function is useful if you want to use the `localStorage` API to save the state between sessions. The following `after` function will do this:

```javascript
State.after = state => localStorage.setItem('NannyState',JSON.stringify(state))
```

You will also have to set `state` to be the value stored in `localStorage` or the initial state if there is not value in local storage:

```javascript
const initialState = { name: 'World' }
const State = localStorage.getItem('NannyState') ? JSON.parse(localStorage.getItem('NannyState')) : initialState
```

### Default Element

By Default the view will be rendered inside the `body` element of the page. This can be changed using the `element` property of the state object or by providing it as part of the `options` object of the `Nanny` function. For example, if you wanted the view to be rendered inside an element with the id of 'app', you just need to specify this as an option when you call the `Nanny` function:

```javascript
State.element = document.getElementById('app')
```

### Debug Mode & Log State

`debug` is a property of the state that is `false` by default, but if you set it to `true`, then the value of the state will be logged to the console after the initial render and after any state update"

```javascript
State.debug = true
```

`logState` is a property of the state that does exactly the same thing as the `debug` property when set to `true`:

```javascript
State.logState = true
```

## Docs

You can see [more in-depth docs here](https://github.com/daz4126/Nanny-State/tree/main/docs)

* The Nanny State [API](https://github.com/daz4126/Nanny-State/blob/main/docs/api.md)
* [Code Organization](https://github.com/daz4126/Nanny-State/blob/main/docs/code-organization.md) in Nanny State
* Nanny State [Structure](https://github.com/daz4126/Nanny-State/blob/main/docs/structure.md)


## License

Released under [Unlicense](/LICENSE) by [@daz4126](https://github.com/daz4126).
