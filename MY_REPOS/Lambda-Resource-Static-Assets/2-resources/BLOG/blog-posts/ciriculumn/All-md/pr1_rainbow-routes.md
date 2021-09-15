# Rainbow Routes Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Today you're going to get our first experience using React Router. The goal is
to create a basic app that displays the colors of the rainbow. This rainbow,
however, has something special about it - some of the colors are nested within
others.

## Phase 0: Setup

Begin by creating a new React project:

```sh
npx create-react-app rainbow-routes --template @appacademy/simple
```

Now you'll remove all the contents of your `src` and all the contents from your
`public` directory to build the application architecture from scratch! After you
have deleted all your files within the directories, create a new `index.html`
file in your `public` folder. Use the `html:5` emmet shortcut to generate an
HTML template. Title your page "Rainbow Routes" and create a `div` with an `id`
of `root` in your DOM's `<body>` element. Create an `index.css` file in your
`src` directory with the following code. Now let's create your entry file!

```css
h4 {
  color: darkblue;
  cursor: pointer;
}

h4:hover {
  text-decoration: underline;
}

#rainbow {
  position: absolute;
  top: 0;
  left: 300px;
}

h3 {
  position: absolute;
  top: 1px;
}

.red {
  background-color: red;
  width: 100px;
  height: 100px;
}

.orange {
  background-color: orange;
  width: 100px;
  height: 50px;
}

.yellow {
  background-color: yellow;
  width: 100px;
  height: 50px;
}

.green {
  background-color: green;
  width: 100px;
  height: 100px;
}

.blue {
  background-color: blue;
  width: 100px;
  height: 100px;
}

.indigo {
  background-color: mediumslateblue;
  width: 100px;
  height: 50px;
}

.violet {
  background-color: darkviolet;
  width: 100px;
  height: 100px;
}

a {
  display: block;
  margin-bottom: 10px;
}
```

Create an `index.js` entry file in the `src` directory. At the top of the file,
make sure to import `React` from the `react` package and `ReactDOM` from the
`react-dom` package. Make sure to also import your the `index.css` file you just
created! This will take care of styling your _rainbow routes_.

Now you can use the `ReactDOM.render()` method to render a `<Root />` component
instead of the DOM element with an `id` of `root`. Lastly, wrap your render
function with a `DOMContentLoaded` event listener, like so:

```js
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.getElementById('root'),
  );
});
```

Let's create your `Root` component right in your entry file! Your `Root`
component will take care of applying your `BrowserRouter` to the application.
Applying the `BrowserRouter` to your `Root` component allows all the child
components rendering within `<BrowserRouter>` tags to use and access the `Route`,
`Link`, and `NavLink` components within the `react-router-dom` package.

```js
const Root = () => (
  // TODO: Apply BrowserRouter
  // TODO: Render rainbow
);
```

Install the `react-router-dom` package:

```sh
npm install react-router-dom@^5.0.0
```

Now import `BrowserRouter` from the `react-router-dom` package, like so:

```js
import { BrowserRouter } from 'react-router-dom';
```

You're going to be rendering a lot of components, so let's keep your `src`
directory organized by creating a `components` directory within. Within your new
`./src/components` directory, create a `Rainbow.js` file for your `Rainbow`
component with the following code:

```js
// ./src/components/Rainbow.js
import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

const Rainbow = () => (
  <div>
    <h1>Rainbow Router!</h1>
    {/* Your links should go here */}

    <div id="rainbow">
      {/* Your routes should go here */}
    </div>
  </div>
);

export default Rainbow;
```

Your `Rainbow` component will act as the home page or default path (`/`) of your
application. Import the `Rainbow` component into your entry file and have your
`Root` component render `<Rainbow />` wrapped within `<BrowserRouter>` tags,
like so:

```js
const Root = () => (
  <BrowserRouter>
    <Rainbow />
  </BrowserRouter>
);
```

Within your `Rainbow` component, you'll be rendering `<NavLink>` and `<Route>`
components to add different navigation paths to different components. Let's
create all the components you will render!

Create files for the following components in your `./src/components` directory:

- `Red`
- `Blue`
- `Green`
- `Indigo`
- `Orange`
- `Violet`
- `Yellow`

Your `Red` and `Blue` components will look something like this:

```js
import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

const Color = () => (
  <div>
    <h2 className="color">Color</h2>
    {/* Links here */}

    {/* Routes here */}
  </div>
);

export default Color;
```

Your `Green`, `Indigo`, `Orange`, `Violet`, and `Yellow` components will look
something like this:

```js
import React from 'react';

const Color = () => (
  <div>
    <h3 className="color">Color</h3>
  </div>
);

export default Color;
```

Now start your server and verify you can see the "Rainbow Router!" header from
your `Rainbow` component. Currently there is no functionality. Let's fix that!

## Phase 1: Routes

As a reminder, wrapping the `Rainbow` component in `<BrowserRouter>` tags makes
the router available to all descendent React Router components. Now open the
`Rainbow.js` file. You're going to render some of your color components from
here. Ultimately you want your routes to look like this.

| URL            | Components                  |
| -------------- | --------------------------- |
| `/`            | `Rainbow`                   |
| `/red`         | `Rainbow -> Red`            |
| `/red/orange`  | `Rainbow -> Red -> Orange`  |
| `/red/yellow`  | `Rainbow -> Red -> Yellow`  |
| `/green`       | `Rainbow -> Green`          |
| `/blue`        | `Rainbow -> Blue`           |
| `/blue/indigo` | `Rainbow -> Blue -> Indigo` |
| `/violet`      | `Rainbow -> Violet`         |

This means that the `Red`, `Green`, `Blue`, and `Violet` components need to
render in the `Rainbow` component, but only when you are at the corresponding
URL. You'll do this with `Route` components. Begin by importing the `Red`,
`Green`, `Blue`, and `Violet` components into your `Rainbow.js` file. Then add
the necessary `Route` components inside the `div` with `id="rainbow"` in the
`Rainbow` component. For example to render the `Red` component with the `/red`
path, you would use the following `Route` component:

```jsx
<Route path="/red" component={Red} />
```

Test that your code works! Manually type in each URL you just created, and you
should see the color component pop up. Remember, these are React Routes, so the
paths you created will come after the `/`. For example, your default rainbow
route will look like `http://localhost:3000/` while your red route will look
like `http://localhost:3000/red`.

You want to nest the `Orange` and `Yellow` components inside the `Red`
component, and the `Indigo` component inside the `Blue` component. Remember to
import your components to use them in a `Route` tag. You'll have to go add the
corresponding `Route` tags to the `Red.js` and `Blue.js` files. Make sure to use
the correct nested paths, such as `"/red/orange"` for the orange `Route`.

## Phase 2: Links

Manually navigating to our newly created routes is tiresome, so let's add
functionality to take care of this process for us. React Router provides the
`Link` and `NavLink` components for this purpose.

Add `Link`s to the paths `/red`, `/green`, `/blue`, and `/violet` in the
`Rainbow` component. For example, your red link should look like

```jsx
<Link to="/red">Red</NavLink>
```

When you are at `blue` you want to be able to get to `/blue/indigo`, and then
back to `/blue`. Add the corresponding `Link`s to the `Blue` component like
this:

```jsx
<Link to='/blue' >Blue only</Link>
<Link to='/blue/indigo' >Add indigo</Link>
```

Similarly, add `Link`s to `/red`, `/red/orange` and `/red/yellow` to the `Red`
component. Test all your links. Navigation is so much easier now!

## Phase 3: NavLinks

It would be nice if our links gave us some indication of which route you were
at. Fortunately, React Router has a special component for that very purpose:
`NavLink`. NavLinks get an extra CSS class when their `to` prop matches the
current URL. By default this class is called `active`.

Go ahead and switch all your `Link`s to `NavLink`s. If you open the app you
won't see any change yet. That's because you haven't added any special styling
to the `active` class. Go ahead and open the `index.css` file. Create an
`.active` class and add the line `font-weight: 700`. Now your active links will
be bold. Isn't that nice!

The only problem is that now the `Blue only` link is active even when the path
is `/blue/indigo`. That doesn't make a lot of sense. Let's add the `exact` flag
to that link so it will only be active when its `to` exactly matches the current
path. Now it should look like:

```jsx
<NavLink exact to="/blue">
  Blue only
</NavLink>
```

Do the same for the `Red only` link. Everything should be working now.

# Phase 4 - Changing NavLink's Active Class

You've already set up `NavLink` to __bold__ the link text using the `.active`
class in `src/index.css`. But what if you wanted this class to be something
else? For instance, what if you want your main color links (Red, Green, Blue,
Violet) to be styled differently when active than your sub-route links (Red
Only, Add Orange, Add Yellow, etc.).

You can set the class that React Router sets to an active `NavLink` by adding
the `activeClassName` prop.

For instance, when we are at a route matching the below `NavLink`'s `to` prop,
the component will have a class of `.parent-active` applied:

```js
<NavLink to="/blue" activeClassName="parent-active" >
  Blue
</NavLink>
```

This allows much more flexibility to style an active `NavLink`!

Using the example above, add an `activeClassName` prop to each of your
`NavLink`s in `src/components/Rainbow.js`. Now, add some CSS styling for that
class in your `src/index.css` to distinguish your main and your sub-route links.

Compare your work to the solution and make sure the behavior is the same. Time
to celebrate! ✨ 🌈 ✨

You can also learn more about using the React Router at [reacttraining.com]!

[reacttraining.com]:
  https://reacttraining.com/react-router/web/guides/quick-start
