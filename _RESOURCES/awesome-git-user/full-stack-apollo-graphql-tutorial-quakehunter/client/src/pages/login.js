import React from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import LoginForm from "../components/loginform";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

function Login() {
  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login);
      if (login) {
        client.writeData({ data: { isLoggedIn: true } });
      }
    },
  });
  if (loading) return <p>Loading,... Please wait.</p>;
  if (error) return <p>An error occurred</p>;
  return (
    <div>
      <LoginForm login={login} />
    </div>
  );
}

export default Login;
