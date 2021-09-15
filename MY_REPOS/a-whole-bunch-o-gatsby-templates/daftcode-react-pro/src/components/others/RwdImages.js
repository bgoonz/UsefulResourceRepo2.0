//@flow

//http://www.responsivebreakpoints.com/
import * as React from 'react';

import castle_ar_1_1_c_fill___auto__c_scale_w_200_webp from './images/castle_ar_1_1.c_fill.g_auto__c_scale.w_200.webp';
import castle_ar_1_1_c_fill_g_auto__c_scale_w_860_webp from './images/castle_ar_1_1.c_fill.g_auto__c_scale.w_860.webp';
import castle_ar_1_1_c_fill_g_auto__c_scale_w_1366_webp from './images/castle_ar_1_1.c_fill.g_auto__c_scale.w_1366.webp';
import castle_ar_4_3_c_fill_g_auto__c_scale_w_538_webp from './images/castle_ar_4_3.c_fill.g_auto__c_scale.w_538.webp';
import castle_ar_4_3_c_fill_g_auto__c_scale_w_1018_webp from './images/castle_ar_4_3.c_fill.g_auto__c_scale.w_1018.webp';
import castle_ar_4_3_c_fill_g_auto__c_scale_w_1388_webp from './images/castle_ar_4_3.c_fill.g_auto__c_scale.w_1388.webp';
import castle_ar_16_9_c_fill_g_auto__c_scale_w_596_webp from './images/castle_ar_16_9.c_fill.g_auto__c_scale.w_596.webp';
import castle_ar_16_9_c_fill_g_auto__c_scale_w_874_webp from './images/castle_ar_16_9.c_fill.g_auto__c_scale.w_874.webp';
import castle_ar_16_9_c_fill_g_auto__c_scale_w_1440_webp from './images/castle_ar_16_9.c_fill.g_auto__c_scale.w_1440.webp';
import castle_c_scale_w_480_webp from './images/castle_c_scale.w_480.webp';
import castle_c_scale_w_822_webp from './images/castle_c_scale.w_822.webp';
import castle_c_scale_w_1076_webp from './images/castle_c_scale.w_1076.webp';
import castle_c_scale_w_1252_webp from './images/castle_c_scale.w_1252.webp';

import castle_ar_1_1_c_fill___auto__c_scale_w_200 from './images/castle_ar_1_1.c_fill.g_auto__c_scale.w_200.jpg';
import castle_ar_1_1_c_fill_g_auto__c_scale_w_860 from './images/castle_ar_1_1.c_fill.g_auto__c_scale.w_860.jpg';
import castle_ar_1_1_c_fill_g_auto__c_scale_w_1366 from './images/castle_ar_1_1.c_fill.g_auto__c_scale.w_1366.jpg';
import castle_ar_4_3_c_fill_g_auto__c_scale_w_538 from './images/castle_ar_4_3.c_fill.g_auto__c_scale.w_538.jpg';
import castle_ar_4_3_c_fill_g_auto__c_scale_w_1018 from './images/castle_ar_4_3.c_fill.g_auto__c_scale.w_1018.jpg';
import castle_ar_4_3_c_fill_g_auto__c_scale_w_1388 from './images/castle_ar_4_3.c_fill.g_auto__c_scale.w_1388.jpg';
import castle_ar_16_9_c_fill_g_auto__c_scale_w_596 from './images/castle_ar_16_9.c_fill.g_auto__c_scale.w_596.jpg';
import castle_ar_16_9_c_fill_g_auto__c_scale_w_874 from './images/castle_ar_16_9.c_fill.g_auto__c_scale.w_874.jpg';
import castle_ar_16_9_c_fill_g_auto__c_scale_w_1440 from './images/castle_ar_16_9.c_fill.g_auto__c_scale.w_1440.jpg';
import castle_c_scale_w_480 from './images/castle_c_scale.w_480.jpg';
import castle_c_scale_w_822 from './images/castle_c_scale.w_822.jpg';
import castle_c_scale_w_1076 from './images/castle_c_scale.w_1076.jpg';
import castle_c_scale_w_1252 from './images/castle_c_scale.w_1252.jpg';

class RwdImages extends React.PureComponent {
  render() {
    return (
      <div>
        <picture>
          {/* Portrait Phones  - WEBP*/}
          <source
            media="(max-width: 767px)"
            sizes="(max-width: 1366px) 100vw, 1366px"
            srcSet={
              castle_ar_1_1_c_fill___auto__c_scale_w_200_webp +
              ' 200w,' +
              castle_ar_1_1_c_fill_g_auto__c_scale_w_860_webp +
              ' 860w,' +
              castle_ar_1_1_c_fill_g_auto__c_scale_w_1366_webp +
              ' 1366w'
            }
            type="image/webp"
          />
          {/* Tablets  - WEBP*/}
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            sizes="(max-width: 1983px) 70vw, 1388px"
            srcSet={
              castle_ar_4_3_c_fill_g_auto__c_scale_w_538_webp +
              ' 538w,' +
              castle_ar_4_3_c_fill_g_auto__c_scale_w_1018_webp +
              ' 1018w,' +
              castle_ar_4_3_c_fill_g_auto__c_scale_w_1388_webp +
              ' 1388w'
            }
            type="image/webp"
          />
          {/* Desktops  - WEBP*/}
          <source
            media="(min-width: 992px) and (max-width: 1199px)"
            sizes="(max-width: 2400px) 60vw, 1440px"
            srcSet={
              castle_ar_16_9_c_fill_g_auto__c_scale_w_596_webp +
              ' 596w,' +
              castle_ar_16_9_c_fill_g_auto__c_scale_w_874_webp +
              ' 874w,' +
              castle_ar_16_9_c_fill_g_auto__c_scale_w_1440_webp +
              ' 1440w'
            }
            type="image/webp"
          />
          {/* Extra Large Desktops  - WEBP*/}
          <source
            sizes="(max-width: 5120px) 40vw, 1252px"
            srcSet={
              castle_c_scale_w_480_webp +
              ' 480w,' +
              castle_c_scale_w_822_webp +
              ' 822w,' +
              castle_c_scale_w_1076_webp +
              ' 1076w,' +
              castle_c_scale_w_1252_webp +
              ' 1252w'
            }
            type="image/webp"
          />

          {/* Portrait Phones */}
          <source
            media="(max-width: 767px)"
            sizes="(max-width: 1366px) 100vw, 1366px"
            srcSet={
              castle_ar_1_1_c_fill___auto__c_scale_w_200 +
              ' 200w,' +
              castle_ar_1_1_c_fill_g_auto__c_scale_w_860 +
              ' 860w,' +
              castle_ar_1_1_c_fill_g_auto__c_scale_w_1366 +
              ' 1366w'
            }
          />
          {/* Tablets */}
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            sizes="(max-width: 1983px) 70vw, 1388px"
            srcSet={
              castle_ar_4_3_c_fill_g_auto__c_scale_w_538 +
              ' 538w,' +
              castle_ar_4_3_c_fill_g_auto__c_scale_w_1018 +
              ' 1018w,' +
              castle_ar_4_3_c_fill_g_auto__c_scale_w_1388 +
              ' 1388w'
            }
          />
          {/* Desktops */}
          <source
            media="(min-width: 992px) and (max-width: 1199px)"
            sizes="(max-width: 2400px) 60vw, 1440px"
            srcSet={
              castle_ar_16_9_c_fill_g_auto__c_scale_w_596 +
              ' 596w,' +
              castle_ar_16_9_c_fill_g_auto__c_scale_w_874 +
              ' 874w,' +
              castle_ar_16_9_c_fill_g_auto__c_scale_w_1440 +
              ' 1440w'
            }
          />
          {/* Extra Large Desktops */}
          <img
            sizes="(max-width: 5120px) 40vw, 1252px"
            srcSet={
              castle_c_scale_w_480 + ' 480w,' + castle_c_scale_w_822 + ' 822w,' + castle_c_scale_w_1076 + ' 1076w'
            }
            src={castle_c_scale_w_1252}
            alt=""
          />
        </picture>
      </div>
    );
  }
}

export { RwdImages };
