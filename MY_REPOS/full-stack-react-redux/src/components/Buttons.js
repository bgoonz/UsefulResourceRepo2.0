import styled from '@emotion/styled'

const Buttons = styled.div`
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  flex-wrap: wrap;
  margin: 10px 0;
  & > a,
  & > button {
    margin: ${({ center }) => (center ? '0 10px 10px 10px' : '0 10px 10px 0')};
  }
`

export default Buttons
