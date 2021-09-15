import React from 'react';
import { LionessProvider } from '@lib/lioness';
import { t } from '@core/utils/i18n/gettext';

export const getLioness = (translations = {}, lang = 'en') => storyFn => {
  return (
    <LionessProvider messages={translations} locale={lang}>
      {storyFn()}
    </LionessProvider>
  );
};
