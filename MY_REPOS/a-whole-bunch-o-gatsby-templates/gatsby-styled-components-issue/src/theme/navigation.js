import styled from 'styled-components'

const NavigationContainer = styled.nav`
  background: ${({ theme, isOnHome }) => (isOnHome ? theme.color1 : theme.color2)};

  & ul {
    padding: 1em 0;
    text-align: right;
    padding-right: 1rem;
  }

  & a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    font-size: 1.25rem;
  }
`

export default NavigationContainer
