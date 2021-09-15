/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import { AuthHeader } from './AuthHeader';

jest.mock('./AuthFilter', () => () => null);
jest.mock('./RefreshButton', () => () => null);

describe('AuthHeader', () => {
  it('triggers onOpenNewUserDialog on button click', () => {
    const onOpenNewUserDialog = jest.fn();

    const { getByText } = render(
      <AuthHeader onOpenNewUserDialog={onOpenNewUserDialog} />
    );

    fireEvent.click(getByText('Add user'));
    expect(onOpenNewUserDialog).toHaveBeenCalled();
  });
});
