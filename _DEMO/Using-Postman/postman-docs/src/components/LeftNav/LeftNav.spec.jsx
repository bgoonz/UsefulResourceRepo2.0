import React from 'react';
import renderer from 'react-test-renderer';
import LeftNav from './LeftNav';

// LeftNav uses useStaticQuery which requires the data to be mocked in /__mocks__/gatsby.js

describe('ContextualLinks', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<LeftNav />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
