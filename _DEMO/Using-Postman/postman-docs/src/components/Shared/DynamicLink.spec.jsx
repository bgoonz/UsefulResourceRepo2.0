import React from 'react';
import renderer from 'react-test-renderer';
import DynamicLink from './DynamicLink';

describe('DynamicLink', () => {
  it('should have a class of dynamic-link__external for external links', () => {
    const tree = renderer
      .create(<DynamicLink url="https://duckduckgo.com" name="ddg" />)
      .toJSON();
    expect(tree.props.className).toBe('dynamic-link__external');
  });

  it('should have a class of dynamic-link__internal for internal links', () => {
    const tree = renderer
      .create(
        <DynamicLink url="/docs/" name="docs" />,
      )
      .toJSON();
    expect(tree.props.className).toBe('dynamic-link__internal');
  });

  it('should apply any classes passed by property', () => {
    const tree = renderer
      .create(<DynamicLink className="testClass" url="/foo" name="foo" />)
      .toJSON();
    expect(tree.props.className).toContain('testClass');
  });
});
