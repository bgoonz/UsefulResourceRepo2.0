//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Contact from './Contact';
const props: any = {};

storiesOf('Sections|Contact', module).add('basic', () => <Contact {...props} />);
