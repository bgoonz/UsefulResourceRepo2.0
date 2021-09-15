import React from 'react';
import 'typeface-open-sans';
import { Global, css } from '@emotion/core';

const GlobalFonts = () => (
  <Global
    styles={css`
      body {
        font-family: 'Open Sans', Arial, sans-serif;
        font-size: 16px;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Open Sans', Arial, sans-serif;
        font-weight: 600;
      }
    `}
  />
);

export default GlobalFonts;
