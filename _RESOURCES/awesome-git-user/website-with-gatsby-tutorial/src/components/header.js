import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import "../styles/header.scss";

const Header = () => {
  const data = useStaticQuery(graphql`
    query headerQuery {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `);
  return (
    <div className="header">
      <div className="header-top-content">
        <Link className="header-top-content-title" to="/">
          <h1>{data.site.siteMetadata.title}</h1>
        </Link>
      </div>
      <div className="header-bottom-content">
        <div className="header-bottom-content-links">
          <Link className="header-bottom-content-links-link" to="/">
            Home
          </Link>
          <Link
            className="header-bottom-content-links-link"
            to="/tags/entertainment"
          >
            Entertainment
          </Link>
          <Link
            className="header-bottom-content-links-link"
            to="/tags/politics"
          >
            Politics
          </Link>
          <Link className="header-bottom-content-links-link" to="/tags/sports">
            Sports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
