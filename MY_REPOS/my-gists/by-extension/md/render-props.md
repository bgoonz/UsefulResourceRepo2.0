# Avoiding HOC; Favoring render props

The React community is moving away from HOC (higher order components) in favor of render prop components (RPC). For the most part, HOC and render prop components solve the same problem. However, render prop components provide are gaining popularity because they are more declarative and flexible than an HOC.

Read more:

- [Use a render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
- [Breaking up with HOC](https://medium.com/tandemly/im-breaking-up-with-higher-order-components-44b0df2db052)
- [HOC vs. render props](https://twitter.com/dan_abramov/status/910246052992884736?lang=en)
- [React HOC docs](https://reactjs.org/docs/higher-order-components.html)
- [React render props docs](https://reactjs.org/docs/render-props.html)

## Using and Abusing HOC

There are lots of good things about higher order components. An HOC is a function that accepts a plain component and returns a new extended component. The concepts behind HOC are a marriage of React's now-deprecated "mixins" functionality and functional composition. The idea is to encapsulate common functionality and make it reusable.

**Mixins?** If you haven't heard of mixins it's because you're not supposed to use them anymore. A long time ago, the React team decided that [mixins are considered harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html). At the time they asked people to view [higher-order-coponents as the solution](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750).

Now the community is pushing render props instead. Before digging into render props, let's understand how HOC works a little bit.

In general, the point of an HOC is to provide derived props to a child component. Just like react-redux, those props might be plain values or functions.

### The classic case: `connect()`

Perhaps the most familiar HOC is the `connect()` function from react-redux. Using this HOC, your app's Redux store can be "connected" to a regular component. The `connect()` function provides a simple interface for deriving props from the Redux state and passing those props to the connected component.

Every HOC provides at least one of two things to the child component:

1. derived props
2. callback function props

In the context of `connect()`, this relates to the `mapStateToProps` and `mapDispatchToProps` functions.

**Key point:** an HOC doesn't really "wrap" their child component in a JSX sense, instead it _extends_ your component. Meaning, the `MyThingContainer` component (see below) is a _new_ component. In practice, this means that your React dev tools will show the component as `connect(MyThing)`. It's a subtle but important difference.

One of the reasons to prefer render prop components is that they don't subvert the normal React component tree.

### Using `connect()`

The patterns of react-redux clearly illustrate a basic pattern that every HOC should follow.

Below you can see a generic "container". We will extend a `<MyThing />` component to derive its `name` prop from Redux.

We use `mapStateToProps` to derive the `name` prop from the redux state. As an example, we're also passing an `onChangeName` function prop that allows our `MyThing` component to update the redux state if it needs to.

```js
import { connect } from "react-redux";

import { selectName } from "modules/things/selectors";
import { updateName } from "modules/things/actions";
import MyThing from "./MyThing";

// 1. pass derived props from redux to the component
const mapStateToProps = (state) => ({
  name: selectName(state),
});

// 2. pass function props to dispatch actions from the component to redux
const mapDispatchToProps = (dispatch) => ({
  onChangeName: (name) => {
    dispatch(updateName(name));
  },
});

const MyThingContainer = connect(mapStateToProps, mapDispatchToProps)(MyThing);

export default onChangeName;
```

**Note:** We'll see what the `MyThing` component looks like further below. The main takeaway here is that we can use an HOC to inject derived props into a child component.

### The problem: abusing HOC

For all of the benefits of an HOC, there are some problems with the pattern. Many of the issues of the mixins pattern still apply to HOC &mdash; it can make code more confusing. A well-designed HOC, like `connect` makes code better. But there are ways to abuse the pattern and make code harder to understand.

Problems arise when developers see HOC as the solution to _every_ problem.

For instance, it's not a good idea to use an HOC to do something that a normal component can do. In the connect example, HOC is a natural fit. But, what if we're adding a different type of functionality?

Below, you can see an abuse of the HOC pattern. We're creating a new `MyThingRow` component using a `row` HOC. We'll show the guts of the `row` HOC further below. The key thing to note is that the `row` doesn't actually pass any props to the wrapped component.

The `row` HOC is being used to wrap a `MyThing` component so that it will always be contained in a `<div />` with the correct class names. You can see that we apply it very similarly to the way we used `connect`. We pass some configuration and then the component we intend to extend.

```js
// Bad: Using an HOC to provide a wrapper div

import row from "utils/row";
import MyThing from "./MyThing";

const MyThingRow = row({ backgroundColor: "green" })(MyThing);
export default MyThingRow;
```

### Why not a `row` HOC?

The problem becomes more clear when you look at the code for the `row` HOC. Higher order components break the normal way that JSX manages nesting components &mdash; remember that an HOC creates a new merged component. Because of the odd nature of HOCs, it's important to only use them when you need derived props.

In this case, a `row` HOC breaks the basic rules for what and HOC should provide.

**Breaking the rules of HOC:**

- Not providing any derived props
- Not providing any callback props

**Confusing and restrictive:**

- Creates a new "wrapped" component, complicating the React tree
- Only supports a single child, must be a component
- Requires additional compatibility code to work like a "normal" component

**Compatibility code?** The HOC below adds some extra stuff that all HOCs need (as recommended in the React documentation). Because of how HOCs subvert the normal React rendering tree, we need to **1.** [copy over static methods](https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over) and **2.** [forward refs](https://reactjs.org/docs/higher-order-components.html#refs-arent-passed-through).

You can see an example in the [code for the `withRouter` HOC](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/withRouter.js) from react-router. They use `hoistStatics` and `wrappedComponentRef` to get around those issues.

Notice also that `withRouter` follows the convention of **3.** [wrapping the display name](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) to make wrapped components easier to debug.

```js
import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import classnames from "classnames";

import styles from "./row.css";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const row =
  ({ backgroundColor, className, style }) =>
  (WrappedComponent) => {
    // Create a new merged component
    const Row = ({ wrappedComponentRef, ...otherProps }) => (
      <div
        class={classnames(styles.row, className)}
        style={{ backgroundColor, ...style }}
      >
        <WrappedComponent ref={wrappedComponentRef} {...otherProps} />
      </div>
    );

    // 3. remember to set the displayName
    Row.displayName = `Row(${getDisplayName(WrappedComponent)})`;

    // 2. remember to forward refs
    Row.propTypes = {
      wrappedComponentRef: PropTypes.func,
    };

    // 1. remember to hoist statics
    return hoistStatics(Row, WrappedComponent);
  };

export default row;
```

### Creating a wrapper `<Row />` instead

So, what's a better way to do it? If you look closely at the example above, you can see that the guts of the HOC are a simple `Row` component that wraps our `WrappedComponent` in a `div`. You don't need an HOC for that! You can use a normal wrapper component instead.

Below you can see that we've re-written the HOC into a plain old wrapper component. A wrapper component is like a `<div />`. It accepts arbitrary `children` instead of a `WrappedComponent`. In this case it's preferred to use a regular component because it makes it so much easier to follow what's going on.

Also notice that the configuration object that we passed to the `row` HOC works equally as well as props on the `Row` wrapper component. This makes it easier to validate props!

**Benefits of a plain wrapper component:**

- Accepts _anything_ as children
- Just a component, keeps the React tree clear
- Prop type checking!
- No compatibility code needed
- No need to spread props!

```js
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./row.css";

const Row = ({ backgroundColor, children, className, style }) => (
  <div
    class={classnames(styles.row, className)}
    style={{ backgroundColor, ...style }}
  >
    {children}
  </div>
);

Row.propTypes = {
  backgroundColor: PropTypes.string.isRequired(),
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Row;
```

**Notice:** `children` is a `PropTypes.node` which allows it to be "any renderable value". This means that you can provide plain text or an array of nodes or anything else that React can render. By contrast, an HOC requires you to pass a `WrappedComponent`, which must be a full React component.

### Using a wrapper component

How do we apply a wrapper component instead of an HOC? When our "wrapper" is a regular component we have multiple options for how to use it!

#### Manually wrap

One common case would be to manually wrap `<MyThing />` with a `<Row />` everywhere it's needed. Here you can see that we're using both of these components together in the `<Somewhere />` component.

The benefit here is that we can keep give the implementor total control.

The downside to this approach is that you need to do this _everywhere_ that you use `<MyThing />`.

```js
// Option 1: manually wrap MyThing
import React from "react";
import Row from "utils/Row";
import MyThing from "./MyThing";

const Somewhere = () => (
  <div>
    {/* ... */}
    <Row backgroundColor="green">
      <MyThing name="hello" />
    </Row>
  </div>
);

export default Somewhere;
```

#### Integrate the wrapper

If you know that you _always_ want your component to be wrapped in a `<Row />` you can integrate it directly into the component that needs it. Conceptually, this is like using a `<div />` or a `<span />`. Below you can see that we're using `<Row />` instead of using a top-level `<div />`. The `Row` component allows you to define whatever you would like for your `children`. You can think of `MyThing` as a `Row` with pre-defined children.

The benefit here is that `MyThing` will always be properly wrapped in a `Row`. Below you can see that (as an example) we are forcing the `backgroundColor` to always be "green".

The downside to this approach is that you need to pipe props into the `Row` component if you want it to be configurable from the outside. Below you can see that we pass the `className` and `style` props to maintain that functionality.

**NOTE:** This approach is closest to how the HOC works but it doesn't break the React tree. This is also very similar to how a render props would work.

```js
// Option 2: MyThing integrates the Row wrapper
import React from "react";
import PropTypes from "prop-types";

import Row from "utils/Row";

const MyThing = ({ className, name, style }) => (
  <Row backgroundColor="green" className={className} style={style}>
    Hello, {name}!
  </Row>
);

MyThing.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
};

export default MyThing;
```

## Using Render Props

In the case of our `Row` component, we can use declarative JSX instead of using an HOC. This works because we don't need the children of `Row` to receive any derived props. Things get tricky when you need your `children` to know about derived props.

How do we pass derived props from a component to its children? The answer is render props.

In short, a render prop component accepts a `render` prop, which is a function that's used to render its children. Instead of rendering children normally, the render prop component calls the render function and uses the result as the children. This allows the render prop component to provide derived props to the render function.

Sound confusing? In practice it's very similar to the way an HOC works. If you've ever used the [`<Route />`](https://reacttraining.com/react-router/web/api/Route) component from react-router you've already used a render prop! That's where the idea originally came from.

**Key idea:** using render props allows your wrapper to pass derived props to its children.

### A fake `Connect` render prop component

For fun, let's reimagine the `connect()` HOC as a render props component. We'll have it accept the same props as the normal `connect` function as well as an additional `render` prop.

Notice the similarity between the container code below and the container we made above with the traditional `connect` HOC. The only substantive difference is that our `MyThingContainer` is now a normal component that simply wraps our `MyThing` component with our new imaginary `Connect` render props component.

You can see below that the biggest advantage of this syntax is that it's now super clear where the `MyThing` component is getting its props from. Notice the way `MyThing` gets props from both `Connect` and `MyThingContainer`. It's typical for an HOC to spread props to the `WrappedComponent`, but a render props component doesn't need to worry about that step.

**Note:** you'll need to use your imagination about the internals of the `Connect` render props component. If you are interested in how it would work, see [the discussion here](https://github.com/reduxjs/react-redux/issues/799).

```js
// Connect as a render-prop component

import React from "react";
import { Connect } from "@fake/react-redux";

import { selectName } from "modules/things/selectors";
import { onChangeName } from "modules/things/actions";
import MyThing from "./MyThing";

const mapStateToProps = (state) => ({
  name: selectName(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeName: (name) => {
    dispatch(updateName(name));
  },
});

const MyThingContainer = (props) => (
  <Connect
    mapStateToProps={mapStateToProps}
    mapDispatchToProps={mapDispatchToProps}
    render={({ name, onChangeName }) => (
      <MyThing name={name} onChangeName={onChangeName} {...props} />
    )}
  />
);

export default MyThingContainer;
```

### Creating a render-props `Row`

Let's apply the render-props technique to our new `Row` wrapper component!

For fun, we want to enable our row's children to conditionally render themselves based on if they are on screen or not. We'll use [`@researchgate/react-intersection-observer`](https://github.com/researchgate/react-intersection-observer) to manage this. And we'll use render props to expose the derived `visible` prop to our children.

The `visible` boolean indicates whether or not the row is currently visible on screen. Under the hood this relies on the [`IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to determine if the row is "intersecting" the browser viewport. We'll update the `Row`'s `visible` state whenever its `isIntersecting` property changes.

Below you can see that we've wrapped our `<div />` with an `<Observer />`. To enable the render props technique we need to add three new props to our `Row` component.

- `children` must now be a `func` instead of a `node`
- `component` accepts a React component to render
- `render` must be a `func` as well

Why three props? This allows us to support multiple use cases. Because render props are a somewhat new pattern, there are a few different ways that people have been using them. See the "Generic Render Props" template at the end of this document for a deeper explanation. All three props are mutually exclusive, meaning you should only use one of them at a time.

For our purposes, let's focus on the `render` prop. This is the most flexible and the clearest way to use render props.

Compare the `Row` render props component below with the regular `Row` wrapper component we created above.

```js
// Render props Row

import React, { Component } from "react";
import PropTypes from "prop-types";
import renderProps from "render-props";
import classnames from "classnames";
import Observer from "@researchgate/react-intersection-observer";

import styles from "./row.css";

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange({ isIntersecting }) {
    const { visible } = state;
    if (visible !== isIntersecting) {
      this.setState({ visible: isIntersecting });
    }
  }

  render() {
    const { backgroundColor, children, className, component, render, style } =
      this.props;
    const { visible } = this.state;
    const componentOrFunction = component || render || children;

    return (
      <Observer onChange={this.handleOnChange}>
        <div
          class={classnames(styles.row, className)}
          style={{ backgroundColor, ...style }}
        >
          {renderProps(componentOrFunction, { visible })}
        </div>
      </Observer>
    );
  }
}

Row.propTypes = {
  backgroundColor: PropTypes.string.isRequired(),
  children: PropTypes.func,
  className: PropTypes.string,
  component: PropTypes.func,
  render: PropTypes.func,
  style: PropTypes.object,
};

export default Row;
```

### Using our render-props `Row`

Now we can see it in action. We need to update our `MyThing` component from the integrated wrapper `Row` example from above to support the new render-props `Row`. Using a render prop allows our component to receive a `visible` prop when it is visible on screen. We use that to conditionally render `null` when it is not on screen.

**Why render `null`?** For this example there's no good reason. However, if you had a computationally expensive component you might want to avoid rendering it when it isn't visible. You could use this technique to improve the render performance of your page in some circumstances.

Compare this `MyThing` component using a render-props `Row` to the `MyThings` component we made above with an integrated `Row` wrapper. Notice that `MyThing` accepts the same props as it did before.

```js
import React from "react";
import PropTypes from "prop-types";

import Row from "utils/Row";

const MyThing = ({ className, name, style }) => (
  <Row
    backgroundColor="green"
    className={className}
    style={style}
    render={({ visible }) => {
      if (!visible) {
        return null;
      }
      return `Hello, ${name}!`;
    }}
  />
);

MyThing.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
};

export default MyThing;
```

## A generic render props component

We can follow the example set by `<Route />` as well as the [`render-prop`](https://www.npmjs.com/package/render-props) package and create a general purpose template to use as the basis for any render-props component.

A generic render-props component _must_ accept 3 props, `children`, `component` and `render`. You'll recognize the `render` prop from the examples above. Although it is [somewhat frowned upon](https://americanexpress.io/faccs-are-an-antipattern/), it is popular to support using [`children` as a function](https://reactjs.org/docs/render-props.html#using-props-other-than-render) to provide the render function. And finally, based on how `<Route />` works, you may want to simply supply a `component` to render.

Only one of those props will be used. By convention, we have the `component` prop override the `render` props, which overrides `children`. You can see in the [code for the `Route` component](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js) that they use the `warning` and `invariant` libraries to warn users when they provide conflicting props.

- Allows `render` or `children` to define the render prop function
- Allows `component` to enable straight rendering
- Prefers `component` and transparently falls back to `render` and `children`
- _Optional:_ Transparently merges `otherProps` with derived props

```js
import React, { Component } from "react";
import PropTypes from "prop-types";
import renderProps from "render-props";

class GenericRenderPropsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: false,
    };
    this.handleOnSomething = this.handleOnSomething.bind(this);
  }

  handleOnSomething(value) {
    const { something } = state;
    if (something !== value) {
      this.setState({ something: value });
    }
  }

  render() {
    const { children, component, render, ...otherProps } = this.props;
    const { something } = this.state;

    const componentOrFunction = component || render || children;
    const props = {
      ...otherProps,
      onSomething: this.handleOnSomething,
      something,
    };

    return componentOrFunction ? renderProps(componentOrFunction, props) : null;
  }
}

GenericRenderPropsComponent.propTypes = {
  children: PropTypes.function,
  component: PropTypes.function,
  render: PropTypes.function,
};

export default GenericRenderPropsComponent;
```

### Open questions?

- See [answers to common questions about render props](https://blog.kentcdodds.com/answers-to-common-questions-about-render-props-a9f84bb12d5d)
