//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Label from './Label';
import Input from '../input/Input';

storiesOf('Common|Label', module)
  .add('basic', () => <Label>Label</Label>)
  .add('checkbox', () => (
    <Label>
      <Input type="checkbox" /> Label
    </Label>
  ))
  .add('radio', () => (
    <Label>
      <Input type="radio" /> Label
    </Label>
  ));
