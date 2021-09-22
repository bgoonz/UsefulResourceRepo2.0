import React from "react";
import LoginComponent from "../Login";
import auth0Client from "../../services/Auth";

import { withRouter } from "next/router";
import ActiveLink from "../ActiveLink";
import { connect } from "react-redux";
import * as actions from "../../actions";
// import Link from 'next/link'

import { Link } from "../../routes";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";

const namespace = "https://portfel.com/";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  dropdownToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  signOut() {
    auth0Client.signOut();
    this.props.dispatch(actions.authFail());

    this.props.router.replace("/");
  }

  renderBlog() {
    const {
      auth: { isLoadingAuthState, isAuth, user },
    } = this.props;

    if (!isLoadingAuthState && isAuth && user[namespace + "role"] === "admin") {
      return (
        <Dropdown
          nav
          isOpen={this.state.dropdownOpen}
          toggle={this.dropdownToggle}
        >
          <DropdownToggle nav caret>
            Blog Menu
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Link route="/blogs">
                <a className="nav-link-drop"> Blog Listing </a>
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link route="/blogs/new">
                <a className="nav-link-drop"> Blog Create </a>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link activeClassName="active" route="/blogs/me">
                <a className="nav-link-drop"> My Blogs </a>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <NavItem>
        <ActiveLink activeClassName="active" route="/blogs">
          <a className="nav-link"> Blog </a>
        </ActiveLink>
      </NavItem>
    );
  }

  render() {
    const {
      className,
      color,
      auth: { isLoadingAuthState, isAuth },
    } = this.props;
    const { isOpen } = this.state;

    const dropdownClass = isOpen ? "drop-open" : "drop-closed";

    return (
      <Navbar
        className={`${className} ${dropdownClass}`}
        color={color}
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          Filip Jerga
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="mr-2">
          <i className="fas fa-bars transparent"></i>{" "}
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <ActiveLink activeClassName="active" route="/">
                <a className="nav-link"> Home </a>
              </ActiveLink>
            </NavItem>
            <NavItem>
              <ActiveLink activeClassName="active" route="/bio">
                <a className="nav-link"> Bio </a>
              </ActiveLink>
            </NavItem>
            <NavItem>
              <ActiveLink activeClassName="active" route="/portfolio">
                <a className="nav-link"> Portfolio </a>
              </ActiveLink>
            </NavItem>

            {this.renderBlog()}

            <NavItem>
              <ActiveLink activeClassName="active" route="/cv">
                <a className="nav-link"> CV </a>
              </ActiveLink>
            </NavItem>
            {!isLoadingAuthState && !isAuth && (
              <NavItem>
                <LoginComponent
                  actionEl={({ toggle }) => (
                    <NavLink onClick={toggle} href="#">
                      {" "}
                      Login{" "}
                    </NavLink>
                  )}
                />
              </NavItem>
            )}
            {!isLoadingAuthState && isAuth && (
              <NavItem>
                <NavLink
                  href="#"
                  className="btn btn-danger"
                  onClick={() => {
                    this.signOut();
                  }}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(withRouter(Header));

// <NavLink className="mr-2 text-white">{auth0Client.getProfile().name}</NavLink>
