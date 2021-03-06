/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *


import { DatabaseEmulator } from './emulators/database-emulator';

function runTest(port: number, namespace: string) {
  const options = {
    cwd: path.resolve(__dirname, '../../packages/database'),
    env: Object.assign({}, process.env, {
      RTDB_EMULATOR_PORT: port,
      RTDB_EMULATOR_NAMESPACE: namespace
    }),
    stdio: 'inherit' as const
  };
  return spawn('yarn', ['test:all'], options);
}

async function run(): Promise<void> {
  const emulator = new DatabaseEmulator();
  try {
    await emulator.download();
    await emulator.setUp();
    await emulator.setPublicRules();
    await runTest(emulator.port, emulator.namespace);
  } finally {
    await emulator.tearDown();
  }
}

run().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
