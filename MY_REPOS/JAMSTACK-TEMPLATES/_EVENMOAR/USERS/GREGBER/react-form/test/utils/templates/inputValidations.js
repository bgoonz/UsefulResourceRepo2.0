import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('validations', () => {
    it('should put hasError class if needed', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" defaultValue="" validations="isNumeric" /></Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const wrapper = domElement.children[0];
      const el = domElement.querySelector(element);

      expect(wrapper).to.not.have.class('has-error');

      el.value = 'foo';
      TestUtils.Simulate.change(el);

      expect(wrapper).to.have.class('has-error');

      el.value = '10';
      TestUtils.Simulate.change(el);

      expect(wrapper).to.not.have.class('has-error');
    });
  });
};
