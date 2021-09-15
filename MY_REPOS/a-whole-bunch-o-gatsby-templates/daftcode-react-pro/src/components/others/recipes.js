//@flow

//http://www.responsivebreakpoints.com/
import * as React from 'react';

/**
 * CSS*
 ********
 * @include webp {
 *   background: url("../../../assets/images/logo.png") no-repeat green center;
 * }
 * @include no-webp {
 *   background: no-repeat red center;
 * }
 /**end css*/

class RwdImages extends React.PureComponent {
  render() {
    return (
      <div>
        {/*ART DIRECTION USE CASE*/}
        <picture>
          <source media="(min-width: 1024px)" srcset="opera-fullshot.jpg" />
          <img src="opera-closeup.jpg" alt="The Oslo Opera House" />
        </picture>

        {/*DIFFERENT IMAGE TYPES USE CASE*/}
        <picture>
          <source srcset="opera.webp" type="image/webp" />
          <img src="opera.jpg" alt="The Oslo Opera House" />
        </picture>

        {/*DIFFERENT IMAGE TYPES & ART DIRECTION USE CASE*/}
        <picture>
          <source media="(min-width: 1024px)" srcset="opera-fullshot.webp" type="image/webp" />
          <source media="(min-width: 1024px)" srcset="opera-fullshot.jpg" />
          <source srcset="opera-closeup.webp" type="image/webp" />
          <img src="opera-closeup.jpg" alt="The Oslo Opera House" />
        </picture>

        {/*HIGH-DPI IMAGES USE CASE*/}
        <img src="opera-1x.jpg" alt="The Oslo Opera House" srcset="opera-2x.jpg 2x, opera-3x.jpg 3x" />

        {/*HIGH-DPI IMAGES & ART DIRECTION USE CASE*/}
        <picture>
          <source
            media="(min-width: 1024px)"
            srcset="opera-fullshot-1x.jpg 1x, opera-fullshot-2x.jpg 2x, opera-fullshot-3x.jpg 3x"
          />
          <img
            src="opera-closeup-1x.jpg"
            alt="The Oslo Opera House"
            srcset="opera-closeup-2x.jpg 2x, opera-closeup-3x.jpg 3x"
          />
        </picture>

        {/*HIGH-DPI IMAGES & DIFFERENT IMAGE TYPES USE CASE*/}
        <picture>
          <source srcset="opera-1x.webp 1x, opera-2x.webp 2x, opera-3x.webp 3x" type="image/webp" />
          <img src="opera-1x.jpg" alt="The Oslo Opera House" srcset="opera-2x.jpg 2x, opera-3x.jpg 3x" />
        </picture>

        {/*HIGH-DPI IMAGES, DIFFERENT IMAGE TYPES & ART DIRECTION USE CASE*/}
        <picture>
          <source
            media="(min-width: 1024px)"
            srcset="opera-fullshot-1x.webp 1x, opera-fullshot-2x.webp 2x, opera-fullshot-3x.webp 3x"
            type="image/webp"
          />
          <source
            media="(min-width: 1024px)"
            srcset="opera-fullshot-1x.jpg 1x, opera-fullshot-2x.jpg 2x, opera-fullshot-3x.jpg 3x"
          />
          <source
            srcset="opera-closeup-1x.webp 1x, opera-closeup-2x.webp 2x, opera-closeup-3x.webp 3x"
            type="image/webp"
          />
          <img
            src="opera-closeup-1x.jpg"
            alt="The Oslo Opera House"
            srcset="opera-closeup-2x.jpg 2x, opera-closeup-3x.jpg 3x"
          />
        </picture>

        {/*        CHANGING IMAGE SIZES & ART DIRECTION USE CASE*/}
        <picture>
          <source
            media="(min-width: 1280px)"
            sizes="50vw"
            srcset="opera-fullshot-200.jpg 200w, opera-fullshot-400.jpg 400w, opera-fullshot-800.jpg 800w, opera-fullshot-1200.jpg 1200w"
          />
          <img
            src="opera-closeup-400.jpg"
            alt="The Oslo Opera House"
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-closeup-200.jpg 200w, opera-closeup-400.jpg 400w, opera-closeup-800.jpg 800w, opera-closeup-1200.jpg 1200w"
          />
        </picture>

        {/*CHANGING IMAGE SIZES & DIFFERENT IMAGE TYPES USE CASE*/}
        <picture>
          <source
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-200.webp 200w, opera-400.webp 400w, opera-800.webp 800w, opera-1200.webp 1200w"
            type="image/webp"
          />
          <img
            src="opera-400.jpg"
            alt="The Oslo Opera House"
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-200.jpg 200w, opera-400.jpg 400w, opera-800.jpg 800w, opera-1200.jpg 1200w"
          />
        </picture>

        {/*CHANGING IMAGE SIZES, DIFFERENT IMAGE TYPES & ART DIRECTION USE CASE*/}
        <picture>
          <source
            media="(min-width: 1280px)"
            sizes="50vw"
            srcset="opera-fullshot-200.webp 200w, opera-fullshot-400.webp 400w, opera-fullshot-800.webp 800w, opera-fullshot-1200.webp 1200w"
            type="image/webp"
          />
          <source
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-closeup-200.webp 200w, opera-closeup-400.webp 400w, opera-closeup-800.webp 800w, opera-closeup-1200.webp 1200w"
            type="image/webp"
          />
          <source
            media="(min-width: 1280px)"
            sizes="50vw"
            srcset="opera-fullshot-200.jpg 200w, opera-fullshot-400.jpg 400w, opera-fullshot-800.jpg 800w, opera-fullshot-1200.jpg 1200w"
          />
          <img
            src="opera-closeup-400.jpg"
            alt="The Oslo Opera House"
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-closeup-200.jpg 200w, opera-closeup-400.jpg 400w, opera-closeup-800.jpg 800w, opera-closeup-1200.jpg 1200w"
          />
        </picture>

        {/*CHANGING IMAGE SIZES, HIGH-DPI IMAGES & ART DIRECTION USE CASE*/}
        <picture>
          <source
            media="(min-width: 1280px)"
            sizes="50vw"
            srcset="opera-fullshot-200.jpg 200w,
                    opera-fullshot-400.jpg 400w,
                    opera-fullshot-1200.jpg 1200w"
          />
          <img
            src="opera-closeup-400.jpg"
            alt="The Oslo Opera House"
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-closeup-200.jpg 200w,
                    opera-closeup-400.jpg 400w,
                    opera-closeup-800.jpg 800w,
                    opera-closeup-1200.jpg 1200w"
          />
        </picture>

        {/*        CHANGING IMAGE SIZES, HIGH-DPI IMAGES & DIFFERENT IMAGE TYPES USE CASE*/}
        <picture>
          <source
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-200.webp 200w,
                    opera-400.webp 400w,
                    opera-800.webp 800w,
                    opera-1200.webp 1200w"
            type="image/webp"
          />
          <img
            src="opera-400.jpg"
            alt="The Oslo Opera House"
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-200.jpg 200w,
                    opera-400.jpg 400w,
                    opera-800.jpg 800w,
                    opera-1200.jpg 1200w"
          />
        </picture>

        {/*CHANGING IMAGE SIZES, HIGH-DPI IMAGES, DIFFERENT IMAGE TYPES & ART DIRECTION USE CASE*/}
        <picture>
          <source
            media="(min-width: 1280px)"
            sizes="50vw"
            srcset="opera-fullshot-200.webp 200w,
                    opera-fullshot-400.webp 400w,
                    opera-fullshot-800.webp 800w,
                    opera-fullshot-1200.webp 1200w"
            type="image/webp"
          />
          <source
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-closeup-200.webp 200w,
                    opera-closeup-400.webp 400w,
                    opera-closeup-800.webp 800w,
                    opera-closeup-1200.webp 1200w"
            type="image/webp"
          />
          <source
            media="(min-width: 1280px)"
            sizes="50vw"
            srcset="opera-fullshot-200.jpg 200w,
                    opera-fullshot-400.jpg 400w,
                    opera-fullshot-800.jpg 800w,
                    opera-fullshot-1200.jpg 1200w"
          />
          <img
            src="opera-closeup-400.jpg"
            alt="The Oslo Opera House"
            sizes="(min-width: 640px) 60vw, 100vw"
            srcset="opera-closeup-200.jpg 200w,
                    opera-closeup-400.jpg 400w,
                    opera-closeup-800.jpg 800w,
                    opera-closeup-1200.jpg 1200w"
          />
        </picture>

        {/*LIVE SAMPLES*/}
        <picture>
          <source
            media="(min-width: 800px)"
            sizes="(max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)"
            srcset="opera-fullshot-200.jpg 200w, opera-fullshot-400.jpg 400w, opera-fullshot-1200.jpg 1200w"
          />
          <img
            src="opera-200.jpg"
            alt="lighthouse"
            sizes="(max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)"
            srcset="opera-200.jpg 200w, opera-400.jpg 400w, opera-1200.jpg 1200w"
          />
        </picture>

        <picture>
          {/*WEBP*/}
          <source
            media="(max-width: 767px)"
            sizes="(max-width: 1366px) 100vw, 1366px"
            srcset="
            images/castle_ar_1_1,c_fill,g_auto__c_scale,w_200.webp 200w,
            images/castle_ar_1_1,c_fill,g_auto__c_scale,w_860.webp 860w,
            images/castle_ar_1_1,c_fill,g_auto__c_scale,w_1366.webp 1366w"
            type="image/webp"
          />
          /* Tablets */
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            sizes="(max-width: 1983px) 70vw, 1388px"
            srcset="
            images/castle_ar_4_3,c_fill,g_auto__c_scale,w_538.webp 538w,
            images/castle_ar_4_3,c_fill,g_auto__c_scale,w_1018.webp 1018w,
            images/castle_ar_4_3,c_fill,g_auto__c_scale,w_1388.webp 1388w"
            type="image/webp"
          />
          /* Desktops */
          <source
            media="(min-width: 992px) and (max-width: 1199px)"
            sizes="(max-width: 2400px) 60vw, 1440px"
            srcset="
            images/castle_ar_16_9,c_fill,g_auto__c_scale,w_596.webp 596w,
            images/castle_ar_16_9,c_fill,g_auto__c_scale,w_874.webp 874w,
            images/castle_ar_16_9,c_fill,g_auto__c_scale,w_1440.webp 1440w"
            type="image/webp"
          />
          /* Extra Large Desktops */
          <source
            sizes="(max-width: 5120px) 40vw, 2048px"
            srcset="
            images/castle_c_scale,w_480.webp 480w,
            images/castle_c_scale,w_822.webp 822w,
            images/castle_c_scale,w_1252.webp 1252w"
            src="images/castle_c_scale,w_1525.webp"
            type="image/webp"
          />
          /* Portrait Phones */
          <source
            media="(max-width: 767px)"
            sizes="(max-width: 1366px) 100vw, 1366px"
            srcset="
            images/castle_ar_1_1,c_fill,g_auto__c_scale,w_200.jpg 200w,
            images/castle_ar_1_1,c_fill,g_auto__c_scale,w_860.jpg 860w,
            images/castle_ar_1_1,c_fill,g_auto__c_scale,w_1366.jpg 1366w"
          />
          /* Tablets */
          <source
            media="(min-width: 768px) and (max-width: 991px)"
            sizes="(max-width: 1983px) 70vw, 1388px"
            srcset="
            images/castle_ar_4_3,c_fill,g_auto__c_scale,w_538.jpg 538w,
            images/castle_ar_4_3,c_fill,g_auto__c_scale,w_1018.jpg 1018w,
            images/castle_ar_4_3,c_fill,g_auto__c_scale,w_1388.jpg 1388w"
          />
          /* Desktops */
          <source
            media="(min-width: 992px) and (max-width: 1199px)"
            sizes="(max-width: 2400px) 60vw, 1440px"
            srcset="
            images/castle_ar_16_9,c_fill,g_auto__c_scale,w_596.jpg 596w,
            images/castle_ar_16_9,c_fill,g_auto__c_scale,w_874.jpg 874w,
            images/castle_ar_16_9,c_fill,g_auto__c_scale,w_1440.jpg 1440w"
          />
          /* Extra Large Desktops */
          <img
            sizes="(max-width: 5120px) 40vw, 2048px"
            srcset="
            images/castle_c_scale,w_480.jpg 480w,
            images/castle_c_scale,w_822.jpg 822w,
            images/castle_c_scale,w_1252.jpg 1252w"
            src="images/castle_c_scale,w_1525.jpg"
            alt=""
          />
        </picture>

        {/*BOOTSTRAP SAMPLE*/}
        <picture>
          /* Extra Large Desktops */
          <source media="(min-width: 75rem)" srcset="picture-large.jpg, picture-large-2x.jpg 2x" />
          /* Desktops */
          <source media="(min-width: 62rem)" srcset="large.jpeg, large-2x.jpeg 2x" />
          /* Tablets */
          <source media="(min-width: 48rem)" srcset="medium.jpeg, medium-2x.jpeg 2x" />
          /* Landscape Phones */
          <source media="(min-width: 34rem)" srcset="small.jpeg, small-2x.jpeg 2x" />
          /* Portrait Phones */
          <img src="picture-tiny.jpg" srcset="extrasmall.jpeg, extrasmall-2x.jpeg 2x" />
        </picture>
      </div>
    );
  }
}

export { RwdImages };
