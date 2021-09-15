import { connectLean } from "lean-redux";
import { push } from "react-router-redux";
import FaSignOut from "react-icons/lib/fa/sign-out";
import MdAccountCircle from "react-icons/lib/md/account-circle";
import MdBurger from "react-icons/lib/md/menu";
import MdFavorite from "react-icons/lib/md/favorite";
import MdHome from "react-icons/lib/md/home";
import MdInfo from "react-icons/lib/md/info";
import React from "react";
import styled from "styled-components";

const iconFor = (id) =>
  ({
    home: <MdHome />,
    members: <MdFavorite />,
    me: <MdAccountCircle />,
    about: <MdInfo />,
    logout: <FaSignOut />,
  }[id]);

const Wrapper = styled.section`
  background: #000;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  padding: 10px 20px;
`;

const Button = styled.button`
  font-size: 18px;
  border: 0;
  background: transparent;
  color: #fff;
  outline: 0;
`;

const Entries = styled.div`
  color: #fff;
  display: ${(props) => (props.collapsed ? "none" : "block")};
`;

const Entry = styled.div`
  padding: 20px;
  border-top: 1px solid #aaa;
`;

const Icon = styled.div`
  display: inline-block;
  font-size: 25px;
  margin-right: 20px;
`;

const Menu = ({ collapsed, entries, handleClick, logout, toggleCollapsed }) => (
  <Wrapper>
    <ButtonWrapper>
      <Button onClick={toggleCollapsed}>
        <MdBurger />
      </Button>
    </ButtonWrapper>

    <Entries collapsed={collapsed}>
      {entries.map((entry) => (
        <Entry key={entry.id} onClick={() => handleClick(entry.path)}>
          <Icon>{iconFor(entry.id)}</Icon>
          {entry.name}
        </Entry>
      ))}
      <Entry onClick={logout}>
        <Icon>{iconFor("logout")}</Icon>
        Logout
      </Entry>
    </Entries>
  </Wrapper>
);

const Connected = connectLean({
  getInitialState() {
    return {
      Menu: { collapsed: true },
      currentUser: {
        name: "Daniel",
        slug: "Daniel",
        path: "/members/Daniel",
      },
    };
  },

  mapState: (state, ownProps) => ({
    collapsed: state.Menu.collapsed,
    entries: [
      { id: "home", name: "Home", path: "/" },
      { id: "members", name: "Members", path: "/members" },
      { id: "me", name: "Me", path: state.currentUser.path },
      { id: "about", name: "About", path: "/about" },
    ],
  }),

  toggleCollapsed(e) {
    e.preventDefault();
    this.setState({ Menu: { collapsed: !this.state.Menu.collapsed } });
  },

  handleClick(path) {
    this.dispatch(push(path));
    this.setState({ Menu: { collapsed: true } });
  },

  logout() {
    this.setState({ Menu: { collapsed: true } });
    alert("(Logout)");
  },
})(Menu);

export default Connected;
