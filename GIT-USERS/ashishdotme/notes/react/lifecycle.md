---
id: lifecycle
title: Component Lifecycle
---

## Create

### Contructor(props)

- It's a default es6 class feature
- Used to call super(props)
- You can set up state
- You should not cause side effects

### ComponentWillMount()

- You can update state
- You can do last minute optimization
- You should not cause side effects

### Render()

- You can structure your code here

### ComponentDidMount()

- You can cause side effects
- You can call APIS and do data modification
- You should not update state though as it triggers re render

## Update

### ComponentWillReceiveProps()

- You can sync state to props
- You should not cause side effects

### ShouldComponentUpdate()

- You can decide wether to continue or not
- You should not cause side effects

### ComponentWillUpdate()

- You can sync state to props
- You should not cause side effects

### ComponentDidUpdate()

- You can cause side effects
- You should not update state as it triggers re render

### ComponentWillUnmount()
