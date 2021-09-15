import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('label', () => {
    describe('without label', () => {
      it('should wrap it in a span', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component name="comp" /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);

        expect(domElement).to.contain(`span > ${element}`);
        expect(domElement.querySelector(element)).to.have.class('form-control');
        expect(domElement.querySelector(element)).to.have.attr('name', 'comp');
      });
    });

    describe('with label', () => {
      it('should wrap it in a div and display label', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component label="My label" name="comp" /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);
        const el = domElement.querySelector(element);
        const label = domElement.querySelector('label');

        expect(domElement).to.contain(`div > ${element}`);
        expect(domElement).to.contain('div > label');
        expect(label).to.have.text('My label');
        expect(el).to.have.attr('name', 'comp');
        expect(el).to.have.class('form-control');
      });

      it('should work without an id', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component label="My label" name="comp" /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);
        const el = domElement.querySelector(element);
        const label = domElement.querySelector('label');
        expect(label.getAttribute('for'))
          .to.equal(el.id);
      });

      it('should work with an id', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component id="my-custom-id" label="My label" name="comp" /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);
        const el = domElement.querySelector(element);
        const label = domElement.querySelector('label');
        expect(label.getAttribute('for'))
          .to.equal(el.id)
          .to.equal('my-custom-id');
      });
    });
  });

  describe('wrapperClassName', () => {
    it('should support wrapperClassName', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" wrapperClassName="wrapp" /></Form>,
      );

      const wrapper = ReactDOM.findDOMNode(instance).children[0];
      expect(wrapper).to.have.class('wrapp');
    });
  });

  describe('defaultValue', () => {
    it('should support defaultValue', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><Component name="comp" options={{foo: 'foo'}} defaultValue="foo" /></Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const el = domElement.querySelector(element);
      expect(el.value).to.equal('foo');
    });
  });
};
