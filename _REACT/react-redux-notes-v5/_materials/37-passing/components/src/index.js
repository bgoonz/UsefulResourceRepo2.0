import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";

if (module.hot) {
  module.hot.accept();
}

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetail author="Sam" />
      <CommentDetail author="Alex" />
      <CommentDetail author="Jane" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
