var React = require("react");
var ReactDOM = require("react-dom");
var { Route, Router, IndexRoute, hashHistory } = require("react-router");

//Load Foundation
$(document).foundation();

// App css
require("style!css!sass!applicationStyles");

ReactDOM.render(<p> ReactBoilerplate3 </p>, document.getElementById("app"));
