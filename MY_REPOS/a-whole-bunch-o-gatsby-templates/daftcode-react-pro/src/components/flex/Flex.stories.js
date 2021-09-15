//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Flex from './Flex';
import Block from '../block';

storiesOf('Common|Flex', module).add('row', () => (
  <Flex row>
    <Block>1</Block>
    <Block>2</Block>
    <Block>3</Block>
  </Flex>
));
