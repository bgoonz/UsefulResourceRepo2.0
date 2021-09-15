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

export const VERSION_PARAM = 'v';

export const TRANSPORT_SESSION_PARAM = 's';

export const REFERER_PARAM = 'r';

export const FORGE_REF = 'f';

// Matches console.firebase.google.com, firebase-console-*.corp.google.com and
// firebase.corp.google.com
export const FORGE_DOMAIN_RE =
  /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;

export const LAST_SESSION_PARAM = 'ls';

export const APPLICATION_ID_PARAM = 'p';

export const APP_CHECK_TOKEN_PARAM = 'ac';

export const WEBSOCKET = 'websocket';

export const LONG_POLLING = 'long_polling';
