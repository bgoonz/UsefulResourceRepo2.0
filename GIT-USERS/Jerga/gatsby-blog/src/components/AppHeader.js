import React from "react";
import { Link } from "gatsby";

export default function AppHeader({ seo }) {
  return (
    <nav className="navbar is-transparent mb-5 p-5">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h1 className="title">CODE_SPACE</h1>
        </Link>
        <div
          className="navbar-burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/blogs">
            Blogs
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a
                  className="bd-tw-button button"
                  data-social-network="Twitter"
                  data-social-action="tweet"
                  data-social-target="https://eincode.com"
                  rel="noreferrer"
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?text=Hello World&hashtags=eincode&url=https://eincode.com`}
                >
                  <span>Tweet</span>
                </a>
              </p>
              <p className="control">
                <a className="button is-primary" href="/">
                  <span>Login</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
