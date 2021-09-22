import React, { FormEvent, useContext, useReducer, useState } from 'react';
import axios from 'axios';
import Menu from '../components/menu/Menu';
import Form from '../components/form/Form';
import List from '../components/list/List';
import todosReducer from '../common/todosReducer';
import TodosContext from '../common/todosContext';
import { useTodos } from '../hooks/useTodos';
import '../styles/home.scss';

const Home: React.FC = () => {
    const { mutateTodos } = useTodos();
    const [currentPage, setCurrentPage] = useState(0);
    const initialState = useContext(TodosContext);
    const [state, dispatch] = useReducer(todosReducer, initialState);
    return (
        <TodosContext.Provider value={{ ...state, dispatch }}>
            <div className="todo-container">
                <Form
                    addTodo={async (
                        event: FormEvent<HTMLFormElement>,
                        inputValue: string,
                    ) => {
                        event.preventDefault();
                        if (inputValue !== '') {
                            await axios.post(
                                'https://api.prod.ashish.me/todos',
                                {
                                    content: inputValue,
                                },
                            );
                            mutateTodos();
                        }
                    }}
                />
                <div className="box">
                    <Menu
                        setCurrentPage={(pageNumber: number) =>
                            setCurrentPage(pageNumber)
                        }
                    />
                    <List
                        currentPage={currentPage}
                        setCurrentPage={(pageNumber: number) =>
                            setCurrentPage(pageNumber)
                        }
                    />
                </div>
            </div>
        </TodosContext.Provider>
    );
};

export default Home;
