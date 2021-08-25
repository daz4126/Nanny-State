# Code Organization

If your application starts to get quite large, then it is possible to use ES6 imports to keep different parts of the application in separate files.

## Separate Views

The most common option is to keep the view in a separate file called 'view.js' when it starts to become too long. Note that this file will also have to contain any transformer functions that are called in the view. Here's a basic example split into 2 files:

index.js:
```javascript
import { Nanny } from 'nanny-state'
import { view } from './view.js'

const State = {
  hello: 'World',
  view
}
export const Update = Nanny(State)
```

view.js
```javascript
import { html } from 'nanny-state'
import { Update } from './index.js'

const hello = event => 
  Update(state => ({ hello: 'Nanny State' }))

export default const view = state => 
  html`<h1>Hello ${state.hello}</h1>
       <button onclick=${hello}>Click Me</button>`
```

[Example on CodeSandbox](https://codesandbox.io/s/nanny-state-import-view-9806y)

Things to note:

* You have to export the `Update` function from 'index.js' and import it in 'view.js'
* You have to export the `view` function in 'view.js' and import it in 'index.js'
* You only have to import the `Nanny` function in 'index.js'
* You don't need to import the 'html' module from 'lit' in 'index.js' but you do have to import it in 'view.js'


## Separate Views & Transformers

Another option is to keep the event handlers and transformers in a spearate file called 'transformers.js':

index.js:
```javascript
import { Nanny } from 'nanny-state'
import { view } from './view.js'

const State = {
  hello: 'World',
  view
}

export const Update = Nanny(State)
```

view.js
```javascript
import { html } from 'nanny-state'
import { hello } from './transformers.js'

export const view = state => 
  html`<h1>Hello ${state.hello}</h1>
       <button onclick=${hello}>Click Me</button>`
```

transformers.js
```javascript
import { Update } from './index.js'

export const hello = event => 
  Update(state => ({ hello: 'Nanny State' }))
```

[Example on CodeSandbox](https://codesandbox.io/s/nanny-state-imports-3wj2f)

## Adding Components

Eventually you might want to break your view up into reusable components and keep them in a separate file. For example, we could extract the code for the button in the previous example into a file called 'components.js':

components.js:
```javascript
import { html } from 'nanny-state'
import { hello } from './transformers.js'

export const button = state => 
  html`<button onclick=${hello}>Click Me</button>`
```

You can then import this component into the 'view.js' file and use it inside the view function using template literal interpolation:

view.js:
```javascript
import { html } from 'lit-html'
import { button } from './components.js'

export const view = state => 
  html`<h1>Hello ${state.hello}</h1>
       ${button(state)}`
```

Note that the `button` component function didn't need state as a parameter and it didn't need to be provided as an argument in the view in this case, although in most cases the state, or a fragment of the state will need to be passed to a component function.

Note also that you would still need to import any transformer functions that were explicitly used in the view code, but in this case the only transformer function was in the component.

[Example on CodeSandbox](https://codesandbox.io/s/nanny-state-import-view-and-transformers-with-component-g1f8r)