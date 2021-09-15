# How to Use React Custom Hooks

> New to the concept of React custom Hooks? Nate explains the power of custom Hooks and how you can use them to compartmentalize and share code.

My favorite feature of [React Hooks](https://reactjs.org/docs/hooks-intro.html) is that they give us the ability to write [custom Hooks](https://reactjs.org/docs/hooks-custom.html).

Custom Hooks provide a super clean interface to share functionality. They are great for organizing and reusing code, but their real beauty lies in how they encourage comprehension through syntax, naming conventions, and granularity. If you haven’t begun using custom hooks yet, I hope the following example will help you see why they’re appealing to so many people.

This article assumes you are familiar with [React](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/foundry/category/react) and the concept of Hooks. You should at least be comfortable with the [rules of Hooks](https://reactjs.org/docs/hooks-rules.html) and hopefully familiar with [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) and [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect). For more information on [_when_ to use Hooks, check out this wonderful article](https://frontarm.com/james-k-nelson/react-hooks-intuition/).

So what are custom Hooks? They’re just functions that call other Hook functions (for a more in-depth answer, I will point you to [the React docs](https://reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook)). The Hooks called from a custom Hook can be built-in React Hooks or _other_ custom Hooks themselves. They may trigger side effects, or return state, or both. But at the end of the day, their code paths will ultimately reach the built-in Hooks provided by React.

React and ResizeObserver
------------------------

To get started, we need a subject to demonstrate how one might approach authoring a React component that has a direct dependency on a platform API. For that, I’m choosing [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) because I think it’s fun, but more importantly, it’s useful. Let’s take a look at how we might use ResizeObserver in a class component.

    import React, { Component, createRef } from "react";
    
    class ComponentWithResizeObserver extends Component {
      resizeObserver = null;
      resizeSubject = createRef();
      state = {};
    
      componentDidMount() {
        if ("ResizeObserver" in window) {
          this.observe(ResizeObserver);
        } else {
          import("resize-observer-polyfill").then(this.observe);
        }
      }
    
      componentWillUnmount() {
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
        }
      }
    
      observe = RO => {
        this.resizeObserver = new RO(entries => {
          const {
            width,
            height,
            top,
            right,
            bottom,
            left
          } = entries[0].contentRect;
          this.setState({ width, height, top, right, bottom, left });
        });
    
        if (this.resizeSubject.current) {
          this.resizeObserver.observe(this.resizeSubject.current);
        }
      };
    
      render() {
        return (
          <div ref={this.resizeSubject}>
            {width} x {height}
          </div>
        );
      }
    }
    

This component keeps internal references to its own branch of the render tree and initializes ResizeObserver. I’ll walk it through for completeness.

1.  Internal state and properties
    *   `resizeObserver` will be a reference to the `ResizeObserver` constructor
    *   `resizeSubject` will be the subject of observation
    *   `state` is initialized to an empty object
2.  Resolution of the observer
    *   In `componentDidMount` we check for `ResizeObserver` in the global object
    *   If it isn’t found, it loads a [polyfill](https://www.npmjs.com/package/resize-observer-polyfill#usage-example)
    *   In both cases, it calls `observe`, passing the constructor along
3.  Setting up a subscription
    *   `observe` constructs a new instance of `ResizeObserver` and assigns it to the appropriate class field
    *   Its handler takes the subject’s [contentRect](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect) and calls `setState` to update the value
    *   It begins observing the `resizeSubject`
4.  `resizeSubject` ref is applied to the subject in the render method
5.  In `componentWillUnmount` we release the subscription

Ok, so that’s not too bad, right? It’s thirty-ish lines of code that allow us to track the size and position of a DOM element inside our component. We can take the sizing data and use it in our rendered output. Here’s a CodeSandbox with a slightly expanded example. Resize the box, and the `contentRect` data of the target element will be updated.

ResizeObserver has many potential applications. How could another component use this same functionality? Is there a way for multiple elements to be observed within one component?

There are options. Experienced React devs might tell us to reach for the [higher-order component](https://reactjs.org/docs/higher-order-components.html) pattern. Maybe we could refactor the component to use a [render prop](https://reactjs.org/docs/render-props.html). Or maybe we should just copy/paste this code to another component when the need arises. I’m not above suggesting the last option. I mean, abstraction comes with a cost. But I’m not here to tell you _when_ to separate logic from a component. I am here to tell you _how_ to do it. With a custom Hook.

useResizeObserver
-----------------

Let’s put all the observer bits from our class component into a function.

    import { useEffect, useState, useRef } from "react";
    
    function useResizeObserver(resizeSubject) {
      const [contentRect, setContentRect] = useState({});
      const resizeObserver = useRef(null);
    
      useEffect(() => {
        if ("ResizeObserver" in window) {
          observe(ResizeObserver);
        } else {
          import("resize-observer-polyfill").then(observe);
        }
    
        function observe(RO) {
          resizeObserver.current = new RO(entries => {
            const {
              width,
              height,
              top,
              right,
              bottom,
              left
            } = entries[0].contentRect;
            setContentRect({ width, height, top, right, bottom, left });
          });
    
          if (resizeSubject.current) {
            resizeObserver.current.observe(resizeSubject.current);
          }
        }
    
        return disconnect;
      }, [resizeSubject]);
    
      function disconnect() {
        if (resizeObserver.current) {
          resizeObserver.current.disconnect();
        }
      }
    
      return contentRect;
    }
    

Here we’ve taken all ResizeObserver logic and placed it into a function called `useResizeObserver`. This is a custom Hook. Let’s walk through the function and compare it to the class component (any changes are crossed out so you can easily compare).

1.  Internal state and properties refs.
    *   `resizeObserver` will be a reference to the `ResizeObserver` constructor
    *   `resizeSubject` will be the subject of observation
    *   `state` `contentRect` is initialized to an empty object
2.  Resolution of the observer
    *   In `componentDidMount` `useEffect` we check for `ResizeObserver` in the global object
    *   If it isn’t found, it loads a polyfill
    *   In both cases, it calls `observe`, passing the constructor along
3.  Setting up a subscription
    *   `observe` constructs a new instance of `ResizeObserver` and assigns it to the appropriate class field `resizeObserver.current`
    *   Its handler takes the subject’s contentRect and calls `setState` `setContentRect` to update the value
    *   It begins observing the `resizeSubject` `resizeSubject.current`
4.  `resizeSubject` ref is applied to the subject in the render method _no rendering here in the custom Hook_. The `resizeSubject` will be passed in by the calling component
5.  in `componentWillUnmount` we release the subscription `useEffect` returns a function that will be invoked when the calling component unmounts, and the subscription will be released.

The end result is that we’ve decoupled DOM rendering from all the yucky bits of code. Setup, teardown, state management (with respect to element sizing data), and polyfilling all live in `useResizeObserver`. Now we can stir that into any component.

    import React, { useRef } from "react";
    import { useResizeObserver } from "./use-resize-observer";
    
    function ComponentThatUsesResizeObserver() {
      const resizeSubject = useRef(null);
      const { width, height } = useResizeObserver(resizeSubject);
    
      return (
        <div ref={resizeSubject}>
          {width} x {height}
        </div>
      );
    }
    

The really wonderful thing here is the simplicity of consuming the Hook. We just call the `useResizeObserver` Hook and take what we need from it. In this case, `width` and `height`. Then we return a render tree. There are no render props and no “magic" props from an HOC.

Here’s the same demo as above but with Hooks.

Conclusion
----------

If you’re new to React or new to Hooks, I hope this helps you understand not just the power of custom Hooks but why they’re so appealing. Hooks are great at helping us compartmentalize and share our code with arguably better ergonomics than previous solutions. They don’t solve every problem. They [don’t cover every corner of React’s Component API](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes) (yet), and they don’t magically reduce the complexity of your particular application requirements. But Hooks can help us organize our code in meaningful ways and allow us to write simpler components that, in many cases, are easier to understand.

If you haven’t jumped on the Hooks bandwagon yet, I suggest giving them a try. [The React docs](https://reactjs.org/docs/hooks-intro.html) or the excellent [faq](https://reactjs.org/docs/hooks-faq.html) are great places to start. If you want to see more real-world examples of what you can do with custom Hooks, take a look at the [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks#packages) repo.


[Source](https://sparkbox.com/foundry/using_react_custom_hook)
