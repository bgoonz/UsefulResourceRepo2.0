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

/**
 * Checks if all required APIs exist in the browser.
 * @returns a Promise that resolves to a boolean.
 *
 * @public
 */
export async function isWindowSupported(): Promise<boolean> {
  // firebase-js-sdk/issues/2393 reveals that idb#open in Safari iframe and Firefox private browsing
  // might be prohibited to run. In these contexts, an error would be thrown during the messaging
  // instantiating phase, informing the developers to import/call isSupported for special handling.
  return (
    (await validateIndexedDBOpenable()) &&
    'indexedDB' in window &&
    indexedDB !== null &&
    navigator.cookieEnabled &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window &&
    'fetch' in window &&
    ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
    PushSubscription.prototype.hasOwnProperty('getKey')
  );
}

/**
 * Checks whether all required APIs exist within SW Context
 * @returns a Promise that resolves to a boolean.
 *
 * @public
 */
export async function isSwSupported(): Promise<boolean> {
  // firebase-js-sdk/issues/2393 reveals that idb#open in Safari iframe and Firefox private browsing
  // might be prohibited to run. In these contexts, an error would be thrown during the messaging
  // instantiating phase, informing the developers to import/call isSupported for special handling.
  return (
    (await validateIndexedDBOpenable()) &&
    'indexedDB' in self &&
    indexedDB !== null &&
    'PushManager' in self &&
    'Notification' in self &&
    ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
    PushSubscription.prototype.hasOwnProperty('getKey')
  );
}
