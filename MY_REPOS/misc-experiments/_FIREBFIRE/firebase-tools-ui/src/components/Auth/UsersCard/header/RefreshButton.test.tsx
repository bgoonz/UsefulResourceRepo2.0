/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { RefreshButton } from './RefreshButton';

describe('RefreshButton text', () => {
  it('calls the refresh prop', () => {
    const refresh = jest.fn();

    const { getByLabelText } = render(<RefreshButton refresh={refresh} />);

    expect(refresh).not.toHaveBeenCalled();
    fireEvent.click(getByLabelText('Refresh'));
    expect(refresh).toHaveBeenCalled();
  });
});
