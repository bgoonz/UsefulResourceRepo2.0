import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('placeholder', () => {
    it('should support placeholder attribute', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" placeholder="my placeholder" /></Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);
      expect(el).to.have.attr('placeholder', 'my placeholder');
    });
  });
};
