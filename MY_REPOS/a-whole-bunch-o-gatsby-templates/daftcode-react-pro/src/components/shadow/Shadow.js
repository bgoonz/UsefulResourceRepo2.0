import styled from 'styled-components';
import { withProp } from 'styled-tools';
import as from './../utils/as';
import Fit from '../fit';

const Shadow = styled(Fit)`
  border-radius: inherit;
  pointer-events: none;
  box-shadow: ${withProp('depth', d => `0 ${d * 2}px ${d * 4}px rgba(0, 0, 0, 0.2)`)};
`;

Shadow.defaultProps = {
  depth: 2,
};

export default as('div')(Shadow);
