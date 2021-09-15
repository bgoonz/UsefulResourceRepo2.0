import React, { Component } from "react";
import Layout from "../components/BaseLayout.js";
import auth0Client from "./../services/Auth";
import { withRouter } from "next/router";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.router.push("/");
  }

  render() {
    return (
      <Layout headerType={"none"}>
        <p>Loading profile...</p>
      </Layout>
    );
  }
}

export default withRouter(Callback);
