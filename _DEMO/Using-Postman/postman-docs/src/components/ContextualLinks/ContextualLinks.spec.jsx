import React from 'react';
import renderer from 'react-test-renderer';
import ContextualLinks from './ContextualLinks';

describe('ContextualLinks', () => {
  it('renders correctly', () => {
    const testLinks = [
      {
        type: 'section',
        name: 'Prerequisites',
      },
      {
        type: 'link',
        name: 'Download and Install',
        url: 'https://www.postman.com/downloads/',
      },
      {
        type: 'subtitle',
        name: 'Related Blog Posts',

      },
      {
        type: 'link',
        name: 'home',
        url: '/',
      },
    ];

    const tree = renderer
      .create(<ContextualLinks links={testLinks} />)
      .toJSON();
    expect(tree.children[0].props.className).toBe('contextual-links__section');
    expect(tree.children[1].props.className).toBe('contextual-links__link');
    expect(tree).toMatchSnapshot();
  });
});
