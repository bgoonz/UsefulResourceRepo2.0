# React Widgets Project
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Phase 1: Setup](#phase-1-setup)
- [Phase 2: Clock Widget](#phase-2-clock-widget)
  - [Styling](#styling)
- [Phase 3: Folder Widget](#phase-3-folder-widget)
  - [Creating a subcomponent](#creating-a-subcomponent)
  - [Styling](#styling-1)
  - [Using class names to focus](#using-class-names-to-focus)
- [Phase 4: Weather Widget](#phase-4-weather-widget)
- [Phase 5: Autocomplete Widget](#phase-5-autocomplete-widget)
  - [Styling](#styling-2)
- [Bonus Phase: React-Transitions](#bonus-phase-react-transitions)
- [Bonus Phase: Resolving StrictMode Warnings](#bonus-phase-resolving-strictmode-warnings)

<!-- /code_chunk_output -->
________________________________________________________________________________

[**Live Demo!**]

To practice creating React components, you are going to build four simple
widgets. You'll be building a clock widget, an interactive folder widget, a
weather widget, and a simple search input component.

By the end of this project, you will:

- Know how to set up a new React project;
- Be able to create simple React components;
- Know how to incorporate an API into your app; and
- Be able to add basic styling to React components.

## Phase 1: Setup

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

The `Root` component should be a function component because it won't use
internal state or any lifecycle methods. For now, have your `Root` component
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
`React` into the file. Define your `Clock` class to extend from
`React.Component` and remember to export the class. You will import your `Clock`
component into your `Root.js` file and incorporate it into the return value of
your `Root`. This is the pattern you will follow for all the widgets.

Now it's time to create a render method! Have your clock render a "Clock" title
in an `<h1>` element and check that this renders correctly on the page.

In the constructor, set the initial state for the time of your clock using `new
Date()` like so:

```js
this.state = {
  time: new Date()
};
```

Write a method, `tick` that uses `setState` to update the `time` to a `new
Date()`. Remember to define this method using an arrow function or else you'd
need to bind the function in the constructor.

Now you can define a [componentDidMount()] method to initialize the ticking of
your clock. As a reminder, the `componentDidMount()` method is one of the
lifecycle methods. When a component is mounted, the `render()` method will first
return the component's JSX elements. Then `componentDidMount()` will be called.
You can often house your logic to fetch information that updates _state_ in this
lifecycle method.

For the `componentDidMount()` method in your `Clock` component, you'll use
JavaScript's `setInterval()` method to call your `this.tick()` method every
second.

You'll also want to store that interval as a property of the `Clock` class that
you can cancel with `clearInterval()` in [componentWillUnmount()], which gets
called just before the component is removed. Don't store this in the component's
`state` since it doesn't affect the UI. Instead, just store it directly on
`this`, like so:

```js
componentDidMount() {
  this.interval = setInterval(this.tick, 1000);
}
```

In your render method, display the current `hours`, `minutes`, and `seconds`.
Check out all of the [Date object] methods you can use to display the date and
time in a human-readable string.

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
the other. Refer to the live demo to see what your end goal is. You can achieve
this easily with a flexbox. Take a look at the [`justify-content`] property.
Which one do you want to use? Try all of them to understand what they do.

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

Keep track of the selected tab's index in your `Folder` component's state. Set
the `Folder` component's default `currentTab` state to zero.

In the render method, return an `<h1>` element with the title of "Folder".
You'll begin by rendering one folder's content, using the `currentTab` state to
select which folder content to render.

Render a `<div>` element with two child elements: a header to render folder
titles (you'll make a `<Header>` subcomponent) and a `<div>` element to render
the selected tab's content. Define a `folder` variable by indexing into your
`folders` prop with your `currentTab` state. This way you can reference your
selected folder's content with clean code!

At this point, your component's `render()` method should look something like
this:

```js
render() {
  const folder = this.props.folders[this.state.currentTab];

  return (
    <div>
      <h1>Folder</h1>
      <div className='tabs'>
        {/* TODO: render folder titles */}
        <div className='tab-content'>
          {folder.content}
        </div>
      </div>
    </div>
  );
}
```

Take a moment to observe the syntax for making a comment inside of JSX. If you
use VS Code's keyboard shortcut (`cmd + /`) to comment, you will not make a
valid comment. You need to use block comment syntax wrapped in curly braces in
order to write comments in JSX!

Remember that JSX interpolation is just syntactic sugar and that it only
supports _expressions_, so you also can't use `if`/`else` inside `{ }`. However,
[ternary conditionals] are valid inside JSX interpolation.

Now create a `selectTab()` method that takes in a selected folder index. You'll
use this method to update the `currentTab` state with the input index. For now,
have the method console log the index input.

```js
selectTab = (idx) => {
  console.log(idx)
}
```

Let's move forward with rendering the folder titles!

### Creating a subcomponent

Let's create a `Headers` subcomponent to render your folder titles! Within your
`Folder.js` file, create a subcomponent above your `Folder` class. This
subcomponent will take care of rendering an unordered list of list items
containing clickable tabs.

Plan what information you want to pass as props from your `Folder` component
into your `Headers`. You'll want to render each tab's title, so you'll probably
want to thread a `titles` prop from your `Folder` component. Map over your array
of `folders` to define a `titles` array of folder titles. Now thread your
`titles` array as a prop to the `Headers` subcomponent. As a reminder,
"threading props" simply refers to passing props from one component to another.

You also want to pass the `currentTab` state so that the `Headers` component can
know which tab to render with different CSS as selected or active.

Lastly, you'll want your `Headers` component to be able to use the `selectTab()`
method you have defined in order to update the tab's `currentTab` state.

Your `Folder` component should render the `Headers` subcomponent below:

```js
<Headers
  titles={titles}
  currentTab={this.state.currentTab}
  selectTab={this.selectTab}
/>
```

Now let's dive into what your `Headers` component should render. Begin by
returning an unordered list:

```js
const Headers = (props) => {
  return (
    <ul className='tab-header'>

    </ul>
  );
}
```

Instead of taking in a `props` argument and referring to all your props like
`props.folders` or `props.currentTab`, you can destructure the props you have
received like so:

```js
const Headers = ({ titles, currentTab, selectTab }) => {
  return (
    <ul className='tab-header'>

    </ul>
  );
}
```

Now map your folder `titles` to list item elements that render each folder's
`title`. You'll need to pass a [unique `key` property][react-keys] to each
`<li>` or React will grumble to all your console-reading users about its unfair
working conditions. "How is one supposed to efficiently diff the DOM when one
doesn't even know which list items match up with which!?"

```js
const Headers = ({ titles, currentTab, selectTab }) => {
  return (
    <ul className='tab-header'>
      {titles.map((title, idx) => {
        return (
          <li key={idx}>
            {title}
          </li>
        );
      })}
    </ul>
  );
}
```

To clean up your return, you can extract your list elements as a `tabs`
variable:

```js
const Headers = ({ titles, currentTab, selectTab }) => {
  const tabs = titles.map((title, idx) => {
    return (
      <li key={idx}>
        {title}
      </li>
    );
  });

  return (
    <ul className='tab-header'>
      {tabs}
    </ul>
  );
};
```

Now add an `onClick` handler to each list item to update the `currentTab` state
in the `Folder` component. You'll also want to set the `id` of the `<li>`
element to each title's index. You can then reference the index through
`e.target.id` to use in the `selectTab()` function.

You might ask why not just preset an argument with an arrow function callback
directly in the `onClick`. It is actually bad practice to do so! Feel free to
read more [here][bad-practice-arrow-functions]. In this case, it's better to
[handle the event] and invoke the `selectTab()` function within the click
handler.

```js
/* BAD PRACTICE */
return (
  <li key={idx} id={idx} onClick={() => selectTab(idx)}>
    {title}
  </li>
);

/* GOOD PRACTICE */
return (
  <li key={idx} id={idx} onClick={handleClick}>
    {title}
  </li>
);
```

Define a `handleClick()` function in your `Headers` component. Reference the
folder's index through `e.target.id` and parse the `id` into an integer to
invoke the `selectTab()` function:

```js
const handleClick = (e) => {
  const idx = parseInt(e.target.id, 10);
  selectTab(idx);
}
```

At this point, test your click handler. Click your folder titles and open your
developer tools console. You should see the logging of clicked folder indices.
After you have confirmed your click handler is working, update your
`selectTab()` function to set the `currentTab` state using its input.

```js
selectTab = (idx) => {
  this.setState({ currentTab: idx });
}
```

### Styling

Before you move forward to focusing on a specific tab, add some styling to make
your `Folder` widget look like folders with tabs! Add a border around each tab
and use `border-radius` to add nicely curved corners to the top of your tabs.

Use a flexbox to ensure that the tabs all take up the same amount of space. Add
`display: flex` to your CSS for your folder tabs. Center the folder content,
both horizontally and vertically.

Add a hover effect to change the background color of the tab that's being moused
over. Change the `cursor` to be a `pointer` when you're mousing over the tabs to
make it clear that the tabs are interactive.

### Using class names to focus

Now let's be able to focus on a specific tab! At this point, you should have a
widget that displays the content of all your folder tabs.

In your `Headers` subcomponent, you'll want to assign an `active` class to your
selected tab. The selected tab's label should be bold and the folder content
should update when a different tab is selected. Within the mapping of your
header `titles`, you can compare the `idx` of each title to the folder's
`currentTab` state to decide whether a list item should have the CSS class name
of `active`.

For example, you can use a ternary operator to assign a `headerClass` variable
like this:

```js
const headerClass = (idx === currentTab) ? 'active' : '';
```

Feel free to restyle your `Folder` component by adding the CSS below into your
`index.css` file. Play around with changing the `.tab-header > li.active` class
styling to manipulate the styling of your selected tab!

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
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background-color: lightpink;
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

.tab-header > li.active {
  color: white;
  font-weight: bold;
  background-color: lightblue;
  border-bottom: 0px;
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
component. Now set your component's default state with a `null` weather object
in your constructor, like so:

```js
this.state = {
  weather: null
};
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

Now let's get your current location! When the component mounts, call
`navigator.geolocation.getCurrentPosition()` to get it. Read through the
[navigator documentation] to figure out how to use this method properly. (Make
sure you have [location services enabled] in your browser, or this won't work.)

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
component's `componentDidMount()` method. Upon successfully retrieving your
browser's location, you'll invoke a success callback to query the weather API.

Let's create your success callback! Create a `pollWeather()` method to take in
your received `location` result from
`navigator.geolocation.getCurrentPosition()`. You'll use the `latitude` and
`longitude` of your location to make a fetch call to the weather API. Think of
how to extract the `latitude` and `longitude` properties from your
`GeolocationPosition` object. Also think of how you might structure your fetch
URL to include the query parameter for your geographic coordinates.

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
`weather` state. Upon a successful fetch, update your component's `weather`
state with the `weather` property of your JSON response! Use your component's
state to render the current city and temperature on the page.

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
`Auto.js` and define your `Autocomplete` class there. Incorporate it into
`Root`.

Because your autocomplete widget should be reusable, you shouldn't hard code a
list of names into the component. Instead of hard coding the names, set up your
`Autocomplete` component to accept `names` as a prop. Then set the component's
initial state for `inputVal` as an empty string.

Build your widget in the `render` method. It should contain an input field and
an unordered list. Render an `<li>` inside the `<ul>` for every name that begins
with the value in the input box. Remember to pass your [unique `key`
property][react-keys] to each `<li>`!

When a user types something into the input, use an `onChange` event handler to
update the widget's state. Create a `handleInput()` event handler method to
update the state of `inputVal` with the typed input value.

Also add an `onClick` handler to the unordered list. The role of this click
handler is to update the widget's search string (the `inputVal` state) upon a
user's click of the `<li>` element you've created for each name. You will need
to turn your `<input>` into a [controlled component] for this to work. Would you
access the event's [currentTarget] or [target]? Remember to use `setState()` to
update the widget's search string.

Now you'll want to find the names that match your user's search input. Define a
`matches()` method to generate an array of name `matches` based on the
`inputVal` state. Since you're taking in user input, think of how you could use
[regular expressions] to match the character combinations between your user's
input string and the list of searchable names. If the input is empty, return the
original, full list of names so that your user can see all the searchable names!

Now let's generate the name matches! Iterate through each name. You'll use the
length of `inputVal` to slice a segment of each name. Compare the name segment
with the input value. Take into consideration that some users might type
"barney" instead of searching for "Barney".

For example, compare the name segment to the input value in order to match a
search input of "bar" to the "bar" segment of "Barney". Then you could add the
name, "Barney", to your `matches` array. On the next iteration, the "bar" input
would also match to "Barbara" so that you could add "Barbara" to the `matches`
array.

If you have no matches, you can add a "No matches" string to your `matches`
array so that when `matches` is returned and rendered, your user will be
notified upon searching for a name without matches.

### Styling

Give your component a border and make sure all the `<li>` elements are nicely
padded inside the box. Change the `cursor` property to display a pointer when
hovering over one of the `<li>` elements. Center all your widgets using
flexboxes. Which `justify-content` property would you use for this?

Great job! The autocomplete widget uses an event handler to update the state of
the component when letters are typed into the input field. Once the autocomplete
widget is sufficiently styled, move on to the bonus phase to make your widgets
even better.

## Bonus Phase: React-Transitions

Right now, in the autocomplete widget, the matched names instantly appear on the
screen and the filtered names instantly disappear. This is abrupt and ugly. You
want the names to fade out or in when they are entering or leaving the page. How
can you achieve that with React? With [React Transition Group]!

First you need to import the `CSSTransition` module into your project. In the
console, run `npm install react-transition-group@^4.0.0 --save`.

Then you need to import the module in the file. At the top of `Auto.js`, write
`import CSSTransition from 'react-transition-group';`.

In your `render` method, you will need to wrap the group of elements that will
be entering and leaving the screen with the `<TransitionGroup>` element. In the
case of the autocomplete widget, wrap the results rendered as `<li>`, within the
`<ul>`. **You are not wrapping each individual `<li>`, but rather the entire
group.**

Now you'll need to wrap each individual `<li>` with a `<CSSTransition>` element.
Move the list item's `key` to the `<CSSTransition>` element.

`<CSSTransition>` has three necessary attributes. Read what they are below and
make sure to include them:

`classNames`: This is the name that's used to create all of the transition
classes. For now, let's set this to `"result"`, but you can pick any name you
like.

`timeout`: Specifies how long (in ms) the transition should last. This prop
takes in an object with two keys (`timeout={{ exit: exitNumber, enter:
enterNumber }}`).
  * `enter`: Length of the transition when the element enters. This needs to be
    a number, so you'll have to interpolate the JavaScript number, otherwise
    it'll be read as a string. (i.e `{500}` instead of `500`).
  * `exit`: Same as above, except for when an element is leaving the page.

Finally the CSS. Create a new CSS file and paste in the code below. Be sure to
import your new CSS file into your entry `index.js` file so the transitions are
applied.

The CSS below assumes you've given the `classNames` attribute to `result`. If
you gave it a different name, just replace every `result` with the name you
gave.

```css
/* AutoComplete */

.result-enter {
  opacity: 0.01;
  transform: translateY(500%);
}

.result-enter.result-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms, transform 500ms;
}

.result-exit {
  opacity: 1;
  transform: translateY(0);
}

.result-exit.result-exit-active {
  opacity: 0.01;
  transform: translateY(500%);
  transition: opacity 500ms, transform 500ms;
}
```

Go play with the widget! You'll notice that when names appear, they fade in from
the bottom. When they leave, they fade out and fall to the bottom. Let's break
down the CSS file:

`.result-enter`: Specifies the initial state of an element that is entering the
page. Since I want the names to start invisible and at the bottom, I've given it
the `opacity` and `transform` properties the appropriate values.

`.result-enter.result-enter-active`: Specifies the final state of an element
that has entered the screen. Looking at the CSS, you can see that I expect the
element to be completely opaque and in it's original y-position when it is done
entering. This is where you also specify the `transition` property.

`.result-exit`: Specifies the initial state of an element that is leaving the
page. In almost all cases, the values of this class with match the values in the
`result-enter.result-enter-active` class.

`.result-exit.result-exit-active`: Specifies the final state of an element that
has left the screen. This is where you also specify the `transition` property.

Play around with the CSS file. What kind of interesting transitions can you
create?

## Bonus Phase: Resolving StrictMode Warnings

Check out your new transition in the browser. Open up your developer tools and
type something in the "Autocomplete" search input. Your transitions are working,
but wait - you have a warning in the console!

> Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an
> instance of CSSTransitionGroupChild which is inside StrictMode. Instead, add a
> ref directly to the element you want to reference. Learn more about using refs
> safely here: https://fb.me/react-strict-mode-find-node

This is an example of how [StrictMode] is a helpful tool that highlights
potential problems. In this case, `StrictMode` is giving you helpful information
about the [deprecation of `findDOMNode`], which is used under the hood. You are
also given a clickable link to the official React documentation!

According to the documentation, `findDOMNode` is used "to search the tree for a
DOM node given a class instance." Now is your chance to practice going through
the official React documentation and learning from reading a [merged PR] in the
official [react-transition-group repository]! Take a moment to read through the
[merged PR] to see real-life discussion about implementing the `nodeRef` feature
as an alternative to having React use `findDOMNode` under the hood.

In your constructor method, create a ref with [`React.createRef()`] and use the
ref to assign a `nodeRef` prop to the `<CSSTransition>` that wraps your result
items. Doing this will allow React to reference the `<CSSTransition>` component,
without using the deprecated `findDOMNode` method to search through the tree for
the component. Since React is no longer using `findDOMNode` under the hood,
using a `nodeRef` will remove the warning in the developer tools console.

Congratulations! You have just read through official documentation. In the
future, you may contribute to an open-source or community managed project, just
like how the use for the [merged PR] did! Don't be discouraged by reading live
discussion in GitHub issues and pull requests. You'll continue building your
foundation of React knowledge and before you know it, you might even be
contributing to projects yourself!

[**Live Demo!**]:
  https://appacademy.github.io/curriculum/widgets/

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
