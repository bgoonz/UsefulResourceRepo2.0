//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Icon from '@assets/icon.png';

storiesOf('Common|Button', module)
  .add('default', () => <Button>Hello</Button>)
  .add('disabled', () => <Button disabled>Hello</Button>)
  .add('primary', () => <Button primary>Hello</Button>)
  .add('icon', () => (
    <Button>
      <img alt="icon" src={Icon} />Beer
    </Button>
  ))
  .add('link', () => (
    <Button as="a" href="https://mkaczkowski.com" target="_blank">
      Go to Website
    </Button>
  ));
