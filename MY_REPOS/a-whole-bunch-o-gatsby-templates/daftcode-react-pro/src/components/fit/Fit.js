import styled from 'styled-components';
import as from './../utils/as';
import Base from '../base';

const Fit = styled(Base)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default as('div')(Fit);
