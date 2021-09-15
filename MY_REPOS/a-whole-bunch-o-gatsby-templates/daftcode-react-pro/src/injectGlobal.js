/* eslint-disable no-unused-expressions */
import { injectGlobal } from 'styled-components';

// url(Ubuntu-subset.woff2) format("woff2"),
//   url(Ubuntu-subset.zopfli.woff) format("woff"),
//   url(Ubuntu-subset.ttf) format("truetype");

//url(Ubuntu.woff2) format("woff2"),
//url(Ubuntu.zopfli.woff) format("woff"),
//url(Ubuntu.ttf) format("truetype");

// import './assets/fonts/Ubuntu.ttf';
// import './assets/fonts/Ubuntu.woff';
// import './assets/fonts/Ubuntu.woff2';
import './assets/fonts/Ubuntu-subset.ttf';
import './assets/fonts/Ubuntu-subset.zopfli.woff';
import './assets/fonts/Ubuntu-subset.woff2';
import './assets/fonts/Ubuntu.eot';

injectGlobal`
  @font-face {
    font-family: Ubuntu;
    src: url('Ubuntu.eot');
    src: url('Ubuntu.eot?#iefix') format('embedded-opentype'),
    url(Ubuntu-subset.woff2) format("woff2"),
     url(Ubuntu-subset.zopfli.woff) format("woff"), 
     url(Ubuntu-subset.ttf) format("truetype");
    unicode-range: U+20,U+2E,U+45-47,U+49,U+4A,U+4D,U+4F,U+52-54,U+57,U+59,U+61-65,U+67-69,U+6B-70,U+72-76,U+79;
    font-weight: normal;
    font-style: normal;
    font-display:swap;
  }
  
  body {
    background: white;
    font-family: Ubuntu;
    margin:0;
    height:100%;
    width:100%;
    
    @media (display-mode: standalone) {
      /* All installed PWAs styles media-query*/
    }
  }
`;
