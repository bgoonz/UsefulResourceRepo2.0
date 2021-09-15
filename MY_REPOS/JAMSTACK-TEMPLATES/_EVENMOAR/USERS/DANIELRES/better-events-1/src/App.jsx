import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import { Col, Grid, PageHeader, Row } from "react-bootstrap";
import Link from "redux-first-router-link";
import React, { Component } from "react";
import styled from "react-emotion";

const Header = styled(PageHeader)`
  margin: 0;
  padding: 0;
  h1 {
    font-size: 18px;
    margin: 0;
    padding: 10px 0;
  }
  a {
    color: inherit;
    &:hover {
      color: inherit;
      text-decoration: none;
      border-bottom: 1px solid gray;
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Grid>
        <Header>
          <Link to={{ type: "HOMEPAGE" }}>Better Events</Link>
          <div className="pull-right">
            <small>
              <Link to={{ type: "ADMINPAGE" }}>admin</Link>
            </small>
          </div>
        </Header>
        <Row>
          <Col xs={12} md={12}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
