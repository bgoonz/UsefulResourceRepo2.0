import styled from 'styled-components';
import as from './../utils/as';
import { bool, value } from './../utils/styledProps';
import Base from '../base';

const Flex = styled(Base)`
  display: flex;
  &&& {
    ${bool('flex-direction', ['row', 'column', 'rowReverse', 'columnReverse'])}
    ${bool('flex-wrap', ['nowrap', 'wrap', 'wrapReverse'])}
    ${value('flex-grow', 'grow')}
    ${value('flex-shrink', 'shrink')}
  }
`;

export default as('div')(Flex);
