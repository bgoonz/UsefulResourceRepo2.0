import React from 'react';
import ReactDOM from 'react-dom';
import {Form, InputAddon} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component, element}) => {
  describe('addons', () => {
    describe('with label', () => {
      it('should support leftAddon attribute', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component label="My label" name="comp" leftAddon={<InputAddon>cool addon</InputAddon>} /></Form>,
        );

        const el = ReactDOM.findDOMNode(instance);
        const label = el.querySelector('.form-group > label');
        const control = el.querySelector(`.form-group div.input-group > span.input-group-addon+${element}`);
        const addon = el.querySelector('.form-group div.input-group > span.input-group-addon');
        expect(label).to.have.text('My label');
        expect(control).to.not.be.null();
        expect(addon).to.have.text('cool addon');
      });

      it('should support rightAddon attribute', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component label="My label" name="comp" rightAddon={<InputAddon>cool addon</InputAddon>} /></Form>,
        );

        const el = ReactDOM.findDOMNode(instance);
        const label = el.querySelector('.form-group > label');
        const control = el.querySelector(`.form-group div.input-group > ${element}`);
        const addon = el.querySelector(`.form-group div.input-group > ${element}+span.input-group-addon`);
        expect(label).to.have.text('My label');
        expect(control).to.not.be.null();
        expect(addon).to.have.text('cool addon');
      });
    });

    describe('without label', () => {
      it('should support leftAddon attribute', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component name="comp" leftAddon={<InputAddon>cool addon</InputAddon>} /></Form>,
        );

        const el = ReactDOM.findDOMNode(instance);
        const control = el.querySelector(`span > div.input-group > span.input-group-addon+${element}`);
        const addon = el.querySelector('span > div.input-group > span.input-group-addon');
        expect(control).to.not.be.null();
        expect(addon).to.have.text('cool addon');
      });

      it('should support rightAddon attribute', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><Component name="comp" rightAddon={<InputAddon>cool addon</InputAddon>} /></Form>,
        );

        const el = ReactDOM.findDOMNode(instance);
        const control = el.querySelector(`span > div.input-group > ${element}`);
        const addon = el.querySelector(`span > div.input-group > ${element}+span.input-group-addon`);
        expect(control).to.not.be.null();
        expect(addon).to.have.text('cool addon');
      });
    });
  });
};
