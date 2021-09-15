/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { CustomMetadata } from './CustomMetadata';

describe('CustomMetadata', () => {
  const value = 'pirojok';
  const key = 'key';
  const metadata = { [key]: value };

  async function setup() {
    return render(<CustomMetadata metadata={metadata} />);
  }

  it('displays the data', async () => {
    const { getByText } = await setup();

    // Open
    await act(async () => {
      await fireEvent.click(getByText('Custom metadata'));
    });

    expect(getByText(value)).toBeDefined();
    expect(getByText(key)).toBeDefined();
  });
});
