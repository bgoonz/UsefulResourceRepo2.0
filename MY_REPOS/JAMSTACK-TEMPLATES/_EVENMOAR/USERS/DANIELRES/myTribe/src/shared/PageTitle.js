import React from "react";
import styled from "styled-components";

const Content = styled.h1`
  margin-left: 20px;
`;

const PageTitle = ({ children }) => <Content>{children}</Content>;

export default PageTitle;
