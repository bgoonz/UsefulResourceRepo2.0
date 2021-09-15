// @flow
import React from 'react';
import styled from 'styled-components';
import { bool } from './../utils/styledProps';
import as from './../utils/as';

const positions = ['static', 'absolute', 'fixed', 'relative', 'sticky'];

const Component = ({ as: T, ...props }) => <T {...props} />;

const Base = styled(Component)`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-family: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  &&& {
    ${bool('position', positions)};
  }
`;

export default as('div')(Base);
