# ReducerPattern

explain that the video in the TK talks about Redux but we haven’t covered Redux. explain that the REducer pattern is used in Redux and that’s why.

Talk about immutability and why it’s important

# repl.it project

build a new ES6 repl.it project.

1.  show const and let for numbers
2.  show const and let for objects
3.  show how you can mutate objects
4.  show how even with the const keyword. show that there is no const for keys on objects
5.  show how “copying” an object by equal assign mutates the original
6.  draw out how memory works for these variables and explain why mutation of original in object and the const keyword is possible because of how things are stored in memory

# codesandbox project

use the codesandbox title project

1.  explain pure functions
2.  no side effects
3.  exact same output every time with exact same inputs
4.  explain reducers
5.  pure function
6.  takes two objects and “reduces” them to one
7.  for our purposes, reducers take two values, and state object and an action object
8.  explain an action
9.  object that has a requires ‘type’ key
10. has an optional ‘payload’ key (for when you need it)
11. build a titleReducer
12. create and export initialValue
13. create and export the reducer funtion
14. in Title.js comment out the useState for title and editing and replace with reducer
15. refactor code to use properly. ignore dispatch for now
16. go over dispatch
17. create an action and code path in reducer for ‘TOGGLE_EDITING’
18. dependingo n time, maybe breakout here and have groups do ‘SET_TITLE’
19. when they get back look at some code and build it out both with two dispatches on button press as well as one with reducer of SET_TITLE also setting the editing kay
20. rejoice
