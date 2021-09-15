import React from 'react';
import styled from 'styled-components';

const Hamburger = styled.a`
  //margin: auto;
  width: 2.5rem;
  display: inline-block;
  padding: 0.675em 0;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;

  span {
    display: block;
    position: relative;
    height: 2px;
    width: 2.5rem;
    background-color: black;
    &::before,
    &::after {
      content: "";
      display: block;
      background-color: black;
      width: 2.5rem;
      height: 2px;
      position: absolute;
      bottom: 0;
      transform-origin: 50%;
      transition-duration: .2s;
      transition-property: transform;
    }
    &::before {
      transform: translateY(-0.5em);
    }
    &::after {
      transform: translateY(0.5em);
    }
  }
  &:hover:not(.active) {
    span {
      &::before {
        transform: translateY(-0.625em);
      }
      &::after {
        transform: translateY(0.625em);
      }
    }
  }
  &.active {
    span {
      background-color: transparent;
      &::before {
        background-color: white;
        animation: top-bar 1s;
        animation-fill-mode: forwards;
      }
      &::after {
        background-color: white;
        animation: bottom-bar 1s;
        animation-fill-mode: forwards;
      }
    }
  }
}

@keyframes top-bar {
  50% {
    transform: translateY(0);
  }
  100% {
    transform: rotate(45deg) translateY(0);
  }
}

@keyframes bottom-bar {
  50% {
    transform: translateY(0);
  }
  100% {
    transform: rotate(-45deg) translateY(0);
  }
}
`;

export default Hamburger;
