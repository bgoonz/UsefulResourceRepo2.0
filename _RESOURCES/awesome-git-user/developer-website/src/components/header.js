import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import "./styles.css";

export default function Header({ isOpen }) {
  const data = useStaticQuery(graphql`
    query headerQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const title = data.site.siteMetadata.title;

  return (
    <div className="header">
      <h2 className="title">
        <Link to="/">{title}</Link>
      </h2>
      <nav className="links">
        <Link to="/">
          <p className="nav-link">home</p>
        </Link>
        <Link to="/about">
          <p className="nav-link">about</p>
        </Link>
        <Link to="/portfolio">
          <p className="nav-link">portfolio</p>
        </Link>
        <Link to="/posts">
          <p className="nav-link">posts</p>
        </Link>
      </nav>
      <button className="dropdown" onClick={isOpen}>
        &#8801;
      </button>
    </div>
  );
}
