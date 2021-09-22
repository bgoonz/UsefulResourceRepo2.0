import React, { Component } from 'react';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import { Section, Button } from 'react-bulma-components/full';
export default class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: this.props.text || '',
    };
  }
  handleSubmit = e => {
    if (e.which === 13) {
      this.props.onSave(this.state.todo);
      if (this.props.newTodo) {
        this.setState({ todo: '' });
      }
    }
  };
  handleChange = e => {
    this.setState({ todo: e.target.value });
  };
  handleButtonTapped = e => {
    if (this.props.newTodo) {
      this.props.onSave(this.state.todo);
    }
  };

  render() {
    return (
      <div>
        <Field>
          <Control>
            <Input
              type="text"
              name="task"
              placeholder={this.props.placeholder}
              value={this.state.todo}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}
            />
          </Control>
        </Field>
      </div>
    );
  }
}
