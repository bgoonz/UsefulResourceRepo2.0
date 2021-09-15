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
'./event_id';

describe('core/util/event_id', () => {
  it('sub-15 digit id', () => {
    expect(_generateEventId('', 10)).to.have.length(10);
  });

  it('15 digit id', () => {
    expect(_generateEventId('', 15)).to.have.length(15);
  });

  it('above-15 digit id', () => {
    expect(_generateEventId('', 20)).to.have.length(20);
  });
});
