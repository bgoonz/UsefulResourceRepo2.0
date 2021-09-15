import Link from "redux-first-router-link";
import React from "react";

import Loader from "shared/Loader";
import LoginStatus from "./LoginTimer";

import { toAdmin } from "store/routerActions";

const Label = ({ children }) => <div className="col-3">{children}</div>;
const Value = ({ children }) => <div className="col-9">{children}</div>;

const Profile = ({ currentUser, isLoading }) => (
  <Loader isLoading={isLoading}>
    <div className="mt-3 mb-3 bg-gray p-3 rounded">
      <div className="row">
        <Label>Name:</Label>
        <Value>{currentUser.name}</Value>
      </div>

      <div className="row">
        <Label>Email:</Label>
        <Value>{currentUser.email}</Value>
      </div>

      <hr />

      <LoginStatus />
    </div>

    {currentUser.isAdmin && (
      <div className="text-right">
        <Link className="" to={toAdmin()}>
          admin <i className="fa fa-arrow-right" />
        </Link>
      </div>
    )}
  </Loader>
);

export default Profile;
