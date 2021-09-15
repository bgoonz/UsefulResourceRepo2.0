# Component Lifecycle

________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [The lifecycle of a React component](#the-lifecycle-of-a-react-component)
  - [Mounting](#mounting)
  - [Updating](#updating)
  - [Unmounting](#unmounting)
  - [Avoiding the legacy lifecycle methods](#avoiding-the-legacy-lifecycle-methods)
- [Using the class component lifecycle methods](#using-the-class-component-lifecycle-methods)
- [Fetching data from an API](#fetching-data-from-an-api)
- [What you learned](#what-you-learned)
- [See also...](#see-also)

<!-- /code_chunk_output -->
________________________________________________________________________________

When creating a React class component, you define its props and state, how it'll
handle user generated events, and how it'll render, but you don't directly
control _when_ those things occur. And while you can add your component to
another component's `render` method (making it a child of that component), you
don't control _when_ your component will be loaded into (or unloaded from) the
component tree. You also don't control when your component will be updated and
re-rendered.

The lifecycle of a component is simply a way of describing the key moments in
the lifetime of a component: when it's loading (i.e. mounting), updating, and
unloading (i.e. unmounting).

When you finish this article, you should be able to:

* Describe the lifecycle of a React component;
* Recall that the commonly used component lifecycle methods include
  `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`; and
* Use the `componentDidMount` component lifecycle method to fetch data from an
  API.

## The lifecycle of a React component

Each class component has several lifecycle methods that you can add to run code
at specific points in a component's lifetime:

* [`componentDidMount`][react docs componentdidmount] - This method is called
  after your component has been added to the component tree.
* [`componentDidUpdate`][react docs componentdidupdate] - This method is called
  after your component has been updated.
* [`componentWillUnmount`][react docs componentwillunmount] - This method is
  called just before your component is removed from the component tree.

Let's take a closer look the process that occurs when a component is mounting,
updating, and unmounting.

### Mounting

When a class component is being added to the component tree, the following
process occurs:

* The `constructor` method is called;
* The `render` method is called;
* React updates the DOM; and
* The `componentDidMount` lifecycle method is called.

### Updating

A component will update if it receives new props or if the `setState` method is
called.

When a component receives new props, the following process occurs:

* The `render` method is called;
* React updates DOM; and
* The `componentDidUpdate` lifecycle method is called.
  
When a the `setState` method is called, the following process occurs:

* The `render` method is called;
* React updates DOM; and
* The `componentDidUpdate` lifecycle method is called.

### Unmounting

Just before a class component is removed from the component tree, the
`componentWillUnmount` lifecycle method is called.

> To see a visual depiction of the above processes, check out this interactive
> [lifecycle diagram].

### Avoiding the legacy lifecycle methods

In earlier versions of React, there were additional lifecycle methods that you
could use. These methods are now deprecated and are marked as "unsafe" to use
(because they'll eventually be removed from React's API).

The legacy lifecycle methods are:

* [`UNSAFE_componentWillMount`][react docs componentwillmount]
* [`UNSAFE_componentWillReceiveProps`][react docs componentwillreceiveprops]
* [`UNSAFE_componentWillUpdate`][react docs componentwillupdate]

Sometimes you'll encounter these lifecycle methods in older articles and code
examples when researching React online. To learn more about these lifecycle
methods, see the [official React documentation][react docs legacy lifecycle
methods].

## Using the class component lifecycle methods

To see the [`componentDidMount`][react docs componentdidmount],
[`componentDidUpdate`][react docs componentdidupdate], and
[`componentWillUnmount`][react docs componentwillunmount] lifecycle methods in
action, you can create a couple of simple React class components.

For the first class component, you'll define the `componentDidMount`,
`componentDidUpdate`, and `componentWillUnmount` lifecycle methods and render an
`<h2>` element using the `this.props.text` prop for its content:

```js
// ./src/LifecycleMethods.js

import React from 'react';

class LifecycleMethods extends React.Component {
  componentDidMount() {
    debugger;
  }

  componentDidUpdate() {
    debugger;
  }

  componentWillUnmount() {
    debugger;
  }

  render() {
    return (
    <h2>{this.props.text}</h2>
    );
  }
}

export default LifecycleMethods;
```

The `debugger` statements will cause the browser to break within each of the
lifecycle methods when they're invoked.

For the second class component, you'll create a component that'll use the
`LifecycleMethods` component:

```js
// ./src/Demo.js

import React from 'react';
import LifecycleMethods from './LifecycleMethods';

class Demo extends React.Component {
  constructor() {
    super();

    this.state = {
      displayComponent: false,
      componentText: new Date().toLocaleString(),
    };
  }

  loadComponent = () => {
    this.setState({ displayComponent: true });
  }

  unloadComponent = () => {
    this.setState({ displayComponent: false });
  }

  updateComponent = () => {
    this.setState({
      componentText: new Date().toLocaleString(),
    });    
  }

  render() {
    return this.state.displayComponent ?
      (
        <div>
          <div>
            <button type='button' onClick={this.unloadComponent}>Unload Component</button>
            <button type='button' onClick={this.updateComponent}>Update Component</button>
          </div>
          <LifecycleMethods text={this.state.componentText} />
        </div>
      ) : (
        <div>
          <button type='button' onClick={this.loadComponent}>Load Component</button>
        </div>
      );
  }
}

export default Demo;
```

Notice that the component renders buttons to control when the `LifecycleMethods`
component is loaded, updated, and unloaded. Having these buttons will allow you
to interactive trigger each of the lifecycle methods defined within the
`LifecycleMethods` component.

If you're following along, be sure to update your React application's entry
point to render the `Demo` component:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';

ReactDOM.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Then run your application (`npm start`) and open the developer tools console in
your browser. Here's the application just after clicking the "Load Component"
button. Notice that execution is paused within the `LifecycleMethods`
component's `componentDidMount` lifecycle method!

![component lifecycle demo]

## Fetching data from an API

A common use case for the `componentDidMount` lifecycle method, is to fetch data
from an API after a component has been mounted to the DOM. Here's an example of
a class component that uses the `componentDidMount` lifecycle method to retrieve
the public repositories for the provided GitHub username and render the
repositories as an unordered list of links:

```js
// ./src/FetchingData.js

import React from 'react';

class FetchingData extends React.Component {
  constructor() {
    super();

    this.state = {
      repositories: [],
    };
  }

  componentDidMount() {
    const url = `https://api.github.com/users/${this.props.gitHubUsername}/repos`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ repositories: data }));
  }

  render() {
    const { repositories } = this.state;

    if (repositories.length === 0) {
      return (
        <div>Fetching data...</div>
      );
    } else {
     return (
       <div>
         <h2>GitHub Repositories for {this.props.gitHubUsername}</h2>
         <ul>
           {
             repositories.map((repo) => (
               <li key={repo.id}>
                 <a href={repo.html_url}>{repo.name}</a>
               </li>
             ))
           }
         </ul>
       </div>
     );
    }
  }
}

export default FetchingData;
```

In the above example, the `FetchingData` component initially renders
`<div>Fetching data...</div>`. Once the component is mounted to the DOM, the
`componentDidMount` lifecycle method is called, which in turn uses the Fetch API
to retrieve the public repositories for the provided GitHub username. When the
fetch HTTP request completes and the JSON response is parsed, the
`this.setState` method is called to update the `this.state.repositories`
property with the newly acquired data. Updating the state causes React to
re-render the component which then displays an unordered list of links.

If you're following along, be sure to update your React application's entry
point to render the `FetchingData` component and to set the `gitHubUsername`
prop on the component to a valid GitHub username:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import FetchingData from './FetchingData';

ReactDOM.render(
  <React.StrictMode>
    <FetchingData gitHubUsername='appacademy' />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Here's the component displaying the public repositories for the `appacademy`
GitHub username:

![component lifecycle fetching data]

## What you learned

In this article, you learned how to:

* Describe the lifecycle of a React component;
* Recall that the commonly used component lifecycle methods include
  `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`; and
* Use the `componentDidMount` component lifecycle method to fetch data from an
  API.

## See also...

In addition to the `componentDidMount`, `componentDidUpdate`, and
`componentWillUnmount` lifecycle methods, there are additional rarely used
lifecycle methods. To learn more about these additional lifecycle methods, see
the [official React documentation][react docs component lifecycle].

[react docs componentdidmount]: https://reactjs.org/docs/react-component.html#componentdidmount
[react docs componentdidupdate]: https://reactjs.org/docs/react-component.html#componentdidupdate
[react docs componentwillunmount]: https://reactjs.org/docs/react-component.html#componentwillunmount
[react docs legacy lifecycle methods]: https://reactjs.org/docs/react-component.html#legacy-lifecycle-methods
[react docs componentwillmount]: https://reactjs.org/docs/react-component.html#unsafe_componentwillmount
[react docs componentwillreceiveprops]: https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops
[react docs componentwillupdate]: https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate
[lifecycle diagram]: http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
[react docs component lifecycle]: https://reactjs.org/docs/react-component.html#the-component-lifecycle
[component lifecycle demo]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-class-components/assets/component-lifecycle-demo.png
[component lifecycle fetching data]: images/component-lifecycle-fetching-data.pngimages/component-lifecycle-fetching-data.png_____________________________________________________________________