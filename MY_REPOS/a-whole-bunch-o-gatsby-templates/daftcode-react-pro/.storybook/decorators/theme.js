import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@theme';

export const getTheme = () => storyFn => {
  return (
    <ThemeProvider theme={theme}>
      {storyFn()}
    </ThemeProvider>
  );
};
