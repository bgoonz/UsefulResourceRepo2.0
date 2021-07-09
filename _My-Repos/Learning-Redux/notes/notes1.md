# Objective 1 - explain what Redux is and the problem it solves: WEB43 - 3.2

> Redux is a predictable state management library for JavaScript applications and is the most popular State container for React applications. By now, we have discovered that building out applications using React requires a lot of forethought to give an application scalability. Specifically, we have noticed some complications around the area of state-management. You may have asked yourself a question like "Which of my components should have state vs. which of my components should just be a way to present some DOM elements?"

## Overview

Redux is a predictable state management library for JavaScript applications and is the most popular State container for React applications. By now, we have discovered that building out applications using React requires a lot of forethought to give an application scalability. Specifically, we have noticed some complications around the area of state-management. You may have asked yourself a question like _"Which of my components should have state vs. which of my components should just be a way to present some DOM elements?"_

Luckily you're not alone in this dilemma. In fact, the Facebook team that built React in the first place noticed that managing state could become a nightmare at scale were they only to use component state. So, they built a pattern, and said, "everyone here at Facebook is going to write code after this pattern." This way, they could eliminate many of the problems that unwieldy state-full components could surface. That pattern was called `Flux` [link to docs (Links to an external site.)](https://facebook.github.io/flux/docs/overview.html), and it's primary use case was to add some stringency to the React ecosystem because by itself, React is very unopinionated in how one should be designing their application and managing state.

Flux was great, but developers had a hard time with implementation because the pattern presented a few other problems. Because of this, (and around the same time that React was becoming so popular) [Dan Abramov (Links to an external site.)](https://github.com/gaearon) built out a 'Time-traveling' approach to debug an application. This method eventually became known as Redux. Dan wanted to be able to go back in time to see when/where the state had changed in his application, and to do that, he ended up creating one of the most popular state-management libraries known to React Developers today.

Redux is a small, light-weight state container for use when building JavaScript applications. Remember, Redux has nothing to do with React other than the fact that many developers use them together. The core concepts/principles of Redux are 3 fold:

#### The Store

> Everything that changes within your application is represented  
> by a single JavaScript Object known as the store. The store  
> contains our state for our application.

#### Application state is Immutable

> When the application state changes, we clone the state object, modify the clone, and replace the original state with the new copy. We never mutate the original object, and we never write to our store object.

#### Pure functions change our state

> Given the same input, a pure function returns the same output every time. All functions (reducers) in Redux must be pure functions. Meaning they take in some state and a description of what changes took place and return a copy of our state.

Redux is pretty simple at its core, the complications with Redux arise when we try and implement it within a React application. Usually, these issues are because there is some new syntax, and it's just a matter of time spent learning to sort them out.

## Follow Along

Watch the first 4 videos in [this series (Links to an external site.)](https://egghead.io/lessons/react-redux-the-single-immutable-state-tree) and try to wrap your head around how this would be useful in a React application. Think of your projects that you've built in React up until this point. What types of problems would Redux have solved in those projects if any?

## Challenge

Write your thoughts on why Redux exists and at least one reason to use it as well as one reason to not use it.

[Source](https://lambdaschool.instructure.com/courses/1218/pages/objective-1-explain-what-redux-is-and-the-problem-it-solves?module_item_id=597488)

# Objective 2 - create a Redux Store and connect it to a React application: WEB43 - 3.2

> In this section, we'll learn how to create the Redux Store and how to use a library called react-redux to connect our React application to the Store. Because Redux is a standalone library,
> (meaning it can be used on its own or with another library/framework for state-management and data flow) we have to use a second helper package that will enable us to string together Redux within a React application. That package is called React-Redux (Links to an external site.). Some more documentation and information lives here (Links to an external site.). The packages React and Redux are entirely separate, as quoted in the Redux documentation.

## Overview

In this section, we'll learn how to create the _Redux Store_ and how to use a library called `react-redux` to connect our React application to the _Store_. Because Redux is a standalone library,  
(meaning it can be used on its own or with another library/framework for state-management and data flow) we have to use a second helper package that will enable us to string together Redux within a React application. That package is called [React-Redux (Links to an external site.)](https://github.com/reduxjs/react-redux). Some more documentation and information lives [here (Links to an external site.)](http://redux.js.org/basics/usage-with-react). The packages `React` and `Redux` are entirely separate, as quoted in the Redux documentation.

> From the very beginning, we need to stress that Redux has no relation to React. You can write Redux apps with React, Angular, Ember, jQuery, or vanilla JavaScript.

## Follow Along

The first step we're going to take to enable Redux within a React application is to install it. This process assumes you've used Create React App to boilerplate out a React application.

    npm install react-redux redux

Now that we have `redux` and `react-redux` installed, let's learn how to set it up within our application. We will use the `createStore` function from `redux`, so let's import that first.

    import { createStore } from 'redux';

`createStore` will take in a single reducer that represents the state (data) of our application globally. We need to create a `store` variable, and use `createStore` to create the Redux store.

    const store = createStore(reducer);

You'll notice that we passed a reducer into `createStore`, but we don't have a reducer yet. We'll learn a lot more about reducers soon. For now, let's create a function called `reducer` that returns an object representing our state.

    function reducer() {
      return {
        title: 'Hello world! I\'m in the Redux store!',
      }
    }

    const store = createStore(reducer);

Now that we have a store, we want to make our application aware of it. The way this works is that react-redux gives us a `<Provider></Provider>` component that wraps around our entire application. We will pass our newly created store to that component as a prop.

Within our Root Component (usually `Index.js`), go ahead and import `Provider` from `react-redux`.

    import { Provider } from 'react-redux';

Then, all we need to do is wrap our `<App/>` with the `<Provider>` component and pass a `store` prop set equal to the store we created. This will look like this:

    <Provider store={store}>
      <App/>
    </Provider>

## Challenge

Let's go ahead and take a peek at our application using the React Dev Tools now that we've wrapped it up in a Provider Component.

Now, take the time to think about where and when you've done this before? Is there a package that we've used this same way? If so, which package is it? It is important to note that a large number of packages that we use in React are implemented this way.

Write down a few thoughts on what you see, where you've seen similar patterns, etc, and send that to your PM.

[Source](https://lambdaschool.instructure.com/courses/1218/pages/objective-2-create-a-redux-store-and-connect-it-to-a-react-application?module_item_id=597493)

# Objective 3 - use the connect function to connect React components to the Redux store: WEB43 - 3.2

> Now that we have built a store to manage our state, we need to connect our components to that store. We can do so using the connect function, within the components themselves. We can also build a helper function within the component files to tell the connect function what pieces of state we want to access. This function is usually named mapStateToProps, and it will map pieces of our Redux state to the props of our component. Let's try it out.

## Overview

Now that we have built a store to manage our state, we need to connect our components to that store. We can do so using the `connect` function, within the components themselves. We can also build a helper function within the component files to tell the `connect` function what pieces of state we want to access. This function is usually named `mapStateToProps`, and it will map pieces of our Redux state to the props of our component. Let's try it out.

## Follow Along

Using the app you created earlier that has the redux store wired up, change the object you initially returned out of the reducer function to look like this:

    {
      user: {
        name: 'Dustin'
      },
      movies: [
        'Star Wars',
        'Lord of the Rings',
        'Harry Potter'
      ],
      todoList: [
        { task: 'Learn Redux', id: 0, completed: false }
      ],
      moviesToWatch: 13
    }

Now create a component called `MovieList`. Next, we'll take a look at the syntax we use to connect our React component to Redux, then we'll talk about it. To start, import the `connect` function into your component:

    import { connect } from 'react-redux';

Next, we use the `connect` function, where we export the component at the bottom of the file. We invoke `connect` twice (function currying). First with two arguments - a function and an object. Second with just the component we are trying to connect. For now, we'll pass `null` and `{}` into the first invocation.

    export default connect(null, {})(MovieList)

Now `MovieList` is connected to the store. Let's write our `mapStateToProps` function now, to tell `connect` which pieces of our state we want to bring in to this component. This function takes in `state` as a parameter, then returns an object where the properties can be passed to props, and the values are retrieved from the store for our component.

For a `MovieList` component, we probably only want to know about the `movies` array and the `moviesToWatch` number, _maybe_ the `user` object. We'll not worry about the `todoList`, since our component doesn't need to know about that part of our state. Let's bring those three pieces of our state into the component.

    const mapStateToProps = state => {
      return {
        movies: state.movies,
        moviesToWatch: state.moviesToWatch,
        user: state.user
      }
    }

Let's pass this in as the first argument to the first `connect` invocation. Notice that `state` is being passed into this function. Under the hood, connect passes our entire state tree to `mapStateToProps`. That means that within that function, we have access to all our state via the `state` argument. But, the component only receives the pieces of state that we turn out of `mapStateToProps`.

    export default connect(mapStateToProps, {})(MovieList)

Now, if you look at the props in the React tools, you will see that all three pieces of our state have been passed to our component through the `connect` function! As a side note, other props we've passed to this component the traditional way are still going to be available.

_By the way, did you notice that we are using a function that takes in a component, extends its functionality, and returns a component? `connect` is a HOC!!!\`_

## Challenge

Create a new application. Add the `redux` and `react-redux` packages. Create a redux store with some test data (have fun with this part!). Build a component and connect that component to the store using `connect` and a `mapStateToProps` function. Render the connected data from your connected component.

[Source](https://lambdaschool.instructure.com/courses/1218/pages/objective-3-use-the-connect-function-to-connect-react-components-to-the-redux-store?module_item_id=597498)

# Objective 4 - write Actions and Action Creators to describe state changes: WEB43 - 3.2

> In the world of Redux there's a whole new set of programmer jargon. The first we'll talk about here is actions.

## Overview

In the world of Redux there's a whole new set of programmer jargon. The first we'll talk about here is `actions`.

### Actions

Actions in Redux are packets of information that contain an action type and associated data.

In code, an action is simply an object with up to two properties - a `type` property and an optional `payload` property. Each action MUST have a `type` property. The `type` property is a string that explains what interaction just happened. By convention, we use all caps and underscores for types - ie `'LOGIN_USER` or `TOGGLE_TODO`. The `payload` property is data that goes along with that interaction.

Actions are "dispatched" to our reducer - aka, passed into the reducer function as an argument. When our reducer recieves an action, it will update the state according to the type and payload on the action.

Let's say we have a toggle handler function that switches a boolean field called `show`, which is set on our state in our Redux store. An action for such an event would look like this:

    { type: "TOGGLE_SHOW", show: !state.show };

This allows us to keep things as simple as possible when responding to events and interactions!

Importantly in Redux, reducers are the only place we can update our state. Actions tell our reducers "how" to update the state, and perhaps with what data it should be updated, but **only** a reducer can actually update the state. _More to come on reducers later._.

From what we've learned so far, we can start to see the flow of data in a React/Redux application:

    Store sets the state ->
    Event or user interaction happens ->
    An action desctibing the event and possible changes is dispatched to reducer ->
    The reducer handles the action and replaces the store accordingly.

### Action creators

Actions should not be confused with `action creators` (though admittedly, it's very easy to confuse them). An action creator is a function that _creates_ an action. Or in other words, an action creator is a function that returns an action object.

Action creators are a middle step between events/interactions and the dispatch process. They make it possible to write reusable functions that can create actions on the fly, rather than us hard coding actions into our components. With action creators in mind, here is an updated look at our data flow:

    Store sets the state ->
    Event or user interaction happens ->
    An action creator is called and dispatches an action ->
    Actions tell us about the changes from the event ->
    Reducers handle those actions and replace the store accordingly.

This flow is one of the reasons that Redux is so powerful. The two major principles here are `Functional Programming` and `Immutability`. Dispatched actions are the trigger for reducers, and reducers are pure functions that never produce any side-effects. Everything you do in Redux is functional.

### Action types

The final term we want to cover here is `action types`. We've talked about, and even demonstrated the `type` property of an action. We want to change that up right now, ever-so-slightly… Instead of passing a string to `action.type` we create a variable with the name of the string, and assign it the string we would have passed to an action. Then we give `action.type` the variable as it's value.

We do this because we deal with strings like we deal with `types`. Strings are used in multiple places like you'll see in reducers very soon, misspellings occur, and are very hard to debug. If we misspell our action type in our reducer, our state won't be updated correctly, and we'll be left wondering what went wrong.

Instead, we'll create an action type, and import it wherever we need it. That way, with linters IntelliSense in our code editor, we can spot errors a lot quicker. This is what action types looks like:

    export const TOGGLE_SHOW = 'TOGGLE_SHOW';


    { type: TOGGLE_SHOW, payload: !state.show }

Now let's try all of this in code!

## Follow Along

Let's build our first action creator. We'll assume that we have a Redux store connected to our app, and a component connected to the store. On the state object, we have a `title` property brought into the component via the `mapStateToProps` function. Our component has an input field and an "update title" button. When we type into the input and click the button, we want to update our state object with our new title. (You can start with [this codesandbox (Links to an external site.)](https://codesandbox.io/s/rj862kxkkp))

First, we need to create a new folder in the `src` folder called `actions`. Inside that folder, create an `actions.js` file. Inside that file, create a variable called `UPDATE_TITLE` with the value `'UPDATE_TITLE'`. The variable is an action type. Next, let's create a function called `updateTitle` that takes in a new title. This will be our action creator, and it will simply return an action with the type `UPDATE_TITLE` and a payload of the new title we passed into it. Don't forget to export both the action type and the action creator function. (Note that these will be `named exports`, so they will be imported with curly brace sytnax - `import { namedExport } from './place';`)

    export const UPDATE_TITLE = 'UPDATE_TITLE';

    export function updateTitle(newTitle) {
      return {
        type: UPDATE_TITLE,
        payload: newTitle
      }
    }

See how easy that was? It sounded pretty scary up above, but in practice, this is all very concise and intuitive. Now we have an action creator that can dispatch our action to the reducer and send the reducer the new title. Let's import our action creator into our component, and talk about how to use it there.

When we use action creators in our connected components, we first import the action creator. Then, we pass the action creator into the `connect` function. Action creators are passed to the object that is the second argument in the first `connect` invocation.

    export default connect(mapStateToProps, { actionCreator: actionCreator })(Component);

Then, just like the state pieces that we brought into our component via the `mapStateToProps` function, we have access to our action creator in props. This step is important because it is the `connect` function that works in the background to actually dispatch our actions to the reducer. We can't just import an action creator and use it in our component. It must go through `connect` and be used from the props object.

Let's see how we would do this in the app we have been building. Go to the `Title` component, import `updateTitle`, and pass it into the `connect` function.

    import React from 'react';
    import { connect } from 'react-redux';

    import { updateTitle } from '../actions/actions';

    ...

    export default connect(
      mapStateToProps,
      { updateTitle }
    )(Title);

Now when the "Update title" button is pushed, invoke a function on the class that invokes `this.props.updateTitle` that gets `this.state.newTitleText` passed into it.

    updateTitle = (e) => {
      e.preventDefault();
      this.props.updateTitle(this.state.newTitleText)
    }

    ...

    <button onClick={this.updateTitle}>Update title</button>

Yes, names will be the same all over the place with this stuff. Just note that `props.updateTitle` is the action creator.

To make sure it is working, let's add a console.log in the action creator, and log out the newTitle that is passed into it. Since we don't have a reducer to handle this action yet, we won't see the state or title updated yet. So this is the best way we can make sure it's working.

    export function updateTitle(newTitle) {
      console.log(newTitle);
      return {
        type: UPDATE_TITLE,
        payload: newTitle
      }
    }

Here's what our [codesandbox (Links to an external site.)](https://codesandbox.io/s/w2n0o4qwmw) should look like now.

## Challenge

In the application you created earlier, look at the state you are displaying. Find something easy, like a string or a number, to update. (Add a string to your state if you only have arrays or objects. This will keep things simple today while we learn this brand new state management flow). Build an action creator, pass it in to your component, and call that action creator (from props) after some interaction like a button click. Make sure you have a console.log in the action creator so you will know if it's working.

[Source](https://lambdaschool.instructure.com/courses/1218/pages/objective-4-write-actions-and-action-creators-to-describe-state-changes?module_item_id=597504)
