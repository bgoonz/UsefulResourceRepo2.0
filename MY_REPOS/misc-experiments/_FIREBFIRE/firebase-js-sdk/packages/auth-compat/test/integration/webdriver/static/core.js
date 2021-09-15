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

  return clearPersistence();
}

export function authInit() {
  return new Promise(resolve => {
    compat.auth().onAuthStateChanged(user => {
      resolve();
    });
  });
}

export function legacyAuthInit() {
  return new Promise(resolve => {
    legacyAuth.onAuthStateChanged(() => resolve());
  });
}

export async function userSnap() {
  return compat.auth().currentUser;
}

export async function legacyUserSnap() {
  return legacyAuth.currentUser;
}

export async function authSnap() {
  return compat.auth();
}

export function signOut() {
  return compat.auth().signOut();
}
