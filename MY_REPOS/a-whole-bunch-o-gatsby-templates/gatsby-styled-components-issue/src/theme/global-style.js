import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const theme = {
  color1: '#f54242',
  color2: '#428df5',
}

export const GlobalStyle = createGlobalStyle`
    ${reset}

  & h1 {
    font-size: 5rem;
  }

  & p {
    font-size: 2rem;
  }
`
