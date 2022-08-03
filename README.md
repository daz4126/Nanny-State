<div align="center">

# ![NANNY STATE](https://user-images.githubusercontent.com/16646/171668597-4c84201f-de31-4996-be3c-d20be74154d1.png)

_small, simple & speedy state management_

[![npm](https://img.shields.io/npm/v/nanny-state?color=19191c)](https://www.npmjs.com/package/nanny-state)
[![License](https://img.shields.io/badge/License-Unlicense-19191c)](#license)
![Blazingly Fast](https://img.shields.io/badge/speed-blazing%20🔥-19191c)

</div>

**NANNY STATE** is a infinitesimally *small* library that makes it unbelievably *simple* to build blazingly *speedy* web apps.

- **SMALL** - about 3kb minified and zipped
- **SIMPLE** - a single declarative method for updating multiple values at once
- **SPEEDY** - automatic page renders that are blazingly fast

## The State Is Everything

**NANNY STATE** stores everything about the app in a single state object and automatically re-renders the view when the state changes. This means that your code is more organized and easier to maintain without the bloat of other libraries. 

* Just a single 3kb import and no build process required
* Everything is written in vanilla JS and HTML, so no new syntax to learn
* State is shared across the whole app, so no more prop drilling
* Built-in router that makes building single page web apps a breeze
* Add local storage with a single line of code

It's simple learn - just follow the [examples](#examples) below and you'll see some impressive results in just a few lines of code.

## Quick Start

All you need in a NANNY STATE app is a view component and `State` object:

```javascript
import Nanny from "nanny-state"

const Counter = state => state.HTML`
  <h1>${state.count}</h1>
  <div>
    <button onclick=${e => state.Update({count: state.count - 1})}>-</button>
    <button onclick=${e => state.Update({count: state.count + 1})}>+</button>
  </div>`
  
const State = { 
  count: 0, 
  View: Counter
}

Nanny(State)
```

The view component in this example is the `Counter` function. It accepts the state as its only parameter and returns a string of HTML and the `State` object contains all the initial data values.

## What Is NANNY STATE?

NANNY STATE uses a one-way data flow model between the state and view:

<div align="center">
  
![Nanny State data flow diagram](https://user-images.githubusercontent.com/16646/181917166-9d7d8fb5-5d96-4b25-b59b-272739e5be24.png)

</div>

In NANNY STATE, the state is everything. It is the single source of truth in the application where all the app data is stored. The view is an HTML representation of the state. When a user interacts with the page, they trigger event handlers defined in the view that hook into the state's `Update` method. This is the only way the state can be changed and ensures that any updates are deterministic with predictable outcomes. After any updates to the state, the view is automatically re-rendered to reflect the changes made. 

## Background

NANNY STATE was inspired by [Hyperapp](https://hyperapp.dev) and [Redux](https://redux.js.org) and uses the [µhtml](https://github.com/WebReflection/uhtml) library for rendering. It is open source software; please feel free to help out or contribute.

The name is a [British phrase](https://en.wikipedia.org/wiki/Nanny_state) for an overly protective, centralised government. In a similar way, NANNY STATE stores all the app data centrally and controls how it is updated.

## Installation

### Using NPM CLI

Install [nanny-state](https://www.npmjs.com/package/nanny-state) from NPM.

```bash
npm install nanny-state
```

Then import like this:

```javascript
import Nanny from "nanny-state"
```

### ES Modules

If you use ES Modules, you don't need NPM. You can import from a CDN URL in your browser or on CodePen.

```html
<script type="module">
  import Nanny from 'https://cdn.skypack.dev/nanny-state'
</script>
```

<div id="examples">
  
## Examples

The easiest way to learn how NANNY STATE works is to try coding some examples. All the examples below can be coded on [CodePen](https://codepen.io) by simply entering the code in the 'JS' section. 

### Hello World Example

Let's start in the traditional way.

Start by importing the `Nanny` function:

```javascript
import Nanny from 'nanny-state'
```

In NANNY STATE, the state is everything, so we'll create that next. In this example, it will just contain a single method called `View`:

```javascript
const State = { 
  View: state => state.HTML`<h1>Hello World</h1>`
}
```

The `View` in NANNY STATE is a method of the state (*everything* is part of the state!). It is a pure functions that always accept the state as its only parameter. This means it has access to all the properties of the state, including the `state.HTML` function that is provided by µhtml. This is a tag function that returns the HTML code that we want to display on the page. 

Last of all, we need to call the `Nanny` function providing `State` as an argument:

```javascript
Nanny(State)
```

This renders the view based on the initial state.

You can this code on [CodePen](https://codepen.io/daz4126/pen/gOoBryB).

<div align="center">
  
![Hello World!](https://user-images.githubusercontent.com/16646/171663007-2eb40385-b469-41cd-9b7a-c833ce89dac9.png)

</div>

This is just a static piece of HTML though. The view in Nanny State can display properties of the state using `${prop}` placeholders.
  
Even though the View is a property of the State object, it's not really practical to define it directly inside `State` like we did in the example above, especially when the view code becomes quite long. Instead, we can define it as a variable named `View`, then use object-shortand notation to add this to the `State` object, like so:

```javascript
const View = state => state.HTML`<h1>Hello ${state.name}</h1>`

State = {
  name: "World",
  View
}
```

Even though, outwardly, this example looks identical to the previous one, it's different behind the scenes because we are inserting the value of the state object's 'name' property into the `<h1>` element.

You can this code on [CodePen](https://codepen.io/daz4126/pen/jOYeqoN).

Our next job is to make the view dynamic. Let's start by adding a button:
  
```javascript
const View = state => 
  state.HTML`<h1>Hello ${state.name}</h1>
       <button onclick=${e => state.Update({name: "Nanny State"})}>Hello</button>`
```

The button element has an inline `onclick` event listener. When the button is clicked the inline event handler is called. The purpose of this function is to update the state object so the 'name' property changes to 'Nanny State'. This is exactly what the built-in `state.Update` function is for.
  
The `state.Update` function to the *only* way to update the state object. In this example it will change the value of the 'name' property when the button is clicked. This is really easy to do - simply pass an object representing the new state as an argument to the function.
  
In the example above, we pass the object `{name: "Nanny State"}` as an argument to the `state.Update` function. Note that you ony have to include any properties of the State that need updating in this object(**Nanny State** assumes that all the other properties will stay the same). The view will then automatically be re-rendered using µhtml, which only updates the parts of the view that have actually changed. This means that re-rendering after a state update is fast and efficient.

We now have everything wired up correctly. When the user clicks the button, the event handler uses the `state.Update` function to update the 'name' property to 'Nanny State' and re-renders the page based on this new state.

You can this code on [CodePen](https://codepen.io/daz4126/pen/gOoBrJB). Try clicking the button to see the view change!

<div align="center">
  
![Click and change](https://user-images.githubusercontent.com/16646/171669503-68faffbe-dc5e-4122-99f2-3cedb6916543.gif)

</div>
  
Now let's try adding an event handler that uses some information passed to it in the `event` object. We'll create an input field that allows the user to update the `name` property as they type. Change the view to the following:
  
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

You can this code on [CodePen](https://codepen.io/daz4126/pen/qBpJNOp). Try typing into the input field and see the view change as you type!

<div align="center">
  
![Dyncamic content](https://user-images.githubusercontent.com/16646/171663176-e7e23297-ff09-4f65-b541-70e65001e873.gif)

</div>
  
### Hello World, Goodbye World
  
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
  
This view displays a property of the State called `salutation` followed by the string "World" inside `<h1>` tags. The value of `state.salutation` will either be "Hello" or "Goodbye". After this is a button element with an `onclick` event listener attached to it that calls the `changeSalutation` event handler that is defined inside the `View` function. The `saluation` variable uses a ternary operator to display "Goodbye" if the salutation is currenlty "Hello" or display "Hello" otherwise. This is the text displayed on the button and also used by the `changeSalutation` to toggle the value of the `salutation` property. We want the value of `State.salutation` to toggle between "Hello" and "Goodbye" when this button is clicked. 
  
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

You can this code on [CodePen](https://codepen.io/daz4126/pen/vYpVKJv). Click on the button to toggle the heading and button content!

<div align="center">
  
![Toggle content](https://user-images.githubusercontent.com/16646/171663262-5ca1a802-280c-4810-aeee-aec66156d7fb.gif)

</div>

### Counter Example

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
  
You can this code on [CodePen](https://codepen.io/daz4126/pen/gOoByma). Click on the button to increase the count!

<div align="center">
  
![Counter example](https://user-images.githubusercontent.com/16646/171663339-baa00f54-8a19-46d2-8ecd-eef52f2df197.gif)

</div>

### Adding Additional Arguments to Event Handlers

If you need an event handler to accept parameters in addition to the event, then this can be done using a 'double-arrow' function and partial application. The additional arguments always come first and the event should be the last parameter provided to the function:

```javascript
const handler = params = event => newState
```
  
_Note that this is a standard Vanilla JS technique and not unique to Nanny State_

For example, if we wanted our counter app to have buttons that increased the count by 1, 2 or even decreased it by 1, then instead of writing a separate event handler for each button, we could write a function that accepted an extra parameter of how much to increase the value of `state.count` by. We could write an `incrementCount` event handler like so:

```javascript
const incrementCount = (n=1) => event => state.Update({count: state.count + n})
```

Here the parameter `n` is used to determine how much `state.count` is increased by and has a default value of `1`. This makes the event handler much more flexible.

When calling an event handler with parameters in the View, it needs to be partially applied with any arguments that are required. For example, this is how the View would now look with our extra buttons:

```javascript
const View = state => {
  const incrementCount = (n=1) => event => state.Update({count: state.count + n})
  return state.HTML`
  <h1>${state.count}</h1>
  <div>
    <button onclick=${incrementCount()}>+1</button>
    <button onclick=${incrementCount(2)}>+2</button>
    <button onclick=${incrementCount(-1)}>-1</button>
  </div>`
}
```

  
Notice that the `incrementCount` function is actually *called* in the view with the first parameter provided (or if no parameter is provided the default value of `1` will be used. The `event` object will still be implicityly passed to the event handler (even though it isn't used in this example).
  
You can see the code for this updated counter example on [CodePen](https://codepen.io/daz4126/pen/NWXOmpd). Click on the buttons to increase or decrease the count by different amounts!

<div align="center">
  
![Counter example with partial application](https://user-images.githubusercontent.com/16646/171663464-bcb2f6c0-35b1-4c0e-a673-1fd549f62a6f.gif)

</div>

## Components

Parts of the view can be separated into separate components. Each component works in the same way as the view - they are pure funcitons that accept the state as their first parameter and return a string of HTML using the `state.HTML` function.

To see this in action, let's recreate the last example, but with a `Button` component:


```javascript
import Nanny from 'nanny-state'

const Button = (state,text,n=1) => {
  const incrementCount = (n=1) => event => state.Update({count: state.count + n})
  return state.HTML`<button onclick=${incrementCount(n)}>${text}</button>`
}

const View = state => state.HTML`
<h1>${state.count}</h1>
<div>
  ${Button(state,"+1")}
  ${Button(state,"+2",2)}
  ${Button(state,"-1",-1)}
</div>`

const State = {
  count: 0,
  View
}

Nanny(State)
```

Let's take a closer look at the actual `Button` component:

```javascript
const Button = (state,text,n=1) => {
  const incrementCount = (n=1) => event => state.Update({count: state.count + n})
  return state.HTML`<button onclick=${incrementCount(n)}>${text}</button>`
}
```

Notice that the `incrementCount` event handler has been moved to go inside the component. This is because the button is the only part of the view that uses this component. The `Button` function accepts `state` as its first parameter (this is true for *all* components). The next two parameters are props needed by the button: `text` is the text to display on the button and `n` is the amount that the button will increment the count by.

To insert a component into the view, simply use the usual `${}` template literal interpolation syntax and provide the necessary arguments (you're essentially just calling a function that returns some HTML). For example, the last button is displayed using the following code:

```javascript
${Button(state,"-1",-1)}
```

This will display a button element with the text of "-1" and 'increment' the value by `-1`, essentially making the count go down by 1, every time it is pressed.

You can this code on [CodePen](https://codepen.io/daz4126/pen/poLpJXV).
  
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

## API

The state has a number of methods that can be used . Built-in methods or properties are always written in PascalCase (starting with an upper-case letter), so it's recommended to only define properties that start with a lower-case letter in the state to avoid clashes with any of the built-in methods.
  
### The Big 3 Methods
  
These are the only 3 methods you need to get started and the ones that are used in *every* **NANNY STATE** app:
  
#### `HTML`
  
Note that this is actually just the `html` function imported from [µhtml](https://github.com/WebReflection/uhtml), so you can learn a lot more about its intricacies by reading the full docs there.

#### `View`
  
A function that accepts the state as and returns a string of HTML based on the state. The return value *must* be generated usingthe the `state.HTML` function described above.
  
#### `Update`
  
#### `Evaluate`
  
#### `Calculate`
  
This function is the *only* way to update the state.
  
### Other Useful Methods
  
#### `Initiate`

`Initiate` is a method of the state object that is called once before the initial render. It has access to the state and works in the same way as the `Update` function in that its return value updates the state.
  
For example, adding the following method to the `State` object in the counter example will set the start value of the `count` property to `42`:
  
```javascript
Initiate: state => ({count: 42})
```

Of course this could have just been hard coded into the `State` object directly, but sometimes it's useful to programatically set the initial state using a funciton when the app is initialized.

#### `Before` & `After`

`Before` and `After` are methods of the state object that are called before or after a state update respectively. They have access to the state and work in the same way as the `Update` function in that their return value update the state.

For example, try adding the following methods to the `State` object in the 'Hello Nanny State' example to the following:

```javascript
Before: state => console.log('Before:', state.name)
After: state => console.log('After:', state.name)
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

`Debug` is a property of the state that is `false` by default, but if you set it to `true`, then the value of the state will be logged to the console after the initial render and after any state update"

```javascript
State.Debug = true
```
  
#### `LocalStorageKey`

`LocalStorageKey` is a property of the state that ensures that the state is automatically persisted using the browser's [local storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). It will also retrieve the state from the user's local storage every time they visit the site, ensuring persitance of the state between sessions. To use it, simply set this property to the string value that you want to be used as the local storage key. For example, the following setting will use the string "nanny" as the local storage key and ensure that the state is saved to local storage after every update:
  
  ```javascript
  State.LocalStorageKey = 'nanny'
  ```
  
### Routing
  
Routing is baked in to **NANNY STATE**. Remember that the State Is Everything, so all the routes are set up in the `State` object. Simply define a property called `Routes` as an array of **route objects**. Route objects contain the following properties:
  
  * `path`: the path used to access the route
  * `title`: the title property of the route
  * `view`: a function that works exactly like the main `View` function (a bit like a sub-view) and accepts the current state as an argument and returns a string of HTML
  
Here's a basic example:
  
```javascript
Routes: [
    { path: "/", title: "Home", view: state => html`<h1>Home</h1>` },
    { path: "about", title: "About", view: state => html`<h1>About Us</h1>` },
    { path: "contact", title: "Contact", view: state => html`<h1>Contact Us</h1>` }
  ]
```
  
Let's use those route objects to build a mini single-page website.
  
First of all we need to create the main `View`. When using routes, this takes the form of a template layout for *all* pages and we use the special `Content` property of the State to indicate where the specific content from each route will be displayed in the layout. Here's a basic example:
  
```javascript
const View = state => html` <h1>Nanny State</h1>
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
    { path: "/", title: "Home", view: state => html`<h1>Home</h1>` },
    { path: "about", title: "About", view: state => html`<h1>About Us</h1>` },
    { path: "contact", title: "Contact", view: state => html`<h1>Contact Us</h1>` }
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
  
![Routing in Nanny State](https://user-images.githubusercontent.com/16646/171664411-8912caad-9908-4d4e-99bb-6f7c9ae3c59f.gif)

</div>
    
### Nested Routes
  
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
  
The `:` symbol can be used to denote a *wildcard* route. For example, the following route object using a wildcard called `:id` in its path property:
  
```javascript
    { path: ":name", title: "Programming Languages", view: state => html`<h1>${state.language)</h1>` }
```
  
When the user visits the URL path '/javascript' a `params` object will be created with the a key of "name" and value of "javascript". This can then be used in an `update` function that can be added to the route object and works in exactly the same way as the **NANNY STATE** `Update` function, it accepts the current state and returns a new state. The different is that this also accepts the params object as its first parameter (this is passed automatically to the `update` function along with the state.
  
In this example we could add the following `update` function to the route object:
  
```javascript
    { path: ":name", title: "Programming Languages", view: state => html`<h1>${state.language)</h1>`, update: params => state => ({ language: params.name})  }
```
  
This will set the `language` property of the state to be the same as the `name` property of the `params` object, in other words it will be set to whatever was entered into the URL. This property is then displayed as a heading in the view for this route.

## License

Released under [Unlicense](/LICENSE) by [@daz4126](https://github.com/daz4126).
