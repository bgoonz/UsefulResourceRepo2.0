import React from "react";
import { NavLink } from "redux-first-router-link";

import { toHome, toLogin, toProfile } from "store/routerActions";

const NavbarItem = ({ children, className, onClick, to }) => (
  <li className="nav-item">
    <NavLink
      className={"nav-link " + className}
      exact
      onClick={onClick}
      to={to}
    >
      {children}
    </NavLink>
  </li>
);

const CurrentUserNavbarItems = ({ isLoading, isLoggedIn, logout }) => {
  if (isLoading) return null;

  if (isLoggedIn)
    return (
      <>
        <NavbarItem to={toProfile()}>Profile</NavbarItem>
        <NavbarItem to="/logout" onClick={logout}>
          Logout
        </NavbarItem>
      </>
    );

  return (
    <NavbarItem className="pr-0" to={toLogin()}>
      Login
    </NavbarItem>
  );
};

const Navbar = ({ isLoading, isLoggedIn, logout }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white rounded-bottom pl-0 pr-0">
      <ul className="navbar-nav">
        <NavbarItem className="pl-0" to={toHome()}>
          Home
        </NavbarItem>
      </ul>

      <ul className="navbar-nav ml-auto">
        <CurrentUserNavbarItems
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          logout={logout}
        />
      </ul>
    </nav>
  );
};

export default Navbar;
