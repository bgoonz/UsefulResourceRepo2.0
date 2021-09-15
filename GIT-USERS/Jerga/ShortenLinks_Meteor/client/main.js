import React from "react";
import ReactDOM from "react-dom";
import LinkCreate from "./components/link_create";
import { Links } from "../import/collections/links";
import LinkList from "./components/link_list";

import Header from "./components/header";

const App = () => {
  return (
    <div>
      <Header />
      <LinkCreate />
      <LinkList />
    </div>
  );
};

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector(".render-target"));
});
