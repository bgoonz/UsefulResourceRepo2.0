/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
Timers } from 'sinon';
import '../testing/setup';
import { sleep } from './sleep';

describe('sleep', () => {
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers({ shouldAdvanceTime: true });
  });

  it('returns a promise that resolves after a given amount of time', async () => {
    const t0 = clock.now;
    await sleep(100);
    const t1 = clock.now;

    expect(t1 - t0).to.equal(100);
  });
});
