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
sert';

export function _emulatorUrl(config: ConfigInternal, path?: string): string {
  debugAssert(config.emulator, 'Emulator should always be set here');
  const { url } = config.emulator;

  if (!path) {
    return url;
  }

  return `${url}${path.startsWith('/') ? path.slice(1) : path}`;
}
