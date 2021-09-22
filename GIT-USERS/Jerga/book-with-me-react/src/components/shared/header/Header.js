import React from "react";
import { Link } from "react-router-dom";
import RentalSearch from "components/rental/RentalSearch";

export function Header(props) {
  const { isAuth, username, invalidateUser } = props;

  function renderDropdown() {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a
            className="nav-link nav-item dropdown-toggle"
            href="http://example.com"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Owner Section
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/rentals/new">
              Create Rental
            </Link>
            <Link className="dropdown-item" to="/rentals/manage">
              Manage Rentals
            </Link>
            <Link className="dropdown-item" to="/bookings/manage">
              Manage Bookings
            </Link>
          </div>
        </div>
      );
    }
  }

  function renderAuthControl() {
    if (isAuth) {
      return (
        <React.Fragment>
          <a className="nav-item nav-link" href="#">
            Welcome {username}
          </a>
          <a onClick={invalidateUser} className="nav-item nav-link" href="">
            Logout
          </a>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to="/login" className="nav-item nav-link active" href="">
            Login <span className="sr-only">(current)</span>
          </Link>
          <Link to="/register" className="nav-item nav-link" href="">
            Register
          </Link>
        </React.Fragment>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/rentals">
          BookWithMe <img src={process.env.PUBLIC_URL + "/react-logo.png"} />{" "}
        </Link>
        <RentalSearch />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {renderDropdown()}
            {renderAuthControl()}
          </div>
        </div>
      </div>
    </nav>
  );
}
