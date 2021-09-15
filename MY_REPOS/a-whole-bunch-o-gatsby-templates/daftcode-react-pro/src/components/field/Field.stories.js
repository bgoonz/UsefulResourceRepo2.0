//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Field from './Field';
import Box from '../box/Box';
import Button from '../button/Button';
import Input from '../input/Input';
import Label from '../label/Label';
import Group from '../group/Group';

storiesOf('Common|Field', module)
  .add('basic', () => (
    <Field>
      <Label htmlFor="input1">Label</Label>
      <Input id="input1" placeholder="Input" />
    </Field>
  ))
  .add('group', () => (
    <Field>
      <Label htmlFor="input2">Label</Label>
      <Group>
        <Button>Button</Button>
        <Input id="input2" placeholder="Input" />
        <Button>Button</Button>
      </Group>
    </Field>
  ))
  .add('box', () => (
    <Field as={Box} padding={8} backgroundColor="rgba(0, 0, 0, 0.03)">
      <Label htmlFor="input3">Label</Label>
      <Input id="input3" placeholder="Input" />
    </Field>
  ));
