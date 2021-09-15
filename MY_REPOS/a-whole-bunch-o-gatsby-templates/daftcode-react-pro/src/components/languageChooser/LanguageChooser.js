// @flow
import React from 'react';
import type { I18nContextProps } from '../../providers/i18n';
import LANGUAGES from '../../constants/language';

export type LanguageChooserOwnProps = {
  languages: LANGUAGES[],
};

export type LanguageChooserProps = LanguageChooserOwnProps & I18nContextProps;

const LanguageChooser = (props: LanguageChooserProps) => (
  <div>
    {props.languages.map(lang => (
      <button name={lang.value} key={lang.value} onClick={props.changeLanguage}>
        {lang.text}
      </button>
    ))}
  </div>
);

export default LanguageChooser;
