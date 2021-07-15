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
const state = { name: ‘World’ }
```

Now create the view - this is a function that accepts the state as a parameter and returns a string of HTML that depends on the value of the state's properties:

```javascript
const view = state => html`<h1>Hello ${state.name}</h1>`
```

Now call the `Nanny` function, providing the `state` and `view` variables as arguments:

```javascript
Nanny(state,view)
```

This will render the view using the initial state.

![Screenshot Hello World](https://user-images.githubusercontent.com/16646/125823073-d88989b7-f807-4213-a871-f5f41e198f23.png)

You can see this example [on CodePen](https://codepen.io/daz4126/pen/zYwZjWw)

## Hello Batman Example

This example will give an idea about how Nanny State deals with changing the state and re-rendering the view.

It starts example the same, by importing the functions we'll use and initializing the state:

```javascript
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
const state = { name: 'Bruce Wayne' }
```

Next we'll add the view template. This contains a button with a click event.

```javascript
const view = state => html`<h1>Hello ${state.name}</h1>
                           <button @click=${beBatman}>I'm Batman</button>`
```

The button has an event listener attached to it using the `@event${handler}` notation used by lit-html ([more info](https://lit-html.polymer-project.org/guide/writing-templates#add-event-listeners)). When the buttons are clicked the event handler 'beBatman' will be called. We want this function to update the state so the 'name' property changes to 'Batman'.

The only way to update the state is to use the function that is returned when the `Nanny` function is called. Calling the `Nanny` function has two purposes:
1) It renders the initial view (as we saw in the Hello World example above).
2) It returns a function that is the only way of updating the state (which we didn't use in the Hello World example, since the state didn't change).

To be able to use this function, we need to assign it to a variable when we call the `Nanny()` function. We usually call it `Update` but it can be called anything you like:

```
const Update = Nanny(state,view)
```

The `Update` function can now be used to update the state. It works by providing it with a transformer function that tells Nanny State how to update the value of the state. Nanny State will then store the new value of the state and re-render the view based on any changes that have occured.

To see how this works, let's write the 'beBatman' event handler function to update the state and change the 'name' property to 'Batman' when the button is clicked (note that this needs to be defined *before* the view function in your code):

```javascript
const beBatman = event => Update(state => ({ name: 'Batman'}))
```

Note that because this is an event handler, the only parameter is the event object. The main purpose of this event handler is to call the `Update` function. This accepts an anonymous function as an argument tells Nanny State how to update the state. This anonymous function is a **transformer function**.

A transformer function accepts the state as an argument and returns a new representation of the state object. In this case the transformer function return a new object with the 'name' property of 'Batman'.
**Note that when an arrow function is used to return an object, it needs wrapping in parentheses**

Everything is now in place and wired up. Try clicking the button and you'll see the view updates!

![Screenshot Hello Batman](https://user-images.githubusercontent.com/16646/125826661-0b799f2d-613d-45b8-9bef-5c0d214fe669.png)

You can see this example [on CodePen](https://codepen.io/daz4126/pen/oNWZdyd)

## Counter Example

Now let's try building a simple counter app that lets us increase or decrease the count by pressing buttons.

The value of the count will be stored in the state as a number (The state is usually an object, but it doesn't have to be), let's initialize it with a value of 10:

```javascript
import {Nanny,html,render} from 'https://daz4126.github.io/Nanny-State/main.js'
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

The two buttons call the two event handlers: `down` and `up` to deal with .


```
const Update = Nanny(state,view)
```

The Update function can now be used to update the state. Nanny State store the new value of the state and re-render the view.

![Screenshot Counter Example](https://user-images.githubusercontent.com/16646/125827676-f8510690-5b2e-4e98-b8b2-d00b8f530061.png)

You can see this example [on CodePen](https://codepen.io/daz4126/pen/vYgdLdX!)


## More Examples


## Extra
Components
State can be string, number, Boolean, array or object
Transformer functions can accept and return fragments of the state
Anonymous event handlers and transformer functions
Before and after functions

## Coming Soon
For a more in-depth tutorial, see the Caesar Cipher tutorial.



