import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../../src';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';

export default ({Component}) => {
  describe('select options', () => {
    it('should support array', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <Component
            name="comp"
            options={['foo', '10']}
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const options = domElement.querySelectorAll('option');

      expect(options[0]).to.have.text('foo');
      expect(options[0]).to.have.attr('value', 'foo');

      expect(options[1]).to.have.text('10');
      expect(options[1]).to.have.attr('value', '10');
    });

    it('should support array of entries', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <Component
            name="comp"
            options={[
              {label: 'Book', value: 'book'},
              {label: 'Chair', value: 'chair'},
            ]}
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const options = domElement.querySelectorAll('option');

      expect(options[0]).to.have.text('Book');
      expect(options[0]).to.have.attr('value', 'book');

      expect(options[1]).to.have.text('Chair');
      expect(options[1]).to.have.attr('value', 'chair');
    });

    it('should support plain object', () => {
      const instance = TestUtils.renderIntoDocument(
        <Form>
          <Component
            name="comp"
            options={{
              book: 'Book',
              chair: 'Chair',
            }}
          />
        </Form>,
      );

      const domElement = ReactDOM.findDOMNode(instance);
      const options = domElement.querySelectorAll('option');

      expect(options[0]).to.have.text('Book');
      expect(options[0]).to.have.attr('value', 'book');

      expect(options[1]).to.have.text('Chair');
      expect(options[1]).to.have.attr('value', 'chair');
    });
  });
};
