# Using React Context API to Manage State & Interaction Across Components

> React’s Context API lets you easily share context between components. This article shows you how to use the Context API to manage state and interactions across multiple components.

When developing user interfaces that require complex interactions between components, it’s important to ensure that these interactions are managed in a simple and cohesive way. Application state often needs to be shared across multiple components, while user actions may need to update this state in many places. As an application grows, managing these interactions and state updates can be tricky, and declaring these interactions in a way that is easy to make sense of becomes increasingly important.

[React](https://reactjs.org/) provides a simple and intuitive way to manage component state. However, managing and updating state across multiple components is more challenging. We often find ourselves passing state and event handlers as props throughout child components, many of which may not be directly using those props. This can lead to a tangled mess of [prop drilling](https://blog.kentcdodds.com/prop-drilling-bb62e02cb691), which can make the application more difficult to understand and reason with.

State management libraries like [Redux](https://redux.js.org/) and [Mobx](https://mobx.js.org/) offer solutions to some of these issues. However, while there are many compelling reasons to choose these tools, it’s also important to consider whether the additional complexity that these tools introduce are necessary for your use case. In fact, with React’s new and improved Context API, [you might not need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367) at all.

React Context API
-----------------

### What is it?

React’s [Context API](https://reactjs.org/docs/context.html) is a simple mechanism that allows you to easily share context between components, without directly passing props. If you’ve ever used [React Router](https://reacttraining.com/react-router/) or [Redux](https://redux.js.org/), you’ve used the Context API indirectly. While the Context API was previously considered unstable and was strongly discouraged for application development, all of that has changed with the release of [React 16.3](https://reactjs.org/blog/2018/03/29/react-v-16-3.html). Now, there is a simple, stable API, which means that we can use it in our applications!

Let’s take a look at how we can use the Context API to manage state and interactions across multiple components.

### How Does it Work?

First, we need to create a context:

    const { Provider, Consumer } = React.createContext("defaultValue");
    

`React.createContext` accepts an optional `defaultValue` argument, and returns two components: Provider and Consumer. Let’s take a look at the Provider first:

    <Provider value="Hello World!">
      {  /* Insert any kind of child components here */  }
    </Provider>
    

The Provider component accepts a special prop called `value`, which can be any arbitrary piece of data: a string, array, object, etc. If no `value` prop is provided, the `defaultValue` argument is used instead. We can then nest any number of Consumer components inside of the Provider. The Consumer component requires a function as its child. This function (commonly referred to as a [Render Prop](https://reactjs.org/docs/render-props.html)) provides access to the `value` prop passed to the Provider as an argument:

    // returns <p>Hello World!</p>
    <Consumer>
      {(message) =>  <p>{message}</p>}
    </Consumer>
    

At first, this seems… underwhelming. But consider two important points:

1.  A Consumer can be deeply nested within a Provider and still have access to the Provider’s value without passing any props.
    
2.  A Provider’s value can be any piece of data, including an object. This means that we can easily pass both state and event handlers to any nested component!
    

This is a simple but powerful concept, which allows us to declare layout and functionality in a way that is easy to follow and helps prevent a tangled mess of props from being passed around to various components. This approach provides versatility when composing components—we can easily move things around without needing to rewire components and wrangle props.

A Practical Use Case
--------------------

Below is a simple RGB color selector:

Here, our `ColorSelector` component is composed of three “input" components (slider inputs for Red, Green, and Blue) and several “output" components. These “output" components display the color, RGB, and Hex Code values. In this case, a change to _any_ input component will affect _every_ output component. Using the Context API, we’re able to manage these interactions without explicitly passing props everywhere. This allows us the flexibility to easily restructure and refactor our component design.

Let’s pick out a few important pieces, starting with the `ColorSelector` component:

    class ColorSelector extends Component {
      constructor(props) {
        super(props);
        this.state = {
          red:  240,
          green:  220,
          blue:  110
        };
        this.update = color  => this.setState(color);
      }
      render() {
        const { update } = this;
        const  colors = this.state;
        return (
          <Provider  value={{ colors, update }}>
            <UI  />
          </Provider>
        );
      }
    }
    
    

Notice that this component is only concerned with tracking and updating the state, and passing that state to the Provider. It doesn’t need to concern itself with correctly wiring together props and passing them down to subcomponents. Instead, the subcomponents are wrapped in a Consumer. Essentially, we are using the `ColorSelector` as a central messaging hub, or [mediator](https://sourcemaking.com/design_patterns/mediator), for communication between subcomponents.

Now let’s look at `RgbDisplay`, one of the “output" components:

    const RgbDisplay = () => (
      <Consumer>
        {({ colors: { red, green, blue } }) => (
          <p>
            rgb({red}, {green}, {blue})
          </p>
        )}
      </Consumer>
    );
    

By wrapping this component with a Consumer, we are able to access color values stored in the state of `ColorSelector`. Whenever a color value is updated in state, this component will re-render.

Finally, let’s look at `ColorInput`, one of the “input" components:

    const  ColorInput = ({ colorName }) => (
      <Consumer>
        {({ colors, update }) => (
          <label>
            <input
              type="range"
              min="0"
              max="255"
              value={colors[colorName]}
              onChange={e  =>  update({ [colorName]:  e.target.value })}
            />
            {colorName}
          </label>
        )}
      </Consumer>
    );
    

Here, in addition to accessing `ColorSelector` state to set the input value, we also access the `update` method, which allows us to update the state with a new value when the input is changed. This will propagate the state change to every `Consumer` for the `Provider`.

By leveraging the Context API for this implementation, we’re able to create a flexible composition that is resilient to changes in structure.

Sounds Good, What’s the Catch?
------------------------------

The Context API is highly useful but it’s not intended for every use case. From the React docs:

> Don’t use context just to avoid passing props a few levels down. Stick to cases where the same data needs to be accessed in many components at multiple levels.

Consider whether your interactions have grown complex enough to warrant using Context. Otherwise, it may be less painful to just pass props instead.

There are [a few other caveats](https://reactjs.org/docs/context.html#caveats) to consider as well but, overall, React’s new Context API is a great tool to keep in your development arsenal.


[Source](https://sparkbox.com/foundry/react_context_api_state_management)
