import React from 'react';
import PropTypes from 'prop-types';
import TodoInput from './TodoInput';

const Header = ({ addTodo }) => (
  <div>
    <TodoInput
      newTodo={true}
      onSave={text => {
        if (text.length !== 0) {
          addTodo(text);
        }
      }}
      placeholder="Enter a task"
    />
  </div>
);

export default Header;
