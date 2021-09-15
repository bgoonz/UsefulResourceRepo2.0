//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Shadow from './Shadow';
import Block from '../block/Block';

storiesOf('Common|Shadow', module).add('basic', () => (
  <Block relative width={200} height={200} borderRadius={5}>
    <Shadow depth={10} />
  </Block>
));
