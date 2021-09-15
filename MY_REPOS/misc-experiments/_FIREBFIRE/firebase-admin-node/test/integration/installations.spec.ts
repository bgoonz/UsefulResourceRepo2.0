/*!
 * Copyright 2021 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */

import * as admin from '../../lib/index';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

describe('admin.installations', () => {
  it('deleteInstallation() fails when called with fictive-ID0 instance ID', () => {
    // instance ids have to conform to /[cdef][A-Za-z0-9_-]{9}[AEIMQUYcgkosw048]/
    return admin.installations().deleteInstallation('fictive-ID0')
      .should.eventually.be
      .rejectedWith('Installation ID "fictive-ID0": Failed to find the installation ID.');
  });
});
