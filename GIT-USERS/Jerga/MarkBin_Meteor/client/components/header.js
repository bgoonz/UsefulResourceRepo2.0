import React, { Component } from "react";
import Accounts from "./accounts";
import { Link, browserHistory } from "react-router";

class Header extends Component {
  onBinClick(e) {
    e.preventDefault();

    Meteor.call("bins.insert", (error, binId) => {
      if (error) {
        throw new Error();
      } else {
        console.log(binId);
        browserHistory.push(`/bins/${binId}`);
      }
    });
  }

  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            {" "}
            MarkBin{" "}
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Accounts />
          </li>
          <li>
            <a href="#" onClick={this.onBinClick.bind(this)}>
              Create Bin
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
