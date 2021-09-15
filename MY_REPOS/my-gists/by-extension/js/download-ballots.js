'use strict';

const download = require('download');

/**
 * Download all ballots
 */

const dl = async (baseurl, dest) => {
  const pending = [];
  let finished = 0;

  for (let index = 1; index < 1326; index++) {
    const promise = download(baseurl.replace(/%n/, index), dest).then(() => {
      process.stdout.write(`\rDownloaded ${(++finished).toLocaleString()}`);
      pending.splice(pending.indexOf(promise), 1);
    });

    pending.push(promise);

    if (pending.length >= 100) {
      await Promise.all(pending);
    }
  }
};

/**
 * Usage
 */

// define the desination directory
const dest = 'replace_with_absolute_path_to_dest_directory';

dl('https://apps.alleghenycounty.us/website/PDF_GEN/GEN%20(%n).pdf', dest)
  .then(() => {
    console.log('\nDone!');
  });
