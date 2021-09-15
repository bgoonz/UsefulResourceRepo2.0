//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Box from './Box';

storiesOf('Common|Box', module).add('basic', () => (
  <Box backgroundColor="palevioletred" color="white">
    Box
  </Box>
));
