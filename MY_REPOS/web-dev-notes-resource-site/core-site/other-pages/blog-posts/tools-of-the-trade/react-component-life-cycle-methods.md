

Components sometimes need to call certain functions or run other bits of code at various points during their lifecycle. For example, a component might need to fetch new data from the server once it has been mounted to the DOM. Code for these actions live in a component's **lifecycle methods**.

Take a look at this code snippet and then read below for a brief explanation.

    class MyAjaxComponent extends React.Component {
      constructor() {
        super();
        this.state = {items: []};
      }

      componentDidMount() {
        $.ajax({
          url: '/items',
          success: response => this.setState({items: response});
        });
      }

      render() {
        if (this.state.items.length === 0) {
          return (
            <div>Fetching Items...</div>
          );
        } else {
          return (
            <ul>
              {this.state.items.map(item => <li>{item}</li>)}
            </ul>
          );
        }
      }
    };

In the example above, `MyAjaxComponent` initially renders as `<div>Fetching Items...</div>`. `MyAjaxComponent` calls `componentDidMount()` once it has successfully been rendered onto the DOM. `componentDidMount()` sends an asynchronous request for the information `MyAjaxComponent` needs to display. The ajax request calls `this.setState()` when the information is received, causing a re-rendering with the updated information.

Check out [the official documentation](https://facebook.github.io/react/docs/component-specs.html) for details on other component lifecycle methods that you may need. Commonly used ones include:

- `componentDidMount`
- `componentWillUnmount`
- `componentDidUpdate`

Did you find this lesson helpful?

[Source](https://open.appacademy.io/learn/full-stack-online/react/lifecycle-methods)
