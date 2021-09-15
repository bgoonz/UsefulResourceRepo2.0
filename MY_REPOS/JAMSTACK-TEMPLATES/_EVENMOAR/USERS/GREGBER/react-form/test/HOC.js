import React, {PropTypes} from 'react';
import {HOC} from '../src';
import setup from './utils/setup';
import ReactDOM from 'react-dom';
import {Form} from '../src';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import {expect} from 'chai';

describe('HOC', () => {
  setup();

  it('should be possible to wrap a component', () => {
    const BaseComponent = HOC(React.createClass({
      displayName: 'BaseComponent',

      propTypes: {
        name: PropTypes.string.isRequired,
        getValue: PropTypes.func.isRequired,
        setValue: PropTypes.func.isRequired,
      },

      handleChange(domEvent) {
        this.props.setValue(domEvent.target.value);
      },

      render() {
        return (
          <input
            type="text"
            name={this.props.name}
            onChange={this.handleChange}
            value={this.props.getValue()}
          />
        );
      },
    }));

    const submitSpy = sinon.spy();
    const instance = TestUtils.renderIntoDocument(
      <Form onValidSubmit={submitSpy}>
        <BaseComponent name="test" value="" />
        <button type="submit">Submit</button>
      </Form>,
    );
    const form = ReactDOM.findDOMNode(instance);
    const input = form.querySelector('input');
    const button = form.querySelector('button');

    input.value = 'test';
    TestUtils.Simulate.change(input);
    TestUtils.Simulate.submit(form);

    expect(submitSpy).to.be.calledWith({test: 'test'});
  });
});
