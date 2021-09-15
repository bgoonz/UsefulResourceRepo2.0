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
        <Form>
          <Component
            name="comp"
            onChange={spy}
            options={['foo', 'bar']}
          />
        </Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);

      el.value = 'bar';
      TestUtils.Simulate.change(el);

      expect(spy).to.be.calledWith('bar');
    });

    it('should prevent additional triggering', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <Component
            name="comp"
            onChange={spy}
            options={['foo', 'bar']}
            value="foo"
          />
        </Form>,
      );

      const el = ReactDOM.findDOMNode(instance).querySelector(element);

      el.value = 'foo';
      TestUtils.Simulate.change(el);

      expect(spy).to.not.be.called();

      el.value = 'bar';
      TestUtils.Simulate.change(el);

      expect(spy).to.be.calledOnce();
      expect(spy).to.be.calledWith('bar');
    });
  });
};
