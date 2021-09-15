import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Button = styled.button`
  margin-left: 10px;
  background: black;
  border-color: black;
  color: white;
  cursor: pointer;
  font-family: "Rubik";
`;
const Wrapper = styled.div`
  display: inline-block;
`;

const Tag = ({ name }) => {
  return (
    <Wrapper>
      <Link to={`/tags/${name}`}>
        <Button>{name}</Button>
      </Link>
    </Wrapper>
  );
};

export default Tag;
