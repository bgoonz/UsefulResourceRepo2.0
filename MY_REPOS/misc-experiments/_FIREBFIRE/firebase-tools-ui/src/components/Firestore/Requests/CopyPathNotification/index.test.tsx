/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


import CopyPathNotification, { SNACKBAR_MESSAGE } from './index';

describe('CopyPathNotification', () => {
  it('render snackbar when showCopyNotification is true', () => {
    const SET_SHOW_COPY_NOTIFICATION = jest.fn();
    const { getByText } = render(
      <CopyPathNotification
        showCopyNotification={true}
        setShowCopyNotification={SET_SHOW_COPY_NOTIFICATION}
        // Show snackbar indefinitely (just for testing purposes)
        timeout={-1}
      />
    );
    expect(getByText(SNACKBAR_MESSAGE)).not.toBeNull();
  });

  // TODO: test the snackbar behavior to appear and dissapear
  // using a more intuitive approach: test if the component is
  // hidden or not by testing css styles
  it('set showCopyNotification to false after snackbar timeout is over', async () => {
    const SET_SHOW_COPY_NOTIFICATION = jest.fn();
    render(
      <CopyPathNotification
        showCopyNotification={true}
        setShowCopyNotification={SET_SHOW_COPY_NOTIFICATION}
        // Hide snackbar after 1 ms (just for testing purposes)
        timeout={1}
      />
    );
    await waitFor(() =>
      expect(SET_SHOW_COPY_NOTIFICATION).toHaveBeenCalledWith(false)
    );
  });
});
