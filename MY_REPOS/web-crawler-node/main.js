'use strict';

const URL = require('url-parse');
let urls = [ "https://web-dev-resource-hub.netlify.app/core-site/page-contact.html", "https://tender-bartik-074feb.netlify.app/", "https://web-dev-resource-hub.netlify.app/directory.html", "https://web-dev-resource-hub.netlify.app/core-site/resources.html", "https://web-dev-resource-hub.netlify.app/core-site/index.html" ];
 const { depthFirstSearch } = require('./depth-first-search');
const breadthFirstSearch = require('./breadth-first-search');

(async function() {
  try {

    // clear console
    process.stdout.write('\x1B[2J\x1B[0f');

    for (const s of urls) {

      // counter will increment for each hit
      let counter = 0;

      await breadthFirstSearch(s, function(domTree, url) {
        const as = domTree('a');
        for (let i = 0; i < as.length; i++) {
          const href = as[i].attribs.href;
          if (href) {
            const hostname = new URL(href).hostname;
            if ( hostname.includes( 'netlify' ) ) {
              console.log(`Found link: ${href} on ${url}`);
              counter++;
            }
          }
        }
      });
      console.log('\n\n');
      if (counter === 0) {
        console.log(`Finished. Could not find any links on ${s}`);
      } else {
        const message = 'Finished. Found a total of '
          + counter
          + ' link'
          + (counter === 1 ? '' : 's')
          + ' on ' + s;
        console.log(message);
      }
      console.log('\n\n');
    }
  } catch (err) {
    console.error(err);
  }
})();
