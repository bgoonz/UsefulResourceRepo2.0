import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";
import { Route } from "react-router";
import React, { Component } from "react";
import styled, { injectGlobal } from "styled-components";

import About from "./About";
import ActivityLog from "./ActivityLog";
import ActivityLogItem from "./ActivityLogItem";
import Member from "./Member";
import Members from "./Members";
import Menu from "./Menu";
import store, { history } from "./store";

const Wrapper = styled.section`
  background: #fff;
  margin: auto;
  max-width: 425px;
  outline: 1px solid #aaa;
`;

//eslint-disable-next-line no-unused-expressions
injectGlobal` 
  body {
    background: #eee;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Wrapper>
            <Menu />
            <Route exact path="/" component={ActivityLog} />
            <Route exact path="/log/:id" component={ActivityLogItem} />
            <Route exact path="/members" component={Members} />
            <Route exact path="/members/:id" component={Member} />
            <Route exact path="/about" component={About} />
          </Wrapper>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
