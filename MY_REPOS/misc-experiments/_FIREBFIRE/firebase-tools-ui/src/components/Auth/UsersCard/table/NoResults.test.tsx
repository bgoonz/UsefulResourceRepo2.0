/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { NoResults } from './NoResults';

describe('NoResults', () => {
  it('renders header row when there are no users', () => {
    const { getByText } = render(<NoResults />);
    expect(getByText('No results')).not.toBeNull();
  });
});
