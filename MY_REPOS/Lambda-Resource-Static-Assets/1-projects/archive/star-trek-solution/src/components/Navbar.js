import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../AppContextProvider";

const Navbar = () => {
  const { decks } = useContext(AppContext);

  return (
    <div className="navbar">
      <div className="navbar-menu">
        <NavLink
          to={`/store`}
          activeClassName="is-selected"
          className="navbar-item"
        >
          Shop{" "}
        </NavLink>{" "}
        {decks.map((deck, i) => {
          return (
            <NavLink
              to={`/deck/${i}`}
              className="navbar-item"
              activeClassName="is-selected"
              key={i}
            >
              {deck.name}{" "}
            </NavLink>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
};

export default Navbar;
