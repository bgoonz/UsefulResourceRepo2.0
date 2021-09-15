/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
` to override a few globals on top of jsdom.

const JsdomEnvironment = require('jest-environment-jsdom');

class EmulatorUiTestEnvironment extends JsdomEnvironment {
  constructor(config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          // https://github.com/firebase/firebase-js-sdk/issues/3096#issuecomment-640259275
          Uint32Array: Uint32Array,
          Uint8Array: Uint8Array,
          ArrayBuffer: ArrayBuffer,

          // grpc requires Node.js timers (with .unref()), not browser timers.
          setImmediate: setImmediate,
          setInterval: setInterval,
          setTimeout: setTimeout,
        }),
      })
    );
  }

  async setup() {}

  async teardown() {}
}

module.exports = EmulatorUiTestEnvironment;
