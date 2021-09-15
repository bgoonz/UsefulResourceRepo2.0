/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
pp-compat';
import '@firebase/auth-compat';
import * as anonymous from './anonymous';
import * as core from './core';
import * as popup from './popup';
import * as email from './email';
import * as persistence from './persistence';
import * as ui from './ui';
import { loadScript } from './lazy_load';

window.core = core;
window.anonymous = anonymous;
window.redirect = redirect;
window.popup = popup;
window.email = email;
window.persistence = persistence;
window.ui = ui;

window.compat = null;
window.legacyAuth = null;

// The config and emulator URL are injected by the test. The test framework
// calls this function after that injection.
window.startAuth = async () => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().useEmulator(emulatorUrl);
  window.compat = firebase;
};

window.startLegacySDK = async persistence => {
  await loadScript('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
  await loadScript('https://www.gstatic.com/firebasejs/8.3.0/firebase-auth.js');

  window.firebase.initializeApp(firebaseConfig);
  // Make sure the firebase variable here is the legacy SDK
  if (window.firebase.SDK_VERSION !== '8.3.0') {
    reject(
      new Error(
        'Not using correct legacy version; using ' + window.firebase.SDK_VERSION
      )
    );
  }
  const legacyAuth = window.firebase.auth();
  legacyAuth.useEmulator(emulatorUrl);
  legacyAuth.setPersistence(persistence.toLowerCase());
  window.legacyAuth = legacyAuth;
};
