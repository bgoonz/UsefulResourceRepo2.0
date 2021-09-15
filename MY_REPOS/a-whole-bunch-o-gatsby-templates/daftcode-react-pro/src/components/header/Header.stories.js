//@flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './Header';

const props: any = {};

storiesOf('Components|Header', module).add('basic', () => <Header {...props} />);
