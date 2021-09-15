//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Hero from './Hero';

const props: any = {};

storiesOf('Sections|Hero', module).add('basic', () => <Hero {...props} />);
