import React from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { TodoResponse } from '@ashishdotme/sdk/todo';
import { useTodos } from '../../hooks/useTodos';

interface Props {
    todo: TodoResponse;
}

const TodoItem: React.FC<Props> = (props) => {
    const { mutateTodos } = useTodos();
    const formatTag = (completedDate: string) => {
        return (
            <span className="tag is-link is-light">
                {DateTime.fromJSDate(new Date(completedDate!)).toLocaleString(
                    DateTime.DATE_MED,
                )}
            </span>
        );
    };
    return (
        <div>
            <label className="checkbox mr-3">
                <input
                    type="checkbox"
                    checked={props.todo.completed}
                    onChange={async () => {
                        if (!props.todo.completed) {
                            await axios.post(
                                `https://api.prod.ashish.me/todos/completed/${props.todo.todoId}`,
                            );
                            mutateTodos();
                        }
                    }}
                />
            </label>
            {_.capitalize(_.trim(props.todo.content))}{' '}
            {props.todo.completed ? formatTag(props.todo.completedDate!) : ''}
        </div>
    );
};

export default TodoItem;
