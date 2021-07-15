# Nanny-State
Simple state management using just JavaScript

Nanny State gives you simple state management and fast rendering with a tiny amount of code. It was inspired by [Redux](https://redux.js.org) and [Hyperapp](https://hyperapp.dev) and uses the [lit-html](https://lit-html.polymer-project.org) library for rendering.

# What Is Nanny State?

A Nanny State app is made up of the following 3 components:

* State - usually an object that contains all the data about the app
* View -  a function that returns a string of HTML based on the current state
* Transformer functions - functions that transform the value of the state

The state is the single source of truth in the application and can only be updated using the Update function provided by Nanny State.

## Data Flow

Nanny state uses a one-way data flow model:
Page -> event -> event handler -> Transformer -> update the state -> render view -> repeat

The state is updated with transformer functions. These accept the state as an argument and return an updated state or fragment of the state. The page is then automatically re-rendered based on the changes made to the state.

### Set Up

Set the inital state. This can be most data types, but is usually an object.

Define a view (based on the current state). The view is just a function that accepts the current state as an argument and returns a string of HTML.

## Hello World Example

Start by importing the necessary functions:

```javascript
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
```

Now create an object to represent the initial state (this is uusally an object, but can be a number, string, Boolean or array):

```javascript
const state = { name: ‘World’ };
```

Now create the view - this is a function that accepts the state as a parameter and returns a string of HTML that depends on the value of the state's properties:

```javascript
const view = state => html`<h1>Hello ${state.name}</h1>`;
```

Now call the `Nanny` function, providing the `state` and `view` variables as arguments:

```javascript
Nanny(state,view)
```

This will render the view using the initial state.

## Hello Batman Example

To add a button with a click event, change the view to the following:

const view = state => html`<h1>Hello ${state.name}</h1><button @click=${getName}>Batman</button>`

Now we need to write an event handler function to deal with what happens when the button is clicked:

const getName = event => Update(changeName,event.textContent)


## Counter Example

Now let's try building a simple counter app that lets us increase or decrease the count by pressing buttons.

The value of the count will be stored as a number, let's start by creating it with an initial value of 10:

```javascript
const state = 10;
```

Now let's create the view that will return the HTML we want to display:

```javascript
const view = count => html`<h1>Nanny State</h1>
                           <h2>Counter Example</h2>
                           <div id='counter'>${count}</div>
                           <button @click=${down}>-</button>
                           <button @click=${up}>+</button>`
```

Notice that each button has an event listener attached to it using the `@event${handler}` notation used by lit-html ([more info](https://lit-html.polymer-project.org/guide/writing-templates#add-event-listeners)). When the buttons are clicked the event handlers 'down' nad 'up' will be called. We want these to then update the state.

The only way to update the state is to use the function that is returned when the `Nanny` is called. Calling the `Nanny` function has two purposes:
1) It renders the initial view.
2) It returns a function that is the only way of updating the state.

To be able to use this function, we need to assign it to a variable. We usually call it `Update' but can be called anything that you like:

```
const Update = Nanny(state,view)
```

The Update function can now be used to update the state. Nanny State store the new value of the state and re-render the view.


Transformer - a function that accepts the state + some parameters and returns a new state or part of the state

const changeName = (state,name) => { name }

## More Examples


## Extra
Components
State can be string, number, Boolean, array or object
Transformer functions can accept and return fragments of the state
Anonymous event handlers and transformer functions
Before and after functions

## Coming Soon
For a more in-depth tutorial, see the Caesar Cipher tutorial.



