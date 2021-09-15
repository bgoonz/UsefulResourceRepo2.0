import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { TodoResponse } from '@ashishdotme/sdk/todo';
import TodosContext from '../../common/todosContext';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';

interface Props {
    currentPage: number;
    setCurrentPage: (pageNumber: number) => void;
}

const List: React.FC<Props> = (props: Props) => {
    const handlePageClick = (page: any) => {
        props.setCurrentPage(page.selected);
    };
    const { currentMenu } = useContext(TodosContext);
    let { todos } = useTodos();
    todos =
        currentMenu === 'INCOMPLETE'
            ? todos?.filter((todo) => !todo.completed)
            : todos
                  ?.filter((todo) => todo.completed)
                  .sort(
                      (a, b) =>
                          new Date(b.completedDate!).valueOf() -
                          new Date(a.completedDate!).valueOf(),
                  );
    const PER_PAGE = 10;
    const offset = props.currentPage * PER_PAGE;
    const completedTodosElements = (todos || [])
        .slice(offset, offset + PER_PAGE)
        .map((todo: TodoResponse, i: number) => (
            <label className="panel-block">
                <TodoItem key={i} todo={todo} />
            </label>
        ));
    const incompleteTodosElements = (todos || []).map(
        (todo: TodoResponse, i: number) => (
            <label className="panel-block">
                <TodoItem key={i} todo={todo} />
            </label>
        ),
    );
    const pageCount = Math.ceil((todos || []).length / PER_PAGE);
    return (
        <div className="container list-container">
            <div className="panel is-primary">
                <ul>
                    {currentMenu === 'COMPLETED'
                        ? completedTodosElements
                        : incompleteTodosElements}
                </ul>
            </div>
            {todos && todos.length > 10 && currentMenu === 'COMPLETED' && (
                <ReactPaginate
                    previousLabel={'← Previous'}
                    nextLabel={'Next →'}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    pageClassName={'pagination-link'}
                    pageLinkClassName={'has-text-black'}
                    containerClassName={'pagination is-centered'}
                    previousLinkClassName={'pagination-previous'}
                    nextLinkClassName={'pagination-next'}
                    disabledClassName={'is-disabled'}
                    activeClassName={'is-current'}
                    activeLinkClassName={'has-text-light'}
                />
            )}
        </div>
    );
};

export default List;
