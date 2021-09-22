import React from "react";
import { ApolloConsumer } from "react-apollo";

import Layout from "../components/layouts/Layout";
import SignUpBox from "../components/SignUpBox";

const Signup = () => {
  return (
    <ApolloConsumer>
      {(client) => (
        <Layout>
          <div className="box-container">
            <SignUpBox apolloClient={client} />
          </div>
          <style jsx>{`
            .box-container {
              text-align: center;
              width: 100%;
              max-width: 400px;
              margin: auto;
              padding-top: 40px;
              padding-bottom: 40px;
            }
          `}</style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};

export default Signup;
