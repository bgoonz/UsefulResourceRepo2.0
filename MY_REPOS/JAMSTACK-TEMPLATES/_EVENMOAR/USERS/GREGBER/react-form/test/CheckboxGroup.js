import {CheckboxGroup} from '../src';
import setup from './utils/setup';
import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import sinon from 'sinon';

describe('CheckboxGroup', () => {
  setup();

  const OPTIONS = {yes: 'Yes', no: 'No'};

  describe('label', () => {
    describe('without label', () => {
      it('should wrap it in a span', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><CheckboxGroup name="comp" options={OPTIONS} /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);

        expect(domElement).to.contain('span > label > input');

        const checkboxes = Array.from(domElement.querySelectorAll('input'));
        expect(checkboxes).to.length(2);
        checkboxes.forEach(checkbox => {
          expect(checkbox).to.have.attr('type', 'checkbox');
          expect(checkbox).to.have.attr('name', 'comp');
        });
      });
    });

    describe('with label', () => {
      it('should wrap it in a div and display label', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><CheckboxGroup label="My label" name="comp" options={OPTIONS} /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);
        const label = domElement.querySelector('label');

        expect(domElement).to.contain('div > label > input');
        expect(domElement).to.contain('div > label');
        expect(label).to.have.text('My label');

        const checkboxes = Array.from(domElement.querySelectorAll('input'));
        expect(checkboxes).to.length(2);
        checkboxes.forEach(checkbox => {
          expect(checkbox).to.have.attr('type', 'checkbox');
          expect(checkbox).to.have.attr('name', 'comp');
        });
      });

      it('should not have an id', () => {
        const instance = TestUtils.renderIntoDocument(
          <Form><CheckboxGroup label="My label" name="comp" options={OPTIONS} /></Form>,
        );

        const domElement = ReactDOM.findDOMNode(instance);
        const el = domElement.querySelector('input');
        expect(el).to.not.have.attr('id');
      });
    });
  });

  describe('wrapperClassName', () => {
    it('should support wrapperClassName', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form><CheckboxGroup name="comp" options={OPTIONS} wrapperClassName="wrapp" /></Form>,
      );

      const wrapper = ReactDOM.findDOMNode(instance).children[0];
      expect(wrapper).to.have.class('wrapp');
    });
  });

  describe('checkbox options', () => {
    it('should support array', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <CheckboxGroup
            name="comp"
            options={['foo', '10']}
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const labels = domElement.querySelectorAll('label');
      const inputs = domElement.querySelectorAll('input');

      expect(labels[0]).to.have.text('foo');
      expect(inputs[0]).to.have.attr('value', 'foo');

      expect(labels[1]).to.have.text('10');
      expect(inputs[1]).to.have.attr('value', '10');
    });

    it('should support array of entries', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <CheckboxGroup
            name="comp"
            options={[
              {label: 'Book', value: 'book'},
              {label: 'Chair', value: 'chair'},
            ]}
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const labels = domElement.querySelectorAll('label');
      const inputs = domElement.querySelectorAll('input');

      expect(labels[0]).to.have.text('Book');
      expect(inputs[0]).to.have.attr('value', 'book');

      expect(labels[1]).to.have.text('Chair');
      expect(inputs[1]).to.have.attr('value', 'chair');
    });

    it('should support plain object', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <CheckboxGroup
            name="comp"
            options={{
              book: 'Book',
              chair: 'Chair',
            }}
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const labels = domElement.querySelectorAll('label');
      const inputs = domElement.querySelectorAll('input');

      expect(labels[0]).to.have.text('Book');
      expect(inputs[0]).to.have.attr('value', 'book');

      expect(labels[1]).to.have.text('Chair');
      expect(inputs[1]).to.have.attr('value', 'chair');
    });
  });

  describe('onChange', () => {
    it('should support onChange', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <CheckboxGroup
            name="comp"
            onChange={spy}
            options={['foo', 'bar']}
          />
        </Form>,
      );

      const checkboxes = ReactDOM.findDOMNode(instance).querySelectorAll('input');

      checkboxes[1].checked = true;
      TestUtils.Simulate.change(checkboxes[1]);

      expect(spy).to.be.calledWith(['bar']);

      checkboxes[0].checked = true;
      TestUtils.Simulate.change(checkboxes[0]);

      expect(spy).to.be.calledWith(['foo', 'bar']);

      checkboxes[0].checked = false;
      TestUtils.Simulate.change(checkboxes[0]);

      expect(spy).to.be.calledWith(['bar']);
    });

    it('should prevent additional triggering', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <CheckboxGroup
            name="comp"
            onChange={spy}
            options={['foo', 'bar']}
          />
        </Form>,
      );

      const checkboxes = ReactDOM.findDOMNode(instance).querySelectorAll('input');

      checkboxes[0].checked = true;
      TestUtils.Simulate.change(checkboxes[0]);

      expect(spy).to.be.calledOnce();

      checkboxes[0].checked = true;
      TestUtils.Simulate.change(checkboxes[0]);

      expect(spy).to.be.calledOnce();

      expect(spy).to.be.calledOnce();
      expect(spy).to.be.calledWith(['foo']);
    });
  });
});
