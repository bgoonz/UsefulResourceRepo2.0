//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Heading from './Heading';

storiesOf('Common|Heading', module)
  .add('h1', () => <Heading>Heading level 1</Heading>)
  .add('h2', () => <Heading as="h2">Heading level 2</Heading>)
  .add('h3', () => <Heading as="h3">Heading level 3</Heading>)
  .add('h4', () => <Heading as="h4">Heading level 4</Heading>)
  .add('h5', () => <Heading as="h5">Heading level 5</Heading>)
  .add('h6', () => <Heading as="h6">Heading level 6</Heading>);
