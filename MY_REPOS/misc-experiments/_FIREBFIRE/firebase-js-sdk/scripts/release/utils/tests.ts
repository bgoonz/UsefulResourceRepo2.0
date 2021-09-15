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
om '../../utils';

export async function runTests() {
  try {
    await spawn('yarn', ['test:release'], {
      cwd: root,
      stdio: 'inherit'
    });
  } catch (err) {
    throw err;
  }
}

export async function setupTestDeps(): Promise<void> {
  await spawn('yarn', ['test:setup'], { stdio: 'inherit' });
}
