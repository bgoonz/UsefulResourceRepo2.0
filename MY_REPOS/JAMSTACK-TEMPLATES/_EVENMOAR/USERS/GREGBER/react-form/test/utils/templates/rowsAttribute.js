import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('rows', () => {
    it('should support rows attribute', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" rows={10} /></Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);
      expect(el).to.have.attr('rows', '10');
    });
  });
};
