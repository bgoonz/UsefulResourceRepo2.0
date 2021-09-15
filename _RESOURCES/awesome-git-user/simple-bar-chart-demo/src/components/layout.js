import React, { Fragment } from "react";
import { Link } from "gatsby";

import "./layout.css";
import "./componentStyles.css";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <header>
        <Link to="/" style={{ textDecoration: `none` }}>
          <h2>My Data Science Blog</h2>
        </Link>
      </header>
      <Link
        to="/examplechart"
        style={{ textDecoration: `none`, float: `right`, paddingRight: `30px` }}
      >
        More Examples
      </Link>
      <div>{children}</div>
    </Fragment>
  );
};

export default Layout;
