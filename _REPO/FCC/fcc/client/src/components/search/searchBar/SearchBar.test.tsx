import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { SearchBar } from './search-bar';

describe('<SearchBar />', () => {
  it('renders to the DOM', () => {
    const shallow = ShallowRenderer.createRenderer();
    shallow.render(<SearchBar {...searchBarProps} />);
    const result = shallow.getRenderOutput();
    expect(result).toBeTruthy();
  });

  /* Todo: When e2e testing is in place,
  add tests to check that the search bar
  resets to -1 on change/input, redirects to a
  selected hit, and redirects to dev news if
  there's a query and no hit is selected */
});

const searchBarProps = {
  toggleSearchDropdown: jest.fn(),
  toggleSearchFocused: jest.fn(),
  updateSearchQuery: jest.fn()
};
