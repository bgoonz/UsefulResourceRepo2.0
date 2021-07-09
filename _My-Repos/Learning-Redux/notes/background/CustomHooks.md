# Non-Visual Behavior (Custom Hooks)

## stateful logic

the term `stateful logic` is not ubiquitous. it just means logic codified (i.e. code) that interacts with state in any way. it can be logic that only reads from the state or logic that updates the state.

in our lesson today, we will be using custom hooks to write code that interacts with state in a reusable way.

## simple form project

1.  open the existing project and show how it works for a single username field
2.  what is the `stateful logic` in this application?

## useForm custom hook

we want to create a hook that will allow us to reuse the `stateful logic` of dealing with forms. we want to be able to specify different fields and have the hook deal with the updates of the state as things are entered into field.

1.  add a new field `email` by copy/pasting
2.  we can do better. create a `/hooks` directory and a `useForm.js` file within
3.  copy the `useState` methods into the form and have the form return the state vars and the update methods
4.  use `useForm` in `SignupForm.js`
5.  bring `clearForm` into the hook
6.  show how to create a single `handleChanges` within the hook for the two fields
7.  refactor to make the `useForm` use a customizable initial value object

## hooks within hooks

1.  explain that we want to have persistence between page reloads, so we are going to use local storage
2.  open up MDN for localStorage
3.  we will do this by creating a hook that looks and acts like `useState` except it save the values locally
4.  create `useLocalStorage.js` in `/hooks`
5.  flesh it out to mimic the `useState` hook and then call it from `useForm`
6.  add local storage read using an initial value function in `useState`
7.  add local storage setValues by creating it in `useLocalStorage.js` and passing it back as the `setValues` param
8.  the localStorageSetValues should store the passed in value into the loal storage and then call the useState setValues
