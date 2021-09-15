---
title: Using React refs with class components
categories:
  - code
tags:
  - React
---

According to the React's [documentation](https://reactjs.org/docs/refs-and-the-dom.html), there are a few good use cases for using refs:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

Let's assume we have a **child** component with the `doSomething` method and we want to call this method from its **parent** component.

```javascript
class ChildComponent extends React.Component {
  doSomething = () => {
    /* ...  */
  };

  render() {
    return <div>{this.children}</div>;
  }
}
```

To make that possible create a ref using `React.createRef()`, let's name it `child`, and attach it to the `ChildComponent` via `ref` attribute.

A reference to the component becomes accessible at the `current` attribute of `this.child`. To call the `doSomething` method use `this.child.current.doSomething()`.

```javascript
class ParentComponent extends React.Component {
  child = React.createRef();

  componentDidMount() {
    this.child.current.doSomething();
  }

  render() {
    return (
      <ChildComponent ref={this.child}>This is ChildComponent</ChildComponent>
    );
  }
}
```
