import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Nav = styled.div`
  background: white;
`;
const Linkwrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  font-family: "Rubik";
`;

const Navbar = () => {
  return (
    <Nav>
      <Linkwrap>
        <Link
          to="/"
          style={{ textDecoration: `none`, color: `black`, padding: `0 10px` }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{ textDecoration: `none`, color: `black`, padding: `0 10px` }}
        >
          About
        </Link>
        <a
          href="https://www.gatsbyjs.org/"
          style={{ textDecoration: `none`, color: `black`, padding: `0 10px` }}
        >
          Gatsby
        </a>
        <a
          href="https://graphql.org/"
          style={{ textDecoration: `none`, color: `black`, padding: `0 10px` }}
        >
          GraphQL
        </a>
        <a
          href="https://reactjs.org/"
          style={{ textDecoration: `none`, color: `black` }}
        >
          React
        </a>
        <a
          href="https://jamstack.org/"
          style={{ textDecoration: `none`, color: `black`, padding: `0 10px` }}
        >
          Jam Stack
        </a>
      </Linkwrap>
    </Nav>
  );
};

export default Navbar;
