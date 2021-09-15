//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Fit from './Fit';
import Box from '../box/Box';

storiesOf('Common|Fit', module).add('basic', () => (
  <Box relative width={50} height={50}>
    <Fit backgroundColor="palevioletred" />
  </Box>
));
