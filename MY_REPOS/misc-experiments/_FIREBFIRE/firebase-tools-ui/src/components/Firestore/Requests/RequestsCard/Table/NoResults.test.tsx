/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import RequestsNoResults, { NO_RESULTS_MESSAGE } from './NoResults';

describe('Requests NoResults', () => {
  it('renders no results message', () => {
    const { getByText } = render(<RequestsNoResults />);
    expect(getByText(NO_RESULTS_MESSAGE)).not.toBeNull();
  });
});
