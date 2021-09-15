# React Widgets

To practice using React hooks, let's reexplore the widgets application that you 
created with class components last week. You'll be building the same clock
widget, an interactive folder widget, a weather widget, and a simple search 
input component as you did before, but you'll use hooks instead of life cycle
methods and component state. We'll also refactor the folder widget to utilize
Routes to determine the current tab.

By the end of this project, you will:

- Review how to set up a new React project;
- Be able to use useState to track component state in a functional component;
- Be able to use useEffect to trigger functionality previously only possible 
with lifecycle methods and class components;
- Know how to incorporate an API into your app; and
- Be able to add basic styling to React components.

## Phase 1: Setup

The initial setup for this application will be exactly the same as our previous
implementation of the Widgets app.

Generate a new React application called "Widgets" with [create-react-app] by
running `npx create-react-app widgets --template @appacademy/simple`. Note how
you are using a custom template to generate your React application.

Once your project has been initialized, in the `index.js` file you'll see that
`ReactDOM` is rendering a `<React.StrictMode>` component. [StrictMode] simply
means that additional checks and warnings will be made in development mode. It's
a helpful tool that highlights potential problems.

```js
// index.js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Let's rename the rendered `App` component to be a component named `Root`. Make
sure to update where you have imported `App` and to update the `App.js` file
name to `Root.js`.

The `Root` component should be a function component. For now, have your `Root` component
return an empty `<div>`. You will fill this in with your widget components as
you create them. At this point, your `Root.js` file should look something like
this:

```js
import React from 'react';

const Root = () => (
  <div>

  </div>
);

export default Root;
```

## Phase 2: Clock Widget

The clock component should display the current date and time, updating every
second. Start by creating a new file `Clock.js` in your `src` folder importing
`React` into the file. Define your `Clock` component as a function (all of your
components today will be functions!). You will import your `Clock`
component into your `Root.js` file and incorporate it into the return value of
your `Root` (nest it inside of the `div` that you set up previously).
This is the pattern you will follow for all the widgets.

With functional components, whatever we return from our function will be
rendered to the DOM. For now, let's have our Clock component display an `<h1>`
element with the content "Clock". Check to see that we've properly exported our
component and imported into Root by loading up your browser. You should see your
"Clock" header on the page.

In our previous version of this application, we used class components in order
to keep track of a component's state in the constructor as well as utilize life-
cycle methods such as `componentDidMount` and `componentWillUnmount`. We can
achieve the same functionality using hooks!

From the `react` library, import the `useState` and `useEffect` hooks, in addition to your standard React import.

```js
import React, { useState, useEffect } from 'react';
```

Let's set up a hook to track the current time for our clock. The `useState` function takes in one argument and will return an array of two important
elements. The first element that is returned in this array is a reference to the
current value of the item we are creating state for. The second element is a
function that we can use to update this value, similar to the `setState`
function that we used with class components. Finally, the argument that we pass
in will be the initial value for this item.

At the begining of our `Clock` function, set up a `useState` hook. We want to
track the time, keep a reference to the function that will set the time (in
order to update at regular intervals), and set up an initial value of the
current time. We can accomplish all of this with one line like so:

```js
const [time, setTime] = useState(new Date());
```

With this line, we now have a location to store our current time, we set up an
initial value for it, and we captured a reference to the function that we'll
invoke to update the time.

Let's now set up our `useEffect` function. Our `useEffect` will take in a
callback function as well as an optional array of dependencies for when we would
like to execute this function. Set up a placeholder invocation like so:

```js
useEffect(() => {
  // We'll implement functionality here
}, []);
```

Inside of our callback function, we would like to do a couple of things.
* First, we would like to set up a function that will set the time that we are
tracking in our state to a `new Date()`, updating our time to be current. We can
call this function `tick`.
* Second, we want to set up an interval that will invoke this function every
second. We can use a standard `setInterval`, passing in our `tick` function and
a time of `1000` (measured in milliseconds). Make sure to capture a reference
to the return value of `setInterval`, which we'll use next.
* Third, the callback we pass to `useEffect` can return a reference to a
function. If it does, this function will be used as cleanup. We can think of
this functionality as very similar to our `componentWillUnmount` for class
components. Since we don't want to have our interval running if our component
leaves the page, return a new function that will invoke `clearInterval` with a
reference to the interval that we just created.
Overall, our `useEffect` should look something like this:

```js
useEffect(() => {
  function tick() {
    setTime(new Date());
  }
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval);
}, []);
```

You'll notice that our second argument, the dependency array, is still empty.
The array indicates we are only executing this function (1) when the component
mounts on the page, and (2) when the value of an element has changed. By keeping
our array empty, the callback function will be executed only one time, when our
component is created. We only need to set up the interval to update our
time when our component is first mounted on the page. If we did not provide this
empty array, the callback function would be executed every time our component
rendered.

Before your return, create variables for the `hours`, `minutes`, and `seconds`
that we'd like to display. Check out all of the [Date object] methods you can
use to display the date and time in a human-readable string. Doing this
formatting before our return statement allows us to simply interpolate these
variables in the JSX.

### Styling

You'll notice that you have an `index.css` file already imported into your entry
`index.js` file. Create and include a `reset.css` file before the line to import
your `index.css` file.

Feel free to use the following CSS reset file template:

```css
/* reset.css */

a, article, body, button, div, fieldset, footer, form, h1, h2, header, html, i, img, input, label, li, main, nav, p, section, small, span, strong, textarea, time, ul {
  background: transparent;
  border: 0;
  box-sizing: inherit;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  text-align: inherit;
  text-decoration: inherit;
  vertical-align: inherit;
}

ul {
  list-style: none;
}

img {
  display: block;
  height: auto;
  width: 100%;
}

button, input[type="email"], input[type="password"], input[type="submit"], input[type="text"], textarea {
  /*
  Get rid of native styling. Read more here:
  http://css-tricks.com/almanac/properties/a/appearance/
  */
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

button, input[type="submit"] {
  cursor: pointer;
}
```

Now go to [Google Fonts] and select a nice font for your clock. In the
`public/index.html` file, update your page to have a `title` of "Widgets". Now
take the font embed code and paste it into the `<head>` of your page.

Your `index.html` file should look something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron" rel="stylesheet">
    <title>Widgets</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

To use the font, set the `font-family` of your element to the font name in your
`index.css` file.

Set the time and date headers to be on one side and the actual time and date to
the other. You can achieve this easily with a flexbox. Take a look at the
[`justify-content`] property. Which one do you want to use? Try all of them to
understand what they do.

Add a background. Use the `background` or `background-color` property to change
the background. Feel free to do this for every widget.

You should now have a clock that displays the current time and date. You used
`setInterval()` to make sure that the clock updates every second, and
`clearInterval()` to clear the timer that `setInterval()` set. Once you have
sufficiently styled your clock, move on to the next widget.

## Phase 3: Folder Widget

You're going to add a folder widget that the user can interact with. The folder
tabs should each be labeled with their own title. The selected tab should be in
a **bold** font. Below the tab, display the contents of the selected tab. The
folder content should update when the user selects different tabs.

Unlike our original implementation of this widget, we are going to utilize
`NavLink` and `Route` components. This will allow a user to navigate directly to
a URL and have the content of that folder already displayed.

Make a `Folder` component. `Root` should pass the `Folder` component a `folders`
prop. The prop should be an array of JavaScript objects that each have `title`
and `content` as properties:

**Folder component**

```js
<Folder folders={folders} />
```

**Folders prop**

```js
const folders = [
  {title: 'one', content: 'I am the first'},
  {title: 'two', content: 'Second folder here'},
  {title: 'three', content: 'Third folder here'}
];
```

In our `Folder.js` file, make sure to import React as well as several items from
`react-router-dom`: `{ BrowserRouter, Switch, Route, NavLink }`

Remember that our `Folder` function was passed a `folders` prop, so remember to
capture this argument. Our component will not need to track any state or use any
hooks, we are simply navigating to new routes and rendering content based on the
path. Because of this, we can start a return statement right away within this
function.

We would like to use Routes within this component. We haven't set up a router
for our app overall, so let's set that up for this component specifically. So
far our component should look something like this:

```js
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

function Folder(props) {
  return (
    <BrowserRouter>
      {/* Our Folder component will be built out here */}
    </BrowserRouter>
  )
}

export default Folder;
```

Our `BrowserRouter` can only return one element, so let's set up a `<div>` that
will house the rest of our component. Create an `<h1>` to label our "Tabs", then
another `<div>` for our content. 

Inside of this inner `<div>` we have two main goals. We want to create a list of
`NavLink`s in order to show the title of each folder and link to that specific
page. We also then want to create `Route`s for each of the folders in order to
display the content.

Make a `<ul>` that will house these `NavLink`s and a `Switch` that will house
the `Route`s:

```js
function Folder(props) {
  return (
    <Router>
      <div>
        <h1>Tabs</h1>
        <div className='tabs'>
          <ul className='tab-header'>
            {/* create an li to house a NavLink for each folder */}
          </ul>
          <Switch>
            {/* create a Route for each tab path */}
          </Switch>
        </div>
      </div>
    </Router>
  )
}
```

In order for us to make create links for each component, `map` over your
folders, returning an `<li>` with a unique `key` that houses a `NavLink`. Your
`NavLink` should take the user to `/tabs/theTitleOfThisFolder` and should show
that same title as the content of the link. Remember to use interpolation to
include these values for each folder dynamically within your `map` function.

To show the content of each folder, we'll similarly want to map over our folders
within our `Switch` component. Instead of returning a `NavLink`, we can return a
`Route`. Be sure to include a `path` (matching the `/tabs/theTitleOfThisFolder` 
links that we made earlier) and unique `key` on the `Route`. Within the `Route`
we can render a simple div that has the content of each folder's `content`
property.

```js
<Switch>
  {props.folders.map(folder => {
    return (
      <Route path={`/tabs/${folder.title}`} key={folder.title}>
        <div className='tab-content'>
          {folder.content}
        </div>
      </Route>
    );
  })}
</Switch>
```


### Styling

Feel free to style your `Folder` component by adding the CSS below into your
`index.css` file. Play around with the styling a bit if you'd like. Notice that
with this implementation, our `active` class is on the nested `<a>` from our
`NavLink` which may be different compared to our first implementation of this
widget.

```css
/* Folder */
.tab-header {
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
}

.tab-header > li {
  width: 33%;
  border-top: 2px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 2px solid black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  cursor: pointer;
  background-color: lightpink;
}

a {
  padding: 5px;
  display: block;
}

.tab-header > li:first-child {
  border-left: 2px solid black;
}

.tab-header > li:last-child {
  border-right: 2px solid black;
}

.tab-header > li:hover {
  background-color: lightblue;
  color: white;
}

.tab-header > li > a.active {
  font-weight: bold;
}

.tabs {
  width: 240px;
}

.tab-content {
  font-weight: bold;
  color: white;
  height: 192px;
  margin: 0 20px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
}
```

## Phase 4: Weather Widget

In this phase, you will create a weather widget to display the current weather
based on the user's location. You will be using the `navigator.geolocation` API
to get the user's current location, and the OpenWeatherMap API to get the
current weather.

Make a `Weather` component, which again, will be incorporated into your `Root`
component. Create a `useState` hook for your weather, capturing the `weather` reference and `setWeather` function. Set the initial value of the weather to be `null`:

```js
const [weather, setWeather] = useState(null);
```

Review the [OpenWeatherMap API] documentation. You'll use this API to get the
weather based on your current location (it is recommended to fetch the weather
by geographic coordinates). Upon a successful fetch, you'll update your
component's state.

In order to get the API to accept your HTTP requests, you'll need an API key.
[Read up on how to use the API key and sign up for one here.][api-key] After
signing up, click on the API keys tab to get your key. You may need to open
their welcome email before the API key will work.

In the real world, you should be very careful about placing API keys in frontend
JavaScript or anywhere else they are publicly available and can be scraped (this
includes public Git repositories). Stolen keys can cost you. _You have been
warned._

Now let's get your current location! Create a `useEffect`hook that will only run
when our component mounts. In the callback, call
`navigator.geolocation.getCurrentPosition()` to get your current location. Read
through the [navigator documentation] to figure out how to use this method
properly. (Make sure you have [location services enabled] in your browser, or
this won't work.)

From reading the documentation, you know that there are two methods to access a
browser's location data:
  - `getCurrentPosition()`
  - `watchPosition()`

Let's look at the [documentation][getCurrentPosition] for the
`getCurrentPosition()` method to find out more about its expected parameters.
You should see a **Syntax** portion on the documentation with the method
breakdown below:

```js
navigator.geolocation.getCurrentPosition(success[, error[, [options]])
```

You'll also see that there is a **Parameters** section below that outlines a
mandatory `success` callback function, an optional `error` callback, and an
optional `options` object. In documentation, square brackets around a parameter
indicates that it is an optional parameter.

Now let's test the `getCurrentPosition()` method in your developer tools
console. Console log a result as the method's `success` callback like so:

```js
const success = (res) => console.log(res);
navigator.geolocation.getCurrentPosition(success);
```

You should have received a request to share your location with the browser! Upon
allowing the browser to know your location, you should console log a
`GeolocationPosition` object when invoking the method again in the console:

```js
navigator.geolocation.getCurrentPosition(success);
```

Begin by invoking the `getCurrentPosition()` method in your `Weather`
component's `useEffect`. Upon successfully retrieving your
browser's location, you'll invoke a success callback to query the weather API.

Let's create your success callback! Before your call to `getCurrentPosition`,
create an asynchronous `pollWeather()` function to take in your `location`
argument. You'll use the `latitude` and `longitude` of your location to make a
fetch call to the weather API. Think of how to extract the `latitude` and
`longitude` properties from your `GeolocationPosition` object. Also think of how
you might structure your fetch URL to include the query parameter for your
geographic coordinates.

Navigate to the `By geographic coordinates` section in the [OpenWeatherMap API]
documentation. You'll see an example of an API query string using latitude and
longitude coordinates
(`api.openweathermap.org/data/2.5/weather?lat=35&lon=139`). You'll also see an
example JSON response below.

You can define a `toQueryString()` helper method to format your query parameters
into a fetch call URL. To think of scaling your "Widgets" project, you can move
this helper function into a `utils.js` file so that it can be used for other
APIs you might incorporate! Have the function take in a `params` object. You'll
then iterate through the object to sanitize each query value with
[encodeURIComponent()]. You can then return a query string like `lat=35&lon=139`
to build an example API query string above.

In your `pollWeather()` method, use the [Fetch API] to make a fetch call to the
OpenWeatherMap API. Remember to parse your response as JSON before updating the
`weather` state with `setWeather`. Use your component's `weather` state to
render the current city and temperature on the page.

By default, the OpenWeatherMap API will return the temperature in Standard units
(Kelvin). Convert to Fahrenheit **OR** peruse the API docs for a way to request
the weather in Imperial units (Fahrenheit)! Give the weather box a nice border
and make sure the elements inside are spaced evenly.

Great work! Now you have three widgets. One that displays the time, another that
allows you navigate folder tabs, and another that displays the weather. You used
the `navigator.geolocation` API to get your current location, which you then
passed to your fetch request to get the weather from the OpenWeatherMap API.

## Phase 5: Autocomplete Widget

Make an `Autocomplete` component that filters a list of names by the user's
input. Match only names that start with the search input. When a user clicks on
a name, the input field should autocomplete to that name. Create a new file
`Auto.js` and define your `AutoComplete` component there. Incorporate it into
`Root`.

Because your autocomplete widget should be reusable, you shouldn't hard code a
list of names into the component. Instead of hard coding the names, set up your
`Autocomplete` component to accept `names` as a prop. Then set the component's
initial state for `inputVal` as an empty string. Remember to also capture a
reference to the function that will allow us to update this value.

Build your widget in the `return` section of your function. It should contain an
input field and an unordered list. Render an `<li>` inside the `<ul>` for every
name that begins with the value in the input box. Remember to pass your
[unique `key` property][react-keys] to each `<li>`!

When a user types something into the input, use an `onChange` event handler to
update inputVal (remember to use your function that was captured previously!).

Also add an `onClick` handler to the unordered list. The role of this click
handler is to update the widget's search string (the `inputVal` state) upon a
user's click of the `<li>` element you've created for each name. You will need
to turn your `<input>` into a [controlled component] for this to work, so assign
the `value` of the input to be equal to your `inputVal`. Would you access the
event's [currentTarget] or [target]? Remember to use `setInputVal()` to update
the widget's search string.

Now you'll want to find the names that match your user's search input. Let's
utilize another `useState` call (we can have multiple!) to track the `matches`.
Initialize your `matches` to an empty array and capture the function the update
this value.

Define a `useEffect` that will allow us to update our `matches`. Within this
callback, check to see if we have input in our text field. If we do, filter the
array of names to those that start with our `inputVal` and call our `setMatches`
to update this array. If we do not have any input, set our matches to be the
entire contents of our names array (we want to show all of the names if we
aren't filtering).

This `useEffect` will be slightly different compared to our previous components
because we want to run this callback function multiple times. Every time our
`inputVal` changes we want to be able to change our `matches`. In order to
accomplish this, include `inputVal` in the dependency array, the second argument
to `useEffect` instead of just using an empty array like we did previously.

### Styling

Give your component a border and make sure all the `<li>` elements are nicely
padded inside the box. Change the `cursor` property to display a pointer when
hovering over one of the `<li>` elements. Center all your widgets using
flexboxes. Which `justify-content` property would you use for this?

Great job! The autocomplete widget uses an event handler to update the state of
the component when letters are typed into the input field.

[create-react-app]:
  https://github.com/facebook/create-react-app

[StrictMode]:
  https://reactjs.org/docs/strict-mode.html

[Date object]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

[Google Fonts]:
  https://fonts.google.com/

[`justify-content`]:
  https://css-tricks.com/almanac/properties/j/justify-content/

[api-key]:
  http://openweathermap.org/appid

[clearinterval]:
  http://stackoverflow.com/questions/5978519/setinterval-and-how-to-use-clearinterval#answer-5978560

[componentdidmount()]:
  https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount

[componentwillunmount()]:
  https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount

[bad-practice-arrow-functions]:
  https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md

[handle the event]:
  https://reactjs.org/docs/handling-events.html

[navigator documentation]:
  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation

[location services enabled]:
  https://support.google.com/chrome/answer/142065?hl=en

[OpenWeatherMap API]:
  http://openweathermap.org/current

[react-keys]:
  https://reactjs.org/docs/reconciliation.html#keys

[encodeURIComponent()]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

[Fetch API]:
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

[controlled component]:
  https://facebook.github.io/react/docs/forms.html#controlled-components

[getCurrentPosition]:
  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

[currentTarget]:
  https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget

[target]:
  https://developer.mozilla.org/en-US/docs/Web/API/Event/target

[React Transition Group]:
  https://reactcommunity.org/react-transition-group/

[ternary conditions]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

[regular expressions]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

[deprecation of `findDOMNode`]:
  https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage

[`React.createRef()`]:
  https://reactjs.org/docs/refs-and-the-dom.html

[merged PR]:
  https://github.com/reactjs/react-transition-group/pull/559

[react-transition-group repository]:
  https://github.com/reactjs/react-transition-group/
