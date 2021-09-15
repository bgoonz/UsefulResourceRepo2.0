import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component}) => {
  describe('placeholder', () => {
    it('should support placeholder', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <Component
            name="comp"
            options={['foo', '10']}
            placeholder="Choose something"
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const select = domElement.querySelector('select');
      const options = domElement.querySelectorAll('option');

      expect(options[0]).to.have.text('Choose something');
      expect(options[0]).to.have.attr('value', '');

      expect(options[1]).to.have.text('foo');
      expect(options[1]).to.have.attr('value', 'foo');

      expect(options[2]).to.have.text('10');
      expect(options[2]).to.have.attr('value', '10');

      expect(select).to.have.class('placeholder');

      options[2].selected = true;
      TestUtils.Simulate.change(options[2]);

      expect(select).to.not.have.class('placeholder');
    });
  });
};
