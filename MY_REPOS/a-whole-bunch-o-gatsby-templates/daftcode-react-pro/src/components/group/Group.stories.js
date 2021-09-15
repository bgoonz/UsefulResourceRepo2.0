//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../box/Box';
import Button from '../button/Button';
import Group from '../group/Group';
import Input from '../input/Input';
import Field from '../field/Field';
import Label from '../label/Label';

storiesOf('Common|Group', module)
  .add('basic', () => (
    <Group>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </Group>
  ))
  .add('vertical', () => (
    <Group vertical>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </Group>
  ))
  .add('complex', () => (
    <Box relative border={0}>
      <Group vertical>
        <Group>
          <Field as={Group.Item} padding={8}>
            <Label htmlFor="input">Label</Label>
            <Input id="input" placeholder="Input" />
          </Field>
          <Field as={Group.Item} padding={8}>
            <Label htmlFor="input2">Label</Label>
            <Group>
              <Button>Button</Button>
              <Input id="input2" placeholder="Input" />
              <Button>Button</Button>
            </Group>
          </Field>
        </Group>
        <Button>Button</Button>
      </Group>
    </Box>
  ));
