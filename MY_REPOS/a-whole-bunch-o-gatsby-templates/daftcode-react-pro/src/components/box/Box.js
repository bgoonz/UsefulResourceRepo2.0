import styled from 'styled-components';
import as from './../utils/as';
import Base from '../base';

const Box = styled(Base)`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.25em;
`;

export default as('div')(Box);
