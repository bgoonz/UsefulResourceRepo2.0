// @flow
import React from 'react';
import LanguageChooserComponent from './LanguageChooser';
import { I18nContext } from '../../providers/i18n';
import type { LanguageChooserOwnProps } from './LanguageChooser';

const LanguageChooser = (props: LanguageChooserOwnProps) => (
  <I18nContext.Consumer>{context => <LanguageChooserComponent {...props} {...context} />}</I18nContext.Consumer>
);

export default LanguageChooser;
