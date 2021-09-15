import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import sinon from 'sinon';

export default ({Component, element}) => {
  describe('onChange', () => {
    it('should support onChange', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" defaultValue="" onChange={spy} /></Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);

      el.value = '10';
      TestUtils.Simulate.change(el);

      expect(spy).to.be.calledWith('10');
    });

    it('should prevent additional triggering', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" onChange={spy} value="10" /></Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);

      el.value = '10';
      TestUtils.Simulate.change(el);

      expect(spy).to.not.be.called();

      el.value = '11';
      TestUtils.Simulate.change(el);

      expect(spy).to.be.calledOnce();
      expect(spy).to.be.calledWith('11');
    });
  });
};
