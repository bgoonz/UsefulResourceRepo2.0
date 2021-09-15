/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

const fetch = require('node-fetch');
const FCM_SEND_ENDPOINT = 'https://fcm.googleapis.com/fcm/send';
// Rotatable fcm server key. It's generally a bad idea to expose server keys. The reason is to
// simplify testing process (no need to implement server side decryption of git secret). The
// justification is that a) this is a disposable test project b)  the key itself is rotatable.
const FCM_KEY =
  'AAAArtlRq60:APA91bHFulW1dBpIPbArYXPbFtO9M_a9ZNXhnj9hGArfGK55g8fv5s5Qset6984xRIrqhZ_3IlKcG9LgSk3DiTdHMDIOkxboNJquNK1SChC7J0ULTvHPg7t0V6AjR1UEA21DXI22BM5N';

module.exports = async payload => {
  console.log(
    'Requesting to send an FCM message with payload: ' + JSON.stringify(payload)
  );

  const response = await fetch(FCM_SEND_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Authorization: 'key=' + FCM_KEY,
      'Content-Type': 'application/json'
    }
  });

  // Note that FCM Send API responses are in HTML format
  let res = await response.text();
  return JSON.parse(res);
};
