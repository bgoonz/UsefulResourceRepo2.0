//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Base from './Base';

storiesOf('Common|Base', module).add('basic', () => (
  <Base backgroundColor="palevioletred" color="white">
    Base
  </Base>
));
