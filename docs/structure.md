# Structure

Nanny State consists of 3 inter-dependent parts:

* State
* View
* Transformers

Learning how these all fit together is the key to learning how to use Nanny State effectively.

## State
The state is the single source of truth in the whole application. Everything about the application is stored in the state. 

The state is usually an object, but can be any type. It is usually only advisable to use a different type for simple applications that only use a single piece of data (for example, the Counter application only needs to keep track of a single numerical value).

The initial value of the state is passed to the `Nanny` function to render the view based on the inital state.

The state can only be changed using the `Update` function that is returned by the `Nanny` function.

## View

The view is a string of HTML that is based on the current state. Nanny State uses the `html`, `svg` and `render` modules from the  [µhtml](https://github.com/WebReflection/uhtml) library to render views.

Any view needs to be written as a function that accepts the state as a parameter and return the `html` function that is provided by µhtml. 
The `html` function is a tagged template literal.

Any properties of the state object that are in the view will be bound to the state. This means that any changes in the state will result in a change in the view.

### Components

Components are fragments of HTML that can be reused inside the main view. They are created in exactly the same way the view template is created, using the `html` function. For example

To insert a component inside a view (or even another component), use the 

## Transformers

Transformer functions tell Nanny State how the state should be changed. They are passed to the `Update` function as an argument. This is the *only* way the state can be updated.

A transformer function accepts the current state as an argument and then returns a new state, as shown in the diagram below:

<div align="center">

![Transformer function diagram](https://user-images.githubusercontent.com/16646/125978502-29d3f173-626a-48b1-8214-5368f1fe7824.png)

</div>

Transformer functions must be pure functions. This means that they should have *no side effects* and always return the same value given the same arguments.

The current state is always the only parameter of a transformer function, meaning they take the following form:

```javascript
state => newState
```

If the transformer function requires any other parameters, they are passed to another intermediate function, like so:

```javascript
state => params => newState
```

The return value of a transformer function doesn't have to be a new representation of the whole state. It can be a fragment of the state, that contains only the properties that have changed.

When constructing a transformer function, the best way to think about it is as a mapping from the current state to a new state. If you start with the current state, how do you want it to change to get the new state?

For example, say the current state looks like this:

```javascript
{
    count: 8,
    message: "Hello World!"
}
```

If we want to write a transformer function called `shout` that makes the value of the 'message' property upper-case. This function needs to accept the current state and return an object where the 'message' propery is written in upper-case. The following function is an example of how this can be done:

```javascript
const shout = state => ({ message: state.message.toUpperCase() })
```

Notice that we only needed to return an object containing the 'message' property, as this was the only property that has changed. We don't need to refer to the 'count' property at all.

The following code would update the state:

```javascript
Update(shout)
```

Now say we want another transformer function that increases the value of the 'count' propery by a given value that is provided as an argument. We could use the following transformer function:

```javascript
const countBy = state => number => ({ count: state.count + number})
```

To update the 'count' property by 5, using this transformer function, we would use the folloing code:

```javascript
Update(countBy,5)
```


## Putting It All Together

These 3 parts work in sequence to dynamically update the application.

A variable called `State` is created that describes the initial state.
This is passed to the `Nanny` function, which renders the view based on the initial state and returns the `Update` function.

As a user interacts with the page, the following process is repeated over and over:

1) The `Update` function is called with a transformer function as its argument.
2) The state is updated based on the return value of the transformer function.
3) The view is re-rendered using the updated value of the state.

<div align="center">
  
![Nanny State data flow diagram](https://user-images.githubusercontent.com/16646/125978059-95ed42bb-5676-484a-8391-fa73d20280a0.png)

</div>
