import React, { useState, useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import gql from "graphql-tag";

import { AuthContext } from "../context";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const SignInBox = ({ setAuthFailed, apolloClient }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  return (
    <>
      <form
        className="form-signin mt-5"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const signinPromise = apolloClient.query({
              query: LOGIN,
              variables: { email, password },
            });
            setLoading(true);
            const { data } = await signinPromise;
            login(data.login.token);
            Router.push("/"); // TODO: change redirect path to user profile or something
          } catch {
            setAuthFailed(true);
            setTimeout(() => {
              // Remove alert after 3s
              setAuthFailed(false);
            }, 3000);
          }
          setLoading(false);
        }}
      >
        <h1 className="mb-3">Sign In</h1>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoFocus
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-25 float-left"
          disabled={loading}
        >
          {loading ? "Signing In" : "Sign In"}
        </button>
        <div className="clearfix">
          Don&#39;t have an account?{" "}
          <Link href="/signup">
            <a>Create one</a>
          </Link>
        </div>
      </form>
      <style jsx>{`
        .form-signin .form-control {
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default SignInBox;
