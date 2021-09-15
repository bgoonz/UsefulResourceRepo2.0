import React from "react";
import ReactDOM from "react-dom";

require("bootstrap-sass!../bootstrap-sass.config.js");

const App = () => {
  return <div> My App BoilerPlate </div>;
};

ReactDOM.render(<App />, document.querySelector(".app"));
