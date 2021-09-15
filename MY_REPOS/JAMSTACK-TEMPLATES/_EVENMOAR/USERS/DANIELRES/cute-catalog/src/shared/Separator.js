import styled from "styled-components/macro";
import React from "react";

const Separator = styled(({ className, children }) => (
  <div className={`${className} mt-5 mb-5`}>
    <span>{children}</span>
  </div>
))`
  border-bottom: 1px solid #ccc;
  text-align: center;
  span {
    background: #e9ecef;
    display: inline-block;
    margin-left: -10px;
    margin-top: -12px;
    padding: 0 10px;
    position: absolute;
  }
`;

export default Separator;
