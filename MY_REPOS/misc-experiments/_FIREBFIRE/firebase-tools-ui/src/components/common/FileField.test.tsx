/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { FileField } from './FileField';

describe('<FileField>', () => {
  it('renders given label', () => {
    const { getByText } = render(<FileField label="My label" />);

    expect(getByText('My label')).not.toBeNull();
  });

  it('renders the value if provided', () => {
    const { getByText } = render(
      <FileField label="My label" value="filename.json" onFiles={jest.fn()} />
    );

    expect(getByText('filename.json')).not.toBeNull();
  });

  it('shows a tip below', () => {
    const { getByText } = render(<FileField label="My label" tip="A tip!" />);

    expect(getByText('A tip!')).not.toBeNull();
  });

  it('shows an error instead of the tip', () => {
    const { getByText, queryByText } = render(
      <FileField label="My label" tip="A tip!" error="Missing!" />
    );

    expect(queryByText('A tip!')).toBeNull();
    expect(getByText('Missing!')).not.toBeNull();
  });
});
