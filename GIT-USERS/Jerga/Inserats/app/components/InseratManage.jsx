import React, { Component } from "react";

import InseratsAdd from "./InseratsAdd";
import ViewInserat from "./ViewInserat";

class InseratManage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inserats-app">
        <InseratsAdd />
      </div>
    );
  }
}

export default InseratManage;
