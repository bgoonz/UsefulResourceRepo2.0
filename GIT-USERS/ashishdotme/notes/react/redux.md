---
id: redux
title: Redux
---

Redux is used to change the state of application.

## Three principles of Redux

1. Single source of truth - State of whole application is stored in a single tree
2. State is read only - Only by emitting action, we can change the state of applcation
3. Changes are made with pure functions - Reducers which are pure functions can only change the state

## Connect

### mapDispatchToProps

- It's a method you provide to connect
- Recieves dispatch as an argument
- Allows you to create functions which dispatch actions
- It can return an object which is passed to component as props.
