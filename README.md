# ![NANNY STATE](https://user-images.githubusercontent.com/16646/125978720-deaca09e-5361-4a51-918f-bbc4a3a7b841.png)

**NANNY STATE** provides a simple to use declarative API that makes it easy to build interactive user interfaces.
It stores all the data in a single state object and takes care of updating the view whenever the state changes.
It lets you concentrate on how the data should be updated and what the view should look like.

**NANNY STATE**  is:

* **FAST & EASY** - Build interactive user interfaces that render blazingly fast with just a few lines of code.
* **PREDICTABLE** - All the data in stored in one place and updated in the same way, making your code more organized, predictable and easier to test.
* **EASY TO LEARN** - There are only a few basic concepts to learn, hardly any boilerplate code and everything is written in plain old Javascript - there's no new syntax to learn!

Whether you are building a small interactive web page or large complex app, Nanny State is a simple and fun alternative to React and Vue! It's quick to get started - just follow the examples below and you'll see some impressive results in just a few lines of code. 

Nanny State was inspired by [Redux](https://redux.js.org) and [Hyperapp](https://hyperapp.dev) and uses the [lit-html](https://lit-html.polymer-project.org) library for rendering. It is open source software, please feel free to help out or contribute.

# What Is Nanny State?

An app built with Nanny State is made up of the following:

* **state** - usually an object that contains all the data about the app
* **view** -  a function that returns a string of HTML based on the current state
* **transformer functions** - functions that transform the value of the state

The state is the single source of truth in the application and can only be updated using the update function provided by Nanny State.

## Data Flow

Nanny state uses a one-way data flow model:

![Nanny State](https://user-images.githubusercontent.com/16646/125978059-95ed42bb-5676-484a-8391-fa73d20280a0.png)

When a user interacts with the page, it triggers an event handler that calls a tranformer function to update the state and then the page is automatically re-rendered to reflect these changes.

# Examples

The easiest way to learn how Nanny State works is to try coding some examples. All the examples below can be coded on [CodePen](https://codepen.io) by simply entering the code in the 'JS' section. Alternatively you could set up a basic HTML file with a linked JS file that contains all the Nanny State code.

## Hello World Example

![Screenshot Hello World](https://user-images.githubusercontent.com/16646/125823073-d88989b7-f807-4213-a871-f5f41e198f23.png)

This is a simple example to show how Nanny State renders the view based on the state.

You can see finished app and code [on CodePen](https://codepen.io/daz4126/pen/zYwZjWw).
Start by importing the Nanny State functions:

```javascript
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
```

Next create an object to represent the initial state (the state is usally an object, but can be any data-type). The state contains every bit of information about our app. In this case we just want to store the value of the property 'name':

```javascript
const state = { name: ‘World’ }
```

Our next job is to create the view - this is a function that accepts the state as a parameter and returns a string of HTML that depends on the value of the state's properties. Any view in Nanny uses the `html` template function provided by lit-html. This uses tagged template literals with `${expression}` placeholders to insert values from the state into the rendered HTML. In this example we are inserting the value of the state object's 'name' property into the `<h1>` element.:

```javascript
const view = state => html`<h1>Hello ${state.name}</h1>`
```

Last of all, we need to call the `Nanny` function with the`state` and `view` variables as arguments:

```javascript
Nanny(state,view)
```

This will render the view based on our initial state.

## Hello Batman Example
![Screenshot Hello Batman](https://user-images.githubusercontent.com/16646/125826661-0b799f2d-613d-45b8-9bef-5c0d214fe669.png)

This example shows how the state object can be updated using the Nanny State update function.

You can see the finished app and code [on CodePen](https://codepen.io/daz4126/pen/oNWZdyd).

It starts in the same way as the last example, by importing the Nanny State functions and initializing the state:

```javascript
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
const state = { name: 'Bruce Wayne' }
```

Next we'll add the view template:

```javascript
const view = state => html`<h1>Hello ${state.name}</h1>
                           <button @click=${beBatman}>I'm Batman</button>`
```

This view contains a button that has an inline event listener attached to it using the `@event${handler}` notation [used by lit-html](https://lit-html.polymer-project.org/guide/writing-templates#add-event-listeners)). When the button is clicked the event handler 'beBatman' will be called. We want this function to update the state object so the 'name' property changes to 'Batman'.

The only way we can update the state is to use the update function that is returned by the `Nanny` function.

Calling the `Nanny` function does 2 things:
1) It renders the initial view based on the intial state provided as an argument (as we saw in the Hello World example).
2) It also returns an update function that is the only way to update the state.

To be able to use the update function, we need to assign it to a variable when we call the `Nanny` function. We usually call it `update` but it can be called anything you like:

```
const update = Nanny(state,view)
```

The `update` function can now be used to update the state. Nanny State will then re-render the view using lit-html, which only updates the parts of the view that have actually changed. This makes re-rendering after a state update blazingly fast.

To see this in action, let's write the 'beBatman' event handler function to update the state and change the state object's 'name' property to 'Batman' when the button is clicked (note that this function needs to go *before* the `view` function in your code):

```javascript
const beBatman = event => update(state => ({ name: 'Batman'}))
```

Because this is an event handler, the only parameter is the event object (although it isn't actually needed in this example). The purpose of this event handler is to call the `update` function. This accepts an anonymous function as an argument that tells Nanny State how to update the state. This anonymous function is a **transformer function** that tells Nanny State how to update the value of the state. 

A transformer function accepts the current state as an argument and returns a new representation of the state. It basically maps the current state to a new state:
![transformer](https://user-images.githubusercontent.com/16646/125978502-29d3f173-626a-48b1-8214-5368f1fe7824.png)

In this example the transformer function returns a new object with the 'name' property of 'Batman'.
**Note that when arrow functions return an object, the object needs wrapping in parentheses**

Everything is now in place and wired up. Try clicking the button and you'll see the view change based on user input!

## Counter Example

The next example will be a simple counter app that lets the user increase or decrease the count by pressing buttons. The state will change with every click of a button, so this example will show how easy Nanny State makes dynamic updates.

![Screenshot Counter Example](https://user-images.githubusercontent.com/16646/125827676-f8510690-5b2e-4e98-b8b2-d00b8f530061.png)

You can see the finished app and code [on CodePen](https://codepen.io/daz4126/pen/vYgdLdX!)


The value of the count will be stored in the state as a number (the state is usually an object, but it doesn't have to be).
Let's initialize it with a value of 10:

```javascript
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
const state = 10;
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
                               <button @click=${down}>-</button>
                               <button @click=${up}>+</button>`
```

The two buttons call the two event handlers, `down` and `up` that deal with changing the value of the count when they are pressed. We're going to need to transformer function to deal with incrementing this value, so let's write it:

```javascript
const increment = (number,i=1) => number + i
```

This function accepts two parameters: the number to be incremented and the amount it is to be incremented by, which has a default value of `1`. We could make this value negative to make the count go down. Now we can write the event handlers that use this transformer function to update the state:

```javascript
const up = event => update(increment)
const down = event => update(increment,-1)
```

Both these event handlers pass the `increment` transformer function to the `update` function. The first argument of the `update` function is always the transformer function that will be used to update the state. If this transformer function requires any arguments as well as current state, then they can be provided as extra arguments to the `update` fuction. The `up` handler uses the `increment` transformer function with the default parameter of `1`, so no extra argumennts need providing. The `down` handler provides an extra argument of `-1` that is passed to the `incrfement` transformer function so that the value of the state will decrease by 1.
**The first parameter of every transformer functions is always the state. This is always implicityly provided as an argument by the update function, so does not need to be included when calling `update`. Any additional arguments are added after the name of the function.**

Last of all, we just need to call the `Nanny` function and assign its return value to the variable `update`:

```
const update = Nanny(state,view)
```

This will render the initial view with the count set to 10 and allow you to increase or decrease the count by clicking on the buttons.

## More Examples

You can see more examples of how Nanny State can be used, with source code, [on CodePen](https://codepen.io/collection/RzbNmw)

# TLDR

In summary, all you need to do to create a Nanny State app is the following:

1) Import the Nanny State functions
2) Create the initial state
3) Create the view template
4) Write event handlers to deal with user input
5) Write transformer functions that update the state
6) Call the `Nanny(state,view)` function

The basic structure of any Nanny State app is:

```
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
const state = { // inital values }
const view = html`some view code here`
const handler = event => update(transformer)
const transformer = state => { // new values }
const update = Nanny(state,view)
```

All you need to do is decide on what properties will be in the initial state, write your view template and write some even handlers and transformer functions that describe how the state should change when the user interacts with the page.

# Extra Info

Now that you've learnt the basics of Nanny State, here are some extra options that can be passed to the `Nanny` function to give you some extra control over the settings.

## Before & After Functions

Before and after functions are functions that are called before or after a state update. These are passed to the `Nanny` function as part of the `options` object.

For example, try updating the last line of the 'Hello Batman' example to the following code instead: 

```
const before = state => console.log('Before:',state)
const after = state => console.log('After:',state)

const update = Nanny(state,view,{ before, after })
```

Now, when you press the `I'm Batman` button, the following is logged to the console, showing how the state has changed:

```bash
"Before:"
{
  "name": "Bruce Wayne"
}
"After:"
{
  "name": "Batman"
}
```

The after function is useful if you want to use the `localStorage` API to save the state between sessions. The following `after` function will do this:

```javascript
const after = state => localStorage.setItem('NannyState',JSON.stringify(state))
```

You will also have to set `state` to be the value stored in `localStorage` or the initial state if there is not value in local storage:

```javascript
const initialState = { name: 'World }
const state = localStorage.getItem('NannyState') ? JSON.parse(localStorage.getItem('NannyState')) : initialState
```

## Default Element

By Default the view will be rendered inside the `body` element of the page. This can be changed using the `element` property in the `options` object of the `Nanny` function. For example, if you wanted the view to be rendered inside an element with the id of 'app', you just need to specify this as an option when you call the `Nanny` function:

```javascript
const update = Nanny(state,view,{element: document.getElementById('app')}
```

## Transformer Function & Fragments of State

Transformer functions don't need to return an object that represents the full state. You only need to return an object that contains the properties that have changed. For example, if the initial state is represented by the following object:

```javascript
const state = {
  name: World,
  count: 10
}
```

If we write a transformer function that doubles the count, then we only need to return an object that shows the new value of the 'count' property:

```javascript
const double = state => ({ count: state.count * 2})
```

We can also destructure the state object in the parameter so that it only references properties required by the transformer function:

```javascript
const double = { count } = ({ count: count * 2})
```


## Coming Soon
A more in-depth tutorial to build a [Caesar Cipher tutorial using Nanny State](https://codepen.io/daz4126/pen/OJprPrL).



