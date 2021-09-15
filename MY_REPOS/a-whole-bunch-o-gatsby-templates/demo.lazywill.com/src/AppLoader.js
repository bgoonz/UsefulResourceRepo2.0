import React, { Component } from "react";
import Loadable from "react-loadable";
import Loading from "./components/shared/Loading/";

const AsyncAppWrapper = Loadable({
  loader: () => import("./AppWrapper"),
  loading: Loading
});

class AppLoader extends Component {
  render() {
    return <AsyncAppWrapper />;
  }
}

export default AppLoader;
