import Link from "redux-first-router-link";
import React from "react";

import { toRegister } from "store/routerActions";

import AuthBoxOuter from "shared/AuthBoxOuter";
import Separator from "shared/Separator";

import EmailPasswordForm from "./EmailPasswordform";

const LoginBox = () => (
  <>
    <div className="mb-3 text-center">
      <Link className="btn btn-link" to={toRegister()}>
        New user?
      </Link>
    </div>

    <AuthBoxOuter>
      <a className="btn btn-primary btn-block" href="/api/login/facebook">
        Sign in with facebook
      </a>

      <Separator>or</Separator>

      <EmailPasswordForm />
    </AuthBoxOuter>
  </>
);

export default LoginBox;
