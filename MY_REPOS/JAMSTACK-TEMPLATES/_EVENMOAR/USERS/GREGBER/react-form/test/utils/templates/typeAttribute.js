import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('type', () => {
    it('should support type attribute', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" type="email" /></Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);
      expect(el).to.have.attr('type', 'email');
    });
  });
};
