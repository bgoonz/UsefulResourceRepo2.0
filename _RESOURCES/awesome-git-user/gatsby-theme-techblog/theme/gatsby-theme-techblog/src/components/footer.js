import React, { Fragment } from "react";
import styled from "styled-components";

const Namedate = styled.p`
  display: inline;
  font-family: "Rubik";
  color: #4b515d;
`;
const Gatsby = styled.p`
  display: inline;
  font-family: "Rubik";
  color: #4b515d;
`;
const Links = styled.a`
  font-family: "Rubik";
  color: #5bc0de;
  text-decoration: none;
`;
const Wrapper = styled.footer`
  text-align: center;
  padding-bottom: 50px;
`;

const Footer = () => {
  return (
    <Fragment>
      <Wrapper>
        <hr />
        <Namedate>
          © {new Date().getFullYear()}{" "}
          <Links href="https://willjw3.github.io/">willjw3</Links>, All Rights
          Reserved.
        </Namedate>
        <Gatsby>
          <i>
            {" "}
            Built with
            {` `}
            <Links href="https://www.gatsbyjs.org">Gatsby</Links>
          </i>
        </Gatsby>
      </Wrapper>
    </Fragment>
  );
};

export default Footer;
