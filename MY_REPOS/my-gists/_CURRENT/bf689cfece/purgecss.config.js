module.exports = {
  /*
    Look in these files for CSS selectors.
    Essentially, all of these file types…

    - *.html
    - *.js
    - *.php

    …that are NOT within "node_modules/".

    For example:

    ```
    <div id="my-specific-class">
      <!-- etc. -->
    </div>
    ```

    If they appear to be in use, those styles
    will be retained in our generated CSS.

    If not, then they will be purged.
  */
  content: [
    '!(node_modules)**/*.{html,js,php}'
  ],

  /*
    Path to CSS output.
  */
  css: [
    './build/static/*.css'
  ],
  
  /*
    Remove unused CSS animation `keyframes`.
  */
  keyframes: true,
  
  /*
    Allow for third party class names, from:
    
    - Highlight.js
    - Jetpack
    - WordPress
  */
  whitelistPatterns: [/^hljs|^jetpack-|^wp-/],
};
