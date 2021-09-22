import React, { useContext } from "react";
import Link from "next/link";
import { ApolloConsumer } from "react-apollo";

import { AuthContext } from "../context";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <ApolloConsumer>
      {(client) => (
        <nav className="navbar fixed-top navbar-expand-md navbar-light bg-warning">
          <div className="container">
            <Link href="/">
              <a className="navbar-brand">goodWork</a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link href="/howitworks">
                    <a className="nav-link">How it works</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/private">
                    <a className="nav-link">Private</a>
                  </Link>
                </li>

                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link href="/signup">
                        <a className="nav-link">Sign up</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/login">
                        <a className="nav-link">Log in</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={async () => {
                        logout();
                        await client.cache.reset();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}
    </ApolloConsumer>
  );
};

export default Navbar;
