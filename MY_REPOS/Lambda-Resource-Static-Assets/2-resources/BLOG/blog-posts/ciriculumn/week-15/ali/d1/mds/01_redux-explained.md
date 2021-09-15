
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________
# Redux Explained

Redux is a JavaScript framework for managing the frontend state of a web
application. It allows us to store information in an organized manner in a web
app and to quickly retrieve that information from anywhere in the app. Redux is
modeled on a few previous web technologies including [Elm][elm] and
[Flux][flux].

Advantages of Redux include:

* It simplifies some of the more cumbersome aspects of Flux
* It is very lightweight; the library only takes up 2 kbs
* It is very fast (the time to insert or retrieve data is low)
* It is predictable (interacting with the data store in the same way repeatedly
  will produce the same effect)

## Where did Redux come from?

Redux was created by Dan Abramov in 2015. It was initially intended as an
experiment to create a simplified version of Flux. Abramov wanted to remove some
of what he saw as the unnecessary boilerplate code that was required to create a
Flux app.

Abramov also wanted to eliminate some of the aspects of development he found
frustrating. When trying to debug a web app, one must often go through the
series of steps that cause the bug to occur each time the code is changed. This
quickly becomes repetitive and frustrating. Abramov envisioned dev tools that
would allow one to undo or replay a series of actions at the click of a button.
This idea became the Redux DevTools.

The reason this works is that Redux updates the state using pure functions
called reducers (see below for definitions), so one can simply replay a series
of actions and be guaranteed to arrive at the same final state. As Redux was
developed it also became more convenient to use a single object to store the
state, as opposed to traditional Flux which uses multiple stores.

These design choices allowed for the creation of an ecosystem of powerful Redux
tools and extensions. Over time three principles were recognized as central to
the philosophy of Redux. They are:

* **A Single Source of Truth** The state for an entire Redux app is stored in a
  single, plain JavaScript object.

* **State is Read Only** The state object cannot be directly modified. Instead
  it is modified by dispatching actions.

* **Changes Are Made with Pure Functions** The reducers that receive the actions
  and return updated state are pure functions of the old state and the action.

Beyond this, a guiding meta-philosophy of Redux is the idea that in a software
library restrictions can be just as important as features. Redux deliberately
places significant restrictions on the way state can be stored and updated, but
in return it allows easy implementation of a number of powerful features that
would be extremely difficult to write using a less restrictive framework.

## When is it appropriate to use Redux?

Initially, Redux grew in popularity, quickly moving beyond its initial plan as
an experiment. As of early 2016 it had over 3,000,000 downloads. The Redux
repository on GitHub has over 50,000 stars, and Redux is now used by a number of
companies including Exana, Patreon, and ClassPass.

Since the introduction of Redux, Context has been added to React. Context, like
Redux, gives you a way to store and manage global state in your React
applications. For projects with simpler global state requirements, Context has
become a popular alternative to using Redux.

Context is built into React so there's no need to install an additional library
as a dependency. Context is also simpler overall and generally requires less
work to get up and running. All that being said, for projects with more
sophisticated global state requirements, Redux remains a popular option. Redux
offers greater flexibility with support for middleware and richer developer
tools in the form of the Redux DevTools.

## Vocabulary

Learning how to use Redux requires you to understand a fair amount of
terminology. For now, don't worry about memorizing all of the following terms;
it's good enough to just have a general awareness. You'll revisit each of these
terms as you work your way through this lesson. 

### State

Ex: "_Redux is a state manager._"

The _state_ of a program means all the information stored by that program at a
particular point in time. It is generally used to refer to the data stored by
the program at a particular instance in time, as opposed to the logic of the
program, which doesn't change over time. The job of Redux is to store the state
of your app and make it available to entire app.

### Store

Ex: "_Redux stores state in a single store._"

The Redux store is a single JavaScript object with a few methods, including
`getState`, `dispatch(action)`, and `subscribe(listener)`. Any state you want
Redux to handle is held in the store.

### Actions

Ex: "_The Redux store is updated by dispatching actions._"

An action is a POJO (plain old JavaScript object) with a `type` property.
Actions contain information that can be used to update the store. They can be
_dispatched_, i.e. sent to the store, in response to user actions or AJAX
requests. Typically Redux apps use functions called _action creators_ that
return actions. Action creators can take arguments which allow them to customize
the data contained in the actions they generate.

### Pure functions

Ex: "_Redux reducers are pure functions._"

A function is pure if its behavior depends only on its arguments and it has no side
effects. This means the function can't depend on the value of any variables that
aren't passed to it as arguments, and it can't alter the state of the program or
any variable existing outside itself. It simply takes in arguments and returns a
value.

### Reducer

Ex: "_Redux handles actions using reducers._"

A reducer is a function that is called each time an action is dispatched. The
reducer receives an action and the current state as arguments and returns an
updated state.

Redux reducers are required to be pure functions of the dispatched action and
the current state. This makes their behavior very predictable and allows their
effects to potentially be reversed.

### Middleware

Ex: "_You can customize your response to dispatched actions using middleware._"

Middleware is an optional component of Redux that allows custom responses to
dispatched actions. When an action is dispatched, it passes through each
middleware that has been added to the state. The middleware can do something
in response and choose whether or not to pass the action on down the chain.
Behind the scenes, the middleware actually replaces the dispatch method of the
store with a customized version. There is a large ecosystem of existing
middleware ready to be plugged into any Redux projects. One example is a logger
that records each action before passing it on to the reducer. Perhaps the most
common use for middleware is to dispatch asynchronous requests to a server.

### Time traveling dev tools

Ex: "_Redux has time traveling dev tools._"

Redux reducers are pure functions of the dispatched action and the current
state. This means that if one were to store a list of the previous states over
time and the actions that had been dispatched, one could retroactively cancel an
action and recalculate the state as if that action had never been dispatched.
This is precisely the functionality that the Redux DevTools provide. The dev
tools can be added as middleware to any Redux project. They allow you to look
back through the history of the state and toggle past actions on and off to see
a live recalculation of the state. This ability to revert to a previous state is
what is meant by time travel.

### Thunks

Ex: "_Thunks are a convenient format for taking asynchronous actions in Redux._"

The traditional approach to middleware closely parallels the format of reducers.
The actions being dispatched are POJOs with types and various middleware files
are waiting to receive them. These files check the type of the action using a
case statement just like reducers.

Thunks are an alternative approach. A thunk is a general concept in computer
science referring to a function whose primary purpose is simply to call another
function. In Redux a thunk action creator returns a function rather than an
object. When they are dispatched, thunk actions are intercepted by a piece of
middleware that simply checks if each action is a function. If it is, that
function is called with the state and dispatch as arguments, otherwise it is
passed on down the chain. Thunks are most commonly used to make asynchronous API
requests.

## What you learned

In this article, you learned what Redux is and where it came from. You also
learned when it's appropriate to use Redux and some of the vocabulary terms used
by Redux.

## See also...

The [official Redux documentation][redux-docs] is a great resource for learning
more about Redux. To see who's using Redux, see this page on
[StackShare][stackshare-redux].

[elm]: http://elm-lang.org/docs
[flux]: https://facebook.github.io/flux/docs/overview.html#content
[redux-docs]: http://redux.js.org/
[stackshare-redux]: https://stackshare.io/reduxjs
