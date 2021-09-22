import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bulma-components/lib/components/card';
import { Field, Control, Checkbox } from 'react-bulma-components/lib/components/form';
const Todolist = ({ todos, actions }) => (
  <ul>
    {todos.map(todo => (
      <Card key={todo.id}>
        <Card.Content>
          <Field kind="group">
            <Control>
              <Checkbox checked={todo.completed} onChange={() => actions.completeTodo(todo.id)}>
                <span className="todo-title">{todo.text}</span>
              </Checkbox>
            </Control>
          </Field>
        </Card.Content>
      </Card>
    ))}
  </ul>
);

export default Todolist;
