//@flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import LanguageChooser from './LanguageChooser';
import LANGUAGES from '../../constants/language';
import type { LanguageChooserProps } from './LanguageChooser';

const props: LanguageChooserProps = {
  languages: [LANGUAGES.EN, LANGUAGES.PL],
  language: LANGUAGES.PL,
  changeLanguage: () => alert('change langauge'),
};

storiesOf('Components|Language Chooser', module).add('basic', () => <LanguageChooser {...props} />);
