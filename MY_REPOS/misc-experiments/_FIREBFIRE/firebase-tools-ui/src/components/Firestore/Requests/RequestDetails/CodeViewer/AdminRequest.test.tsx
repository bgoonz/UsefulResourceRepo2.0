/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import CodeViewerAdminRequest, { ADMIN_REQUEST_MESSAGE } from './AdminRequest';

describe('CodeViewerAdminRequest', () => {
  it('shows admin-request message', () => {
    const { getByText } = render(<CodeViewerAdminRequest />);
    expect(getByText(ADMIN_REQUEST_MESSAGE)).not.toBeNull();
  });
});
