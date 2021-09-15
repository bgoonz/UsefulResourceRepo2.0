import styled from 'styled-components'

const FooterContainer = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #777;

  & .footer-contents {
    color: white;
    padding: 1rem;
  }
`

export default FooterContainer
