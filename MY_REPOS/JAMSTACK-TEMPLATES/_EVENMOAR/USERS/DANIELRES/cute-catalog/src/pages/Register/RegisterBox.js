import React from "react";

import AuthBoxOuter from "shared/AuthBoxOuter";
import Separator from "shared/Separator";

import RegisterForm from "./RegisterForm";

const LoginBox = () => (
  <AuthBoxOuter>
    <a className="btn btn-primary btn-block" href="/api/login/facebook">
      Register with facebook
    </a>

    <Separator>or</Separator>

    <RegisterForm />
  </AuthBoxOuter>
);

export default LoginBox;
