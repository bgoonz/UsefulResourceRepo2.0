import { createGlobalStyle } from '@xstyled/emotion'

const GlobalStyleContainer = createGlobalStyle`
  ::selection {
    color: #fff;
    background: #3380CC;
  }

  html, body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    color: text;
    background-color: background;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,h2,h3,h4,h5,h6 {
    line-height: 1.25em;
  }

  p, ul, ol {
    margin-top: 1rem;
    a {
      color: primary;
      &:hover {
        color: primaryAlt;
      }
    }
  }

  a {
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline-color: primary;
    }
  }

  label {
    font-weight: 700;
    margin-bottom: 2;
  }

  input, textarea {
    font-size: 1.2em;
  }

  button {
    font-size: 1em;
  }

  input, button, textarea {
    font-family: inherit;
    border-width: 3px;
    border-style: solid;
    border-color: border;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    outline: none;
    padding: 10px;
    &:focus {
      border-color: primary;
    }
    &:disabled {
      color: textDisabled;
    }
  }

  pre, code {
    font-family: 'Inconsolata', monospace;
    margin: 0;
  }

  img[src=''], img:not([src]) {
    opacity: 0;
  }

  mark {
    background-color: inherit;
  }
`

export default GlobalStyleContainer
