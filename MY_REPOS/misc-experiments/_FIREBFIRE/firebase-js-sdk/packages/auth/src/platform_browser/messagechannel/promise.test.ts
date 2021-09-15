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
omise';

describe('platform_browser/messagechannel/promise', () => {
  describe('_allSettled', () => {
    it('should work with a single successfull promise', async () => {
      const result = await _allSettled([Promise.resolve('foo')]);
      expect(result).to.have.deep.members([
        {
          fulfilled: true,
          value: 'foo'
        }
      ]);
    });

    it('should work with a failed promise', async () => {
      const result = await _allSettled([Promise.reject('bar')]);
      expect(result).to.have.deep.members([
        {
          fulfilled: false,
          reason: 'bar'
        }
      ]);
    });

    it('should work with mixed promises', async () => {
      const result = await _allSettled([
        Promise.resolve('foo'),
        Promise.reject('bar')
      ]);
      expect(result).to.have.deep.members([
        {
          fulfilled: true,
          value: 'foo'
        },
        {
          fulfilled: false,
          reason: 'bar'
        }
      ]);
    });
  });
});
