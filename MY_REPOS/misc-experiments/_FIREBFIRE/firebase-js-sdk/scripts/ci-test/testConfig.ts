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
ges` and `onlyIncludePackages` at same time,
 * `ignorePacakges` will be ignored if you do so
 */
export interface TestConfig {
  // Ignore the packages in test even if they changed
  ignorePackages?: string[];
  // Only test these packages if any changed
  onlyIncludePackages?: string[];
  // Always test these packages even if they didn't change
  alwaysIncludePackages?: string[];
}

export const testConfig: {
  [key: string]: TestConfig | undefined;
} = {
  'core': {
    'ignorePackages': [
      '@firebase/firestore',
      'firebase-firestore-integration-test',
      'firebase-messaging-integration-test',
      'firebase-namespace-integration-test',
      'firebase-compat-typings-test',
      '@firebase/rules-unit-testing',
      '@firebase/auth',
      'firebase',
    ]
  },
  'firestore': {
    'onlyIncludePackages': ['@firebase/firestore', '@firebase/firestore-compat']
  },
  'firestore-integration': {
    'onlyIncludePackages': ['firebase-firestore-integration-test']
  },
  'fcm-integration': {
    'onlyIncludePackages': ['firebase-messaging-integration-test']
  },
  'misc': {
    'onlyIncludePackages': ['@firebase/rules-unit-testing']
  },
  'firebase-integration': {
    'alwaysIncludePackages': ['firebase-namespace-integration-test']
  },
  'auth': {
    'onlyIncludePackages': ['@firebase/auth']
  }
};
