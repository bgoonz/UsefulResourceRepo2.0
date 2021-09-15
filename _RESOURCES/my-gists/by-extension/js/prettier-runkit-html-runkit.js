// Prettify Runkit HTML
// (Not relevant for demo)
const html = '<div id="a">asdf</div>';
const prettier = require("prettier");
'<pre>' +
  prettier
    .format(html, {parser: 'html', htmlWhitespaceSensitivity: 'ignore'})
    .replace(/</g, '&lt;') +
  '</pre>';

// See demo here: https://runkit.com/embed/mfigg7b3rcb5