import React, { Dispatch } from 'react';
import { Actions } from './todosReducer';

interface IContextProps {
    currentMenu: string;
    dispatch: Dispatch<Actions>;
}

const TodosContext = React.createContext({
    currentMenu: 'INCOMPLETE',
} as IContextProps);

export default TodosContext;
