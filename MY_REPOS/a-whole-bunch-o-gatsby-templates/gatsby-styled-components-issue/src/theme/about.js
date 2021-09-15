import styled from 'styled-components'

const AboutContainer = styled.nav`
  margin: 2rem auto;
  width: 50%;

  & .diff {
    margin-top: 2rem;
    color: ${({ theme }) => theme.color2};
  }
`

export default AboutContainer
