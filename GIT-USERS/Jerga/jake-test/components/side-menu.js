import React from "react";
import { slide as Menu } from "react-burger-menu";

const Nav = () => (
  <Menu>
    <a id="home" className="menu-item" href="/">
      Home
    </a>
  </Menu>
);

export default Nav;
