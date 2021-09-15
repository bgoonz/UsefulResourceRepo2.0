import styled from 'styled-components';
import as from './../utils/as';
import Base from '../base';

const Link = styled(Base)`
  color: #0366d6;
  text-decoration: none;
  &:hover {
    outline-width: 0;
    text-decoration: underline;
  }
`;

export default as('a')(Link);
