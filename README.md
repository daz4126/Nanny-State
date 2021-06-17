# Nanny-State
Simple state management using just JavaScript

Nanyy State gives you simple state management and ligntening-quick rendering with a tiny amount of code. It was inspired by Redux and Hyperapp and uses the lit-html library for rendering.

The state is the single source of truth in the application. It can only be updated by using the update function that is provided by Nanny State.

# What Is Nanny State?

App is made up of:
state - single source of truth. Every piece of data is held here. Usually an object
view -  template literal of html, based on the current state
event handlers - respond to events
Transformers - functions that transform the state

The state is the single source of truth in your app.
Nanny returns a function that is the only way the state can be updated. This function is usually called ‘update’ but can be called anything that you like.

## Data Flow

Nanny state provides a one-way data flow:
Page -> event -> event handler -> Transformer -> update the state -> render view -> repeat

The state is updated with transformer functions. These accept the state as an argument and return an updated state or fragment of the state.
To update the state.

## Set Up

Set the inital state. This can be most data types, but is usually an object.

Define a view (based on the current state). The view is just a function that accepts the current state as an argument and returns a string of HTML.

# Hello World Example

Start with the initial state:
(this can be an object, number, string or array)

const state = { name: ‘World’ };

Create a view - this is a function that accepts the state as a parameter and returns a string literal of HTML that depends on the value of the state.

const view = state => html`<h1>Hello ${state.name}</h1>`

Now call the `Nanny` function, providing `state` and `view` as argument. Assign the return value to a variable called `Update`:

const Update = Nanny(state,view)

This will render the view using the initial state. The function also returns another function that has now been assigned to `Update`. This function is the only way the state can be changed.

The Update function can now be used to update the state and re-render the view.

Events listeners are used to add interactivity, they are defined inline using the `@event` syntax.

To add a button with a click event, change the view to the following:

const view = state => html`<h1>Hello ${state.name}</h1><button @click=${getName}>Batman</button>`

Now we need to write an event handler function to deal with what happens when the button is clicked:

const getName = event => Update(changeName,event.textContent)

Transformer - a function that accepts the state + some parameters and returns a new state or part of the state

const changeName = (state,name) => { name }

For a more in-depth tutorial, see the Caesar Cipher tutorial.


## Extra
Components
Transformer functinos can accept and return fragments of the state
Anonymous event handlers and transformer functions
Before and after functions


