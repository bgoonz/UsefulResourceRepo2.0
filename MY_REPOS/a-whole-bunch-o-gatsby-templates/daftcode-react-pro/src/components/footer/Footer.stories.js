//@flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Footer from './Footer';

const props: any = {};

storiesOf('Components|Footer', module).add('basic', () => <Footer {...props} />);
