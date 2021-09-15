// require() some stuff from npm (like you were using browserify)
// and then hit Run Code to run it on the right
var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      React.createElement("div", {className: "example"},
        React.createElement("h1", null, "Example Component"),
        React.createElement("ul", null, React.createElement("li", null, "One item"), React.createElement("li", null, "Another item"))
      )
    );
  }
});

React.render(React.createElement(App, {}), document.querySelector('#content'));