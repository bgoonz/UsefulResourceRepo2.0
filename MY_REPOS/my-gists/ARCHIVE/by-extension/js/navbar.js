import Link from "next/link";
import auth0 from "../services/auth0";
import React from "react";

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      {" "}
      Login{" "}
    </span>
  );
};

const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      {" "}
      Logout{" "}
    </span>
  );
};

// const Navbar = (props) => {
export default class Navbar extends React.Component {
  render() {
    const {
      auth: { isAuthenticated },
    } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            Idea Pool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {/* {isAuthenticated && <li className="nav-item active">
                                <Link href="/">
                                    <a className="nav-link" >Home <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>}
                            {isAuthenticated && <li className="nav-item">
                                <Link href="/About"><a className="nav-link" >About</a></Link>
                            </li>}

                            {isAuthenticated && <li className="nav-item">
                                <Link href="/Contact"><a className="nav-link" >Contact</a></Link>
                            </li>} */}
              <li className="nav-item active">
                <Link href="/">
                  <a className="nav-link">
                    Home <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/About">
                  <a className="nav-link">About</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/Contact">
                  <a className="nav-link">Contact</a>
                </Link>
              </li>
              {!isAuthenticated && (
                <li className="nav-item">
                  <Login />
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <Logout />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

// export default Navbar
