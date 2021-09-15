/*!
 * Copyright 2020 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

const core = require('@actions/core');
const Twitter = require('twitter');

function sendTweet() {
  const twitter = new Twitter({
    consumer_key: core.getInput('consumer-key'),
    consumer_secret: core.getInput('consumer-secret'),
    access_token_key: core.getInput('access-token'),
    access_token_secret: core.getInput('access-token-secret')
  });

  return twitter.post('/statuses/update', {status: core.getInput('status')})
    .then(() => {
      return;
    })
    .catch((err) => {
      core.setFailed(err.message);
    });
}

sendTweet();
