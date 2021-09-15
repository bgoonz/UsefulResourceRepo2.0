import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
  .bg-gray {
    background: #e9ecef;
  }

  .link-gray {
    color: rgba(0,0,0,.5);
    &:hover{
      color: rgba(0,0,0,.9);
      text-decoration: none;
    }
  }

  .link-lightgray {
    color: rgba(0,0,0,.2);
    &:hover{
      color: rgba(0,0,0,.6);
      text-decoration: none;
    }
  }

  .link-no-underline {
    &:hover{
      text-decoration: none;
    }
  }

  .box-shadow {
    box-shadow: 0 .15rem .55rem rgba(0, 0, 0, .07);
  }

  .small-gutters {
    margin-right: -5px;
    margin-left: -5px;
    > [class*="col-"] {
      padding-right: 5px;
      padding-left: 5px;
    }
  }
`;

export default GlobalStyle;
