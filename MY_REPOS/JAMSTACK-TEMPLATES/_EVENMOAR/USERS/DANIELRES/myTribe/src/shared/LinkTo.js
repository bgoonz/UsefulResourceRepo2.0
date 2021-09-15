import { connectLean } from "lean-redux";
import { push } from "react-router-redux";
import React from "react";
import styled from "styled-components";

const isTouchEnabled =
  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;

const _LinkTo = connectLean({
  handleClickTo(path) {
    this.props.external
      ? window.open(path, "_blank")
      : this.dispatch(push(path));
  },
})(({ children, className, handleClickTo, target }) => (
  <div className={className} onClick={() => handleClickTo(target)}>
    {children}
  </div>
));

const LinkTo = styled(_LinkTo)`
  cursor: pointer;
  &:hover {
    ${!isTouchEnabled && "background: #eee;"}
  }
`;

export default LinkTo;
