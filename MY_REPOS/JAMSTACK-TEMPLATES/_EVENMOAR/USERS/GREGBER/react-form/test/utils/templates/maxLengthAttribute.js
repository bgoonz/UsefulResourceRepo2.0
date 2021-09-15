import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('maxLength', () => {
    it('should support maxLength attribute', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component maxLength={10} name="comp" /></Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);
      expect(el).to.have.attr('maxLength', '10');
    });
  });
};
