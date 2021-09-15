var React = require("react");
var ReactDOM = require("react-dom");
var { Route, Router, IndexRoute, hashHistory } = require("react-router");

var Main = require("Main");
var Weather = require("Weather");
var About = require("About");
var Example = require("Example");

//Load Foundation
require("style!css!foundation-sites/dist/foundation.min.css");
$(document).foundation();

// App css
require("style!css!sass!applicationStyles");

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={About} />
      <Route path="example" component={Example} />
      <IndexRoute component={Weather} />
    </Route>
  </Router>,
  document.getElementById("app")
);
