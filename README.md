<div align="center">

# ![NANNY STATE](https://user-images.githubusercontent.com/16646/186224291-dea29811-1351-4ba8-a7d6-8831bd448d10.png)

_small, simple & speedy state management_

[![npm](https://img.shields.io/npm/v/nanny-state?color=f4d22b)](https://www.npmjs.com/package/nanny-state)
[![License](https://img.shields.io/badge/License-Unlicense-ee119a)](#license)
![Blazingly Fast](https://img.shields.io/badge/speed-blazing%20🔥-38c8e5)

</div>

**NANNY STATE** is a super *small* library that makes it super *simple* to build super *speedy* web apps.

- **SUPER SMALL** - only 3kb minified and zipped
- **SUPER SIMPLE** - a single state object and update method
- **SUPER SPEEDY** - automatic page renders that are blazingly fast

## THE STATE IS EVERYTHING

**NANNY STATE** stores everything in a single state object and automatically re-renders the view whenever the state changes. This helps to keep your code more organized and easier to maintain without the bloat of other libraries. 

* A single import and no build process
* State is shared across the whole app
* Everything is written in vanilla JS and HTML
* Built-in router makes it easy to build single page web apps
* Local storage can be added with a single line of code

**NANNY STATE** is easy learn - just follow the [examples](#examples) below and you'll see some impressive results in just a few lines of code.

## QUICK START

All you need in a **NANNY STATE** app is a view component and `State` object:

```javascript
import Nanny from "nanny-state"
// View Code
const Counter = state => state.HTML`
  <h1>${state.count}</h1>
  <div>
    <button onclick=${e => state.Decrement("count")}>-</button>
    <button onclick=${e => state.Increment("count")}>+</button>
  </div>`
// Initial State  
const State = { 
  count: 0, 
  View: Counter
}
// Start the Nanny State!
Nanny(State)
```

The view component in this example is the `Counter` function. It accepts the state as its only parameter and returns a string of HTML based on the current state. The `State` object contains all the initial data values.

This example can be seen [on Codepen](https://codepen.io/daz4126/pen/mdveMBy)

## WHAT IS NANNY STATE?

**NANNY STATE** uses a one-way data flow model between the state and view:

<div align="center">
  
![Nanny State data flow diagram](https://user-images.githubusercontent.com/16646/186718499-3f60a2e9-2c27-4343-b242-ef2da1fd9c3c.png)

</div>

In NANNY STATE, the state is everything. It is the single source of truth in the application where all the app data is stored. The view is an HTML representation of the state. When a user interacts with the page, they trigger event handlers defined in the view that hook into the state's `Update` method. This is the only way the state can be changed and ensures that any updates are deterministic with predictable outcomes. Whenever the state is updated, the view is automatically re-rendered to reflect the changes that were made. 

## BACKGROUND

NANNY STATE was inspired by [Hyperapp](https://hyperapp.dev) and [Redux](https://redux.js.org) and uses the [µhtml](https://github.com/WebReflection/uhtml) library for rendering. It is open source software; please feel free to help out or contribute.

The name is a [British phrase](https://en.wikipedia.org/wiki/Nanny_state) for an overly protective, centralised government. In a similar way, NANNY STATE stores all the app data centrally and controls how it is updated.

## INSTALLATION

### USING NPM CLI

Install [nanny-state](https://www.npmjs.com/package/nanny-state) from NPM.

```bash
npm install nanny-state
```

Then import like this:

```javascript
import Nanny from "nanny-state"
```

### ES MODULES

If you use ES Modules, you don't need NPM. You can import from a CDN URL in your browser or on CodePen.

```html
<script type="module">
  import Nanny from 'https://cdn.skypack.dev/nanny-state'
</script>
```

<div id="examples">
  
## EXAMPLES

The easiest way to learn how **NANNY STATE** works is to try coding some examples. All the examples below can be coded on [CodePen](https://codepen.io) by simply entering the code in the 'JS' section. 

### HELLO WORLD

Let's start in the traditional way and make a "Hello World" app!

Start by importing the `Nanny` function:

```javascript
import Nanny from 'nanny-state'
```

In **NANNY STATE**, the state is everything, so we'll create that next. In this example, it will just contain a single method called `View`:

```javascript
const State = { 
  View: state => state.HTML`<h1>Hello World</h1>`
}
```

The `View` in **NANNY STATE** is a method of the state (*everything* is part of the state!). It is a function that always accept the state as its only parameter. This means it has access to all the properties of the state, including the `state.HTML` function that is just an alias for µhtml's `html` function. This is a tag function that returns the HTML code that we want to display on the page, which in this case is a level 1 heading that says "Hello World". 

Last of all, we need to call the `Nanny` function providing `State` as an argument:

```javascript
Nanny(State)
```

This renders the view based on the initial state.

You can see this code on [CodePen](https://codepen.io/daz4126/pen/gOoBryB).

<div align="center">
  
![Hello World!](https://user-images.githubusercontent.com/16646/186718624-345e466f-6303-4bb8-9f4c-d262ebd1f8a3.png)

</div>

All we've done so far is create a static piece of HTML. The view in **NANNY STATE** can display properties of the state using `${prop}` placeholders.
  
Even though `View` is a property of the State object, it's not really practical to define it directly inside `State` like we did in the last example, especially when the view code becomes quite long. Instead, we can define it as a variable named `View`, then use object-shortand notation to add this to the `State` object, like so:

```javascript
const View = state => state.HTML`<h1>Hello ${state.name}</h1>`

State = {
  name: "World",
  View
}
```

Even though, outwardly, this example looks identical to the previous one, it's different behind the scenes because we are inserting the value of the state object's 'name' property into the `<h1>` element.

You can see this code on [CodePen](https://codepen.io/daz4126/pen/jOYeqoN).

Our next job is to make the view dynamic. Let's start by adding a button:
  
```javascript
const View = state => 
  state.HTML`<h1>Hello ${state.name}</h1>
             <button onclick=${e => state.Update({name: "Nanny State"})}>Hello</button>`
```

The button element has an inline `onclick` event listener. When the button is clicked the inline event handler is called. The purpose of this function is to update the state object so the 'name' property changes to 'Nanny State'. This is exactly what the built-in `state.Update` function is for.
  
The `state.Update` function to the *only* way to update the state. In this example it will change the value of the 'name' property when the button is clicked. This is really easy to do - simply pass an object representing the new state as an argument to the function.
  
In the example above, we pass the object `{name: "Nanny State"}` as an argument to the `state.Update` function. Note that you ony have to include any properties of the State that need updating in this object(**NANNY STATE** assumes that all the other properties will stay the same). The view will then automatically be re-rendered using µhtml, which only updates the parts of the view that have actually changed. This means that re-rendering after a state update is fast and efficient.

We now have everything wired up correctly. When the user clicks the button, the event handler uses the `state.Update` function to update the 'name' property to 'Nanny State' and re-renders the page based on this new state.

You can see this code on [CodePen](https://codepen.io/daz4126/pen/gOoBrJB). Try clicking the button to see the view change!

<div align="center">
  
![Click and change](https://user-images.githubusercontent.com/16646/186718719-6ddd96e4-2053-4667-af59-81634924dd27.gif)

</div>
  
Now let's try adding an event handler that uses some information passed to it via the `event` object. We'll create an input field that allows the user to update the `name` property to whatever they type in. Change the view to the following:
  
```javascript
const View = state => {
  const changeName = event => state.Update({name: event.target.value})
  return state.HTML`<h1>Hello ${state.name}</h1>
  <input oninput=${changeName}>`
}
```
  
We've defined an event handler called `changeName` at the top of the `View` function. This means that we have to explicity return the `state.HTML` string at the end of the function. This is similar to the previous example, but we've replaced the button with an input field with an inline `oninput` event listener.
  
The `changeName` event handler uses the `state.Update` to replace the `name` property of the state with the value of `event.target.value` which corresponds to the text entered into the input field. Every time the input changes, this event will fire and the view will be re-rendered to correspond to what has been typed into the input field.
  
The `State` object stays the same:
  
```javascript
 const State = {
  name: "World",
  View
} 
```

You can see this code on [CodePen](https://codepen.io/daz4126/pen/qBpJNOp). Try typing into the input field and see the view change as you type!

<div align="center">
  
![Dyncamic content](https://user-images.githubusercontent.com/16646/186718793-6c39d3a0-604c-4ae4-bcd4-bfb3df870d0b.gif)

</div>
  
### HELLO WORLD, GOODBYE WORLD
  
This next example shows how to implement a toggle function as well as how to render parts of the view based on the value of properties in the State.

Start, in the usual way, by importing the `Nanny` function:

```javascript
import Nanny from 'nanny-state'
```
  
Next we'll create the view:

```javascript
const View = state => {
  const salutation = state.salutation === "Hello" ? "Goodbye" : "Hello"
  const changeSalutation = event => state.Update({salutation})
  return state.HTML`<h1>${state.salutation} World</h1><button onclick=${changeSalutation}>${salutation}</button>`
}
```
  
This view displays a property of the state called `salutation` followed by the string "World" inside `<h1>` tags. The value of `state.salutation` will either be "Hello" or "Goodbye". After this is a button element with an `onclick` event listener attached to it that calls the `changeSalutation` event handler that is defined inside the `View` function. The `saluation` variable uses a ternary operator to display "Goodbye" if the salutation is currenlty "Hello" or display "Hello" otherwise. This is the text displayed on the button and also used by the `changeSalutation` to toggle the value of the `salutation` property. We want the value of `State.salutation` to toggle between "Hello" and "Goodbye" when this button is clicked. 
  
Let's create the `State` object with the initial value of the `salutation` property set to be "Hello":
  
```javascript
const State = {
  salutation: "Hello",
  View
}
```
  
As you can see, the `salutation` property is set to "Hello" initially and the `View` function is added to the `State` as usual. Let's take a closer look at the `changeSalutation` event handler. In the previous examples, the `state.Update` function was passed a new representation of the state with hard-coded values, but in this example the new value depends on the current value of the state. If the `salutation` property is "Hello" then it will change it to "Goodbye" and vice versa.
  
All we we need to do now is start the Nanny State!:
  
```javascript
Nanny(State)
```

You can see this code on [CodePen](https://codepen.io/daz4126/pen/vYpVKJv). Click on the button to toggle the heading and button content!

<div align="center">
  
![Toggle content](https://user-images.githubusercontent.com/16646/186718896-af0473e6-0072-4bed-9298-b8730fa11a5d.gif)

</div>

### COUNTER EXAMPLE

Every state managememnt library needs a counter example!

We start in the usual way by importing the necessary functions:

```javascript
import Nanny from 'nanny-state'
```

Now let's create the view that will return the HTML we want to display:

```javascript
const View = state => state.HTML`<button onclick=${e => state.Update({count: state.count + 1})}>${state.count}</button>`
```

This is a button that displays the number of times the button has been clicked on, which is a property of the State called `count`. It also has an `onclick` event listener and an inline event handler that increases the value of the `count` property by 1 every time the button is pressed.

Now we need to define the `State` object, setting the inital value of the `count` property to `0`:

```javascript
const State = {
  count: 0,
  View
}
```
  
As usual, the `State` object also requires `View` to be added as well.

Last of all, we just need to call the `Nanny` function to start the Nanny State:

```javascript
Nanny(State)
```

This will render the initial view with the count set to `0` and allow you to increase the count by clicking on the button.
  
You can see this code on [CodePen](https://codepen.io/daz4126/pen/gOoByma). Click on the button to increase the count!

<div align="center">
  
![Counter example](https://user-images.githubusercontent.com/16646/186719036-27eccfed-06c5-4a8a-9f36-1ce0ff29bcd0.gif)

</div>

### ADDING ADDITIONAL ARGUMENTS TO EVENT HANDLERS

If you need an event handler to accept parameters in addition to the event, then this can be done using a [curried](https://medium.com/@harouny/currying-in-javascript-arrow-function-sequence-2a510441215a) function and partial application. The additional arguments always come first and the event should be the last parameter provided to the function:

```javascript
const handler = params => event => newState
```
  
_Note that this is a standard Vanilla JS technique and not unique to Nanny State_

For example, if we wanted our counter app to have buttons that increased the count by 1, 2 or even decreased it by 1, then instead of writing a separate event handler for each button, we could write a function that accepted an extra parameter that represents how much we want to increase the value of `state.count` by. We could write an `incrementCount` event handler to do this with the following code:

```javascript
const incrementCount = n => event => state.Update({count: state.count + n})
```

Here the parameter `n` is used to determine how much `state.count` is increased by. This makes the event handler much more flexible.

When calling an event handler with parameters in the View, it needs to be partially applied with any arguments that are required. For example, this is how the View would now look with our extra buttons:

```javascript
const View = state => {
  const incrementCount = n => event => state.Update({count: state.count + n})
  return state.HTML`
  <h1>${state.count}</h1>
  <div>
    <button onclick=${incrementCount(1)}>+1</button>
    <button onclick=${incrementCount(2)}>+2</button>
    <button onclick=${incrementCount(-1)}>-1</button>
  </div>`
}
```

Notice that the `incrementCount` function is actually *called* in the view with the first parameter provided (or if no parameter is provided the default value of `1` will be used. The `event` object will still be implicityly passed to the event handler (even though it isn't used in this example).
  
You can see the code for this updated counter example on [CodePen](https://codepen.io/daz4126/pen/NWXOmpd). Click on the buttons to increase or decrease the count by different amounts!

<div align="center">
  
![Counter example with partial application](https://user-images.githubusercontent.com/16646/186719108-dc9c0402-a5d4-43bf-87a2-533fb2d3cbbc.gif)

</div>

## COMPONENTS

Parts of the view can be separated into separate components. Each component works in the same way as the view - they are pure funcitons that accept the state as their first parameter and return a string of HTML using the `state.HTML` function.

To see this in action, let's recreate the last example, but with a `Button` component:


```javascript
import Nanny from 'nanny-state'

const Button = (state,props) => {
  const incrementCount = n => event => state.Update({count: state.count + n})
  return state.HTML`<button onclick=${incrementCount(props.n)}>${props.text}</button>`
}

const View = state => state.HTML`
<h1>${state.count}</h1>
<div>
  ${Button(state,{text: "+1",n: 1})}
  ${Button(state,{text: "+2",n: 2})}
  ${Button(state,{text: "-1",n: -1})}
</div>`

const State = {
  count: 0,
  View
}

Nanny(State)
```

Let's take a closer look at the actual `Button` component:

```javascript
const Button = (state,props) => {
  const incrementCount = n => event => state.Update({count: state.count + n})
  return state.HTML`<button onclick=${incrementCount(props.n)}>${props.text}</button>`
}
```

Notice that the `incrementCount` event handler has been moved to go inside the component. This is because the button is the only part of the view that uses this component. The `Button` function accepts `state` as its first parameter and `props` as its second parameter (this is true for *all* components). `props` is an object that includes any properties that are needed to display the button: `text` is the text to display on the button and `n` is the amount that the button will increment the count by.

To insert a component into the view, simply use the usual `${}` template literal interpolation syntax and provide the necessary arguments (you're essentially just calling a function that returns some HTML). For example, the last button is displayed using the following code:

```javascript
${Button(state,{text: "-1",n: -1})}
```

This will display a button element with the text of "-1" and 'increment' the value by `-1`, essentially making the count go down by 1, every time it is pressed.

You can see this code on [CodePen](https://codepen.io/daz4126/pen/poLpJXV).

  
## MORE NANNY STATE EXAMPLES

Here are some examples of apps that show what can be made with NANNY STATE:

* [Numble](https://numble.online) - A numerical Wordle clone (by Olivia Gibson)
* [Times Tables Quiz](https://codepen.io/goldenrod/pen/PoKjrYV) (by Olivia Gibson)
* [Shopping Cart](https://codepen.io/daz4126/pen/WNjmQyB)
* [Noughts & Crosses (Tic-Tac-Toe)](https://codepen.io/daz4126/pen/xxdYvpz)
* [To Do List](https://codepen.io/daz4126/pen/wvgrLme)
* [Caesar Cipher](https://codepen.io/daz4126/pen/OJprPrL)
* [Random Fact API](https://codepen.io/daz4126/pen/ExZqKLO)
* [Timer](https://codepen.io/daz4126/pen/MWvWVZZ)
* [True or False Quiz](https://codepen.io/daz4126/pen/OJvGzBQ)
  
  </div>

## API

The state has a number of methods that can be used . Built-in methods or properties are always written in PascalCase (starting with an upper-case letter), so it's recommended to only define properties that start with a lower-case letter in the state to avoid clashes with any of the built-in methods.
  
### THE BIG 3 METHODS
  
These are the only 3 methods you need to get started and the ones that are used in *every* **NANNY STATE** app:
  
#### `HTML`
  
Note that this is actually just the `html` function imported from [µhtml](https://github.com/WebReflection/uhtml), so you can learn a lot more about its intricacies by reading the full docs there.

The basics are that the `state.HTML` method is a [tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) that accepts a backtick string of HTML that will be re-rendered every time the state changes.

Example:
```javascript
state.HTML`<h1>Hello World</h1>`
```

Any valid HTML is acceptable. State properties and any other values can be inserted into the HTML by placing them inside `${}`.

Example:

```javascript
state = {
  name: "Nanny State"
}
state.HTML`<h1>Hello ${state.name}</h1>`

```

#### `View`
  
A function that accepts the state and returns a string of HTML based on the state. The return value *must* be generated using the `state.HTML` function described above.
  
#### `Update`
  
`Update` is the *only* way to update the state.
  
It accepts an object as a parameter. Any properties in this object will be updated in the state with the values provided. 
If the property doesn't already exist in the state, then it will be added to the state.

Example:

```javascript
state = {
  count: 1
}

state.Update({count: 5, name: "Nanny State"})

state = {
  count: 5,
  name: "Nanny State"
}
```

##### Transformer Functions
  
The update can also be passed a transformer function instead of an object. A transformer function accepts the current state as an argument and returns a new representation of the state. They are basically a mapping function from the current state to a new state as shown in the diagram below:

![171490767-5ac02acb-0ed8-4d63-962b-f6bbf40ce553](https://github.com/daz4126/Nanny-State/assets/16646/83c3acfc-43de-49fc-b699-e1c3213f0070)

ES6 arrow functions are perfect for transformer functions as they visually show the mapping of the current state to a new representation of the state.

Transformer functions must be [pure functions](https://en.wikipedia.org/wiki/Pure_function). They should always return the same value given the same arguments and should not cause any side-effects. They take the following structure:

```javascript
state => newState
```

Here's an example of a transformer function that would change the case of the `name` property to uppercase:

```javascript
const upCase = state => ({name: state.name.toUpperCase()})
```

Transformer functions are passed by reference to the `Update` function. The current state is implicityly passed as an argument to any transformer function (similiar to the way the event object is implicitly passed to event handlers when they are called).
  
##### Sequential State Updates

The `state.Update` method accepts multiple arguments and will update the state in the order they are provided. The state after updating with the previous argument will be used in to update with subsequent arguments.

For example:

```
State = {
  likes: 0,
  popular: false
}

state.update({likes: state.likes + 1, popular: state.likes > 10 ? true : false })
```

This will cause a problem when the value of `state.likes` is `10`. After this update `state.likes` will increment to `11`, but the test in the ternary operator will still be using the previous value of `10` to check if it should change. This means that even though the number of likes will increase to `11` and display this, the value of `state.popular` will remain as `false`.

This can be overcome by sending the updates sequentially:

```
state.update({likes: state.likes + 1}, popular: state.likes > 10 ? true : false })

```

This will update the value of `state.likes` to `11` and *then* update the value of `state.popular` using the just updated value of `11` for `state.likes`.

Note it would be better to use the [`state.Calculate`](https://github.com/daz4126/Nanny-State/tree/main#calculate) method to update the value of `state.popular` whenever `state.likes` changes.

### OTHER USEFUL METHODS
  
#### `Evaluate`
  
Returns the current value of any property of the state provided as a parameter. These values can be queried but can't be changed (you need to use the `Update` method to actually change any properties of the state).

Example:

```javascript
const State = {
  count: 10
}

state.Evaluate("count") = 10
```
  
#### `JSON`

Returns a JSON string representation of the current state.

Example:

```javascript
const State = {
  count: 10
}

state.JSON() = "{'count':10}"
```
  
#### `Calculate`

The `Calculate` method adds a function that will calculate  the value of a property of the state based on other properties of the state whenever the state changes, or when only specific properties of the state change:
  
```javascript
state.Calculate(state = > ({ doubleCount: state.count * 2 }))
```

This will update the property `state.doubleCount` to double the value of `state.count` whenever the state changes.

`State.Calculate` also accepts a second argument, which is a comma-seperated list of properties. The calculation will only run when these properties change. If this is left empty, then the calculation will run after *every* update to the state.


```javascript
state.Calculate(state = > ({ doubleCount: state.count * 2 }),"count")
```

This will now only recalculate when the `state.count` property changes.


### `Effect`

The `Effect` method adds a function that causes any side-effects and runs after any update to the state, or when only specific properties change.

```javascript
state.Effect(state = > console.log(state.count))
```

This will log the value of `state.count` to the console whenever the state changes.

`State.Effect` also accepts a second argument, which is a comma-seperated list of properties. The effect will only run when these properties change. If this is left empty, then the effect will run after *every* update to the state.


```javascript
state.Effect(state = > console.log(state.count), "count")
```

This will now only log the value of `state.count` to the console when the `state.count` property changes.

### `Every`

The `state.Every` method will continually update the state after a given number of milliseconds.

Example:

```javascript
State = {
  time: 0,
}
```

### `Delay`

The `state.Delay` method will update the state after a specified number of milliseconds.

### `Increment`

The `state.Increment` method is a convenience method that will *increase* the value of a property by a given value that defaults to 1. The name of the property is provided as the first argument as a string, the second argument is a number that the property should increase by.

Example:

```javascript
State = {
  count: 10
}

// increase the count by 1
state.Increment("count")

// increase the count by 5
state.Increment("count",5)

```

### `Decrement`

The `state.Decrement` method is a convenience method that will *decrease* the value of a numerical property of the state by a given value that defaults to 1. The name of the property is provided as the first argument as a string, the second argument is a number that the property should decrease by.

Example:

```javascript
State = {
  count: 10
}
// decrease the count by 3
state.Decrement("count",3)
```

### `Toggle`

The `state.Toggle` method is a convenience method that will toggle the value of a Boolean property by a given value that defaults to 1. The name of the property to toggle is provided as a string as the only argument.

Example:

```javascript
State = {
  darkMode: true
}
// turn off dark mode
state.Toggle("darkMode")
```

### `Append`

### `Insert`

### `Replace`

### `Remove`


    
#### `Initiate`

`Initiate` is a method of the state object that is called once before the initial render. It has access to the state and works in the same way as the `Update` function in that its return value updates the state.
  
For example, adding the following method to the `State` object in the counter example will set the start value of the `count` property to `42`:
  
```javascript
State.Initiate = state => ({count: 42})
```

Of course this could have just been hard coded into the `State` object directly, but sometimes it's useful to programatically set the initial state using a funciton when the app is initialized.

#### `Before` & `After`

`Before` and `After` are methods of the state object that are called before or after a state update respectively. They have access to the state and work in the same way as the `Update` function in that their return value update the state.

For example, try adding the following methods to the `State` object in the 'Hello Nanny State' example to the following:

```javascript
State.Before = state => console.log('Before:', state.name)
State.After = state => console.log('After:', state.name)
```

Now, when you press the `Hello` button, the following is logged to the console, showing how the state has changed:

```
"Before:"
{
  "name": "World"
}
"After:"
{
  "name": "Nanny State"
}
```

#### `Element`

By Default the view will be rendered inside the `body` element of the page. This can be changed using the `Element` property of the state object or by providing it as part of the `options` object of the `Nanny` function. For example, if you wanted the view to be rendered inside an element with the id of 'app', you just need to specify this as an option when you call the `Nanny` function:

```javascript
State.Element = document.getElementById('app')
```

#### `Debug`

`Debug` is a property of the state that is `false` by default, but if you set it to `true`, then the value of the state will be logged to the console as a JSON string after the initial render and after any changes to the state.

```javascript
State.Debug = true
```
  
#### `LocalStorageKey`

`LocalStorageKey` is a property of the state that ensures that the state is automatically persisted using the browser's [local storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). It will also retrieve the state from the user's local storage every time they visit the site, ensuring persitance of the state between sessions. To use it, simply set this property to the string value that you want to be used as the local storage key. For example, the following setting will use the string "nanny" as the local storage key and ensure that the state is saved to local storage after every update:
  
  ```javascript
  State.LocalStorageKey = 'nanny'
  ```

### LocalStorageBlackList

`LocalStorageBlackList` is a property of the state that is a comma-separated string of values that should not be stored in local storage and will therefore not persist between sessions.

Example:

```
State.LocalStorageBlackList = "name,count"
```

The `state.name` and `state.count` properties will not be saved to local storage.
  
### ROUTING
  
Routing is baked in to **NANNY STATE**. Remember that the State Is Everything, so all the routes are set up in the `State` object. Simply define a property called `Routes` as an array of **route objects**. Route objects contain the following properties:
  
  * `path`: the path used to access the route
  * `title`: the title property of the route
  * `view`: a function that works exactly like the main `View` function (a bit like a sub-view) and accepts the current state as an argument and returns a string of HTML
  
Here's a basic example:
  
```javascript
Routes: [
    { path: "/", title: "Home", view: state => state.HTML`<h1>Home</h1>` },
    { path: "about", title: "About", view: state => state.HTML`<h1>About Us</h1>` },
    { path: "contact", title: "Contact", view: state => state.HTML`<h1>Contact Us</h1>` }
  ]
```
  
Let's use those route objects to build a mini single-page website.
  
First of all we need to create the main `View`. When using routes, this takes the form of a template layout for *all* pages and we use the special `Content` property of the State to indicate where the specific content from each route will be displayed in the layout. Here's a basic example:
  
```javascript
const View = state => state.HTML` <h1>Nanny State</h1>
  <h2>Router</h2>
  <nav>
    <ul>
      <li><a href="/" onclick=${state.Link()}>Home</a></li>
      <li><a href="/about" onclick=${state.Link()}>About</a></li>
      <li><a href="/contact" onclick=${state.Link()}>Contact</a></li>
    </ul>
  </nav>
  <main>${state.Content}</main>`
```
The first thing to notice here are the `state.Content` property inside the `<main>` tags. This will render a different view, depending on the route. This is the function that is provided as the `view` property in the route object.

The other thing to notice is the built-in `state.Link()` method. This will update the current route to the argument provided. If no argument is provided then it will automatically use the value of the `href` attribute. So, in the example above, clicking on the 'About' link will update the route to '/about'.
  
Now we just need to create the initial `State` object. This needs to contain the `Routes` array that contains a route object for each route as well as the `View`:
  
```javascript
const State = {
   Routes: [
    { path: "/", title: "Home", view: state => state.HTML`<h1>Home</h1>` },
    { path: "about", title: "About", view: state => state.HTML`<h1>About Us</h1>` },
    { path: "contact", title: "Contact", view: state => state.HTML`<h1>Contact Us</h1>` }
  ],
  View
}  
```

Last of all we just need to start the Nanny State:
  
```javascript
Nanny(State)
```
  
You can see this example on [CodeSandbox](https://si96c4.csb.app) (_note that routing won't work on CodePen_).
  
<div align="center">
  
![Routing in Nanny State](https://user-images.githubusercontent.com/16646/187732193-1ff861d0-3894-44f2-9211-0850eefe5682.gif)

</div>
    
### NESTED ROUTES
  
You can create nested routes by adding a `routes` property to a route object. This is an array that acts in the same way as the top-level `Routes` property and contains nested route objects.
  
For example, if you wanted the route '/about/us' to go to display the About page, you could update the `Routes` array above to the following:
  
```javascript
Routes: [
    { path: "/", title: "Home", view: state => html`<h1>Home</h1>` },
    { path: "about", 
        routes: [ 
          { path: "us", title: "About Us", view: state => html`<h1>About Us</h1>` }
        ] 
    },
    { path: "contact", title: "Contact", view: state => html`<h1>Contact Us</h1>` }
]
```

The `routes` array in any route object can contain as many nested routes as required.

### Wildcard Routes
  
The `:` symbol can be used to denote a *wildcard* route. For example, the following route object using a wildcard called `:name` in its path property:
  
```javascript
    { path: ":name", title: "Programming Languages", view: state => html`<h1>${state.language)</h1>` }
```
  
When the user visits the URL path '/javascript' a `params` object will be created with the a key of "name" and value of "javascript". This can then be used in an `update` function that can be added to the route object and works in exactly the same way as the **NANNY STATE** `Update` function, it accepts the current state and returns a new state. The different is that this also accepts the params object as its first parameter (this is passed automatically to the `update` function along with the state.
  
In this example we could add the following `update` function to the route object:
  
```javascript
    { path: ":name", title: "Programming Languages", view: state => html`<h1>${state.language)</h1>`, update: params => state => ({ language: params.name})  }
```
  
This will set the `language` property of the state to be the same as the `name` property of the `params` object, in other words it will be set to whatever was entered into the URL. This property is then displayed as a heading in the view for this route.

## LICENSE

Released under [Unlicense](/LICENSE) by [@daz4126](https://github.com/daz4126).
