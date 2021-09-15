import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "./store/authentication";

const LogoutButton = () => {
  const loggedOut = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return loggedOut ? (
    <Redirect to="/login" />
  ) : (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default LogoutButton;
