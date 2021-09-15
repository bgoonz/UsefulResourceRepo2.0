/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import StringEditor from './StringEditor';

it('renders an editor for a string', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <StringEditor value={'foo'} onChange={onChange} />
  );

  expect(getByLabelText('Value').value).toBe('foo');

  fireEvent.change(getByLabelText('Value'), {
    target: { value: 'new' },
  });

  expect(onChange).toHaveBeenCalledWith('new');
});
