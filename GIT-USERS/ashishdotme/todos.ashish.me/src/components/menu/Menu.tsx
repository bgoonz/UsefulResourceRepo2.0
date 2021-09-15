import React, { useContext } from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodosContext from '../../common/todosContext';
import MenuItem from './MenuItem';

interface Props {
    setCurrentPage: (pageNumber: number) => void;
}

const Menu: React.FC<Props> = (props: Props) => {
    const { currentMenu, dispatch } = useContext(TodosContext);
    let { todos } = useTodos();
    const incompleteTodos = todos?.filter((todo) => !todo.completed);
    const completedTodos = todos?.filter((todo) => todo.completed);
    return (
        <div className="tabs is-fullwidth has-text-weight-bold">
            <ul>
                <MenuItem
                    text="Incomplete"
                    count={(incompleteTodos || []).length}
                    className={currentMenu === 'INCOMPLETE' ? 'is-active' : ''}
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_CURRENT_MENU',
                            payload: 'INCOMPLETE',
                        });
                        props.setCurrentPage(0);
                    }}
                />

                <MenuItem
                    text="Completed"
                    count={(completedTodos || []).length}
                    className={currentMenu === 'COMPLETED' ? 'is-active' : ''}
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_CURRENT_MENU',
                            payload: 'COMPLETED',
                        });
                        props.setCurrentPage(0);
                    }}
                />
            </ul>
        </div>
    );
};

export default Menu;
