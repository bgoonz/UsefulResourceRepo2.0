//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('Common|Input', module)
  .add('basic', () => <Input placeholder="Input" />)
  .add('colored', () => <Input backgroundColor="palevioletred" color="white" placeholder="Input" />)
  .add('disabled', () => <Input disabled placeholder="Input" />)
  .add('textarea', () => <Input as="textarea" />)
  .add('select', () => (
    <Input as="select">
      <option>Select</option>
    </Input>
  ))
  .add('checkbox', () => (
    <label>
      <Input type="checkbox" /> Input
    </label>
  ))
  .add('radio', () => (
    <label>
      <Input type="radio" /> Input
    </label>
  ));
