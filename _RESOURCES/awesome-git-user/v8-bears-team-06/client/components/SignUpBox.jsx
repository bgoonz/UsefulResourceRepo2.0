import React, { useState } from "react";
import gql from "graphql-tag";

export const addUserMutation = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      email
      password
    }
  }
`;

const SignUpBox = ({ apolloClient }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <>
      <form className="form-signin mt-5">
        <h1 className="mb-3">Sign Up</h1>
        <div className="form-group">
          <label htmlFor="email" className="float-left required">
            Email address
          </label>
          <input
            data-testid="emailVal"
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            autoFocus
            required
          />
          <small
            id="emailHelp"
            className="form-text text-muted float-left mb-3"
          >
            We&apos;ll never share your email with anyone else.
          </small>
          <br />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="float-left required">
            Password
          </label>
          <input
            data-testid="passVal"
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <small
            id="passwordHelp"
            className="form-text text-muted float-left mb-3"
          >
            Must contain at least 6 alphanumeric characters.
          </small>
          <br />
        </div>

        <button
          data-testid="submitBtn"
          type="submit"
          className="btn btn-primary float-left"
          onClick={async (event) => {
            setErrorMessage("");
            setSuccessMessage("");
            event.preventDefault();
            if (password.length < 6) {
              return setErrorMessage(
                "Password must be at least 6 characters in length"
              );
            }
            let passRegEx = /^[a-z0-9]+$/i;
            if (passRegEx.test(password) === false) {
              return setErrorMessage(
                "Password must only contain alphanumeric characters"
              );
            }

            const { data } = await apolloClient.mutate({
              mutation: addUserMutation,
              variables: { email, password },
            });
            if (data.addUser.email === "empty") {
              setErrorMessage("You must enter a valid email address");
            } else if (data.addUser.email === "taken") {
              setErrorMessage("That email address is already in use.");
            } else {
              setSuccessMessage("Your account has been created!");
            }
            setEmail("");
            setPassword("");
          }}
        >
          Sign Up
        </button>
      </form>
      {errorMessage.length ? (
        <p data-testid="messageVal" className="text-center text-danger">
          {errorMessage}
        </p>
      ) : (
        successMessage.length > 0 && (
          <p data-testid="messageVal" className="text-center text-success">
            {successMessage}
          </p>
        )
      )}

      <style jsx>{`
        .form-signin {
          text-align: center;
          width: 100%;
          max-width: 400px;
          margin: auto;
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .form-signin .form-control {
          padding: 10px;
        }

        .required:after {
          content: "*";
          color: red;
          padding-left: 5px;
        }
      `}</style>
    </>
  );
};

export default SignUpBox;
