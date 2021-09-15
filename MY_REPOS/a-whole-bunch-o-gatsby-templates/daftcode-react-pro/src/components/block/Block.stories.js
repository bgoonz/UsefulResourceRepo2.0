//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Block from './Block';

storiesOf('Common|Block', module).add('basic', () => (
  <Block backgroundColor="palevioletred" color="white">
    Block
  </Block>
));
