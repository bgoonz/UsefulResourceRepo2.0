//@flow

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Link from './Link';

storiesOf('Common|Link', module).add('basic', () => <Link href="#">Link</Link>);
