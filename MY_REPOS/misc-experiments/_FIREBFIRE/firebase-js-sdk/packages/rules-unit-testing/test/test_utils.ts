/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

let envVars: Record<string, string | undefined>;
export function stashEnvVars() {
  envVars = {};
  for (const envVar of Object.values(EMULATOR_HOST_ENV_VARS)) {
    envVars[envVar] = process.env[envVar];
    delete process.env[envVar];
  }
}

export function restoreEnvVars() {
  for (const envVar of Object.values(EMULATOR_HOST_ENV_VARS)) {
    if (envVars[envVar] === undefined) {
      delete process.env[envVar];
    } else {
      process.env[envVar] = envVars[envVar];
    }
  }
}
