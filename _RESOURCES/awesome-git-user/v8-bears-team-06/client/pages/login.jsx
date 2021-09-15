import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";

import Layout from "../components/layouts/Layout";
import Alert from "../components/atom/Alert";
import SignInBox from "../components/SignInBox";

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);

  return (
    <ApolloConsumer>
      {(client) => (
        <Layout>
          <div className="box-container">
            <SignInBox apolloClient={client} setAuthFailed={setAuthFailed} />
            {authFailed && (
              <div className="mt-3">
                <Alert variant="danger">
                  username or password is incorrect
                </Alert>
              </div>
            )}
          </div>
          <style jsx>
            {`
              .box-container {
                text-align: center;
                width: 100%;
                max-width: 400px;
                margin: auto;
                padding-top: 40px;
                padding-bottom: 40px;
              }
            `}
          </style>
        </Layout>
      )}
    </ApolloConsumer>
  );
};

export default Login;
