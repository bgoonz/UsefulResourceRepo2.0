import React from "react";
import * as Redux from "react-redux";

import TodoHeader from "TodoHeader";
import TodoList from "TodoList";
import AddTodo from "AddTodo";
import TodoSearch from "TodoSearch";
var TodoAPI = require("TodoAPI");
import * as actions from "actions";

export var TodoApp = React.createClass({
  onLogout(e) {
    var { dispatch } = this.props;
    e.preventDefault();
    dispatch(actions.cleanTodos());
    dispatch(actions.startLogout());
  },

  render() {
    return (
      <div>
        <TodoHeader />
        <div className="contain-to-grid sticky">
          <nav
            className="top-bar"
            data-topbar
            role="navigation"
            data-options="sticky_on: large"
          >
            ...
          </nav>
        </div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>
            Logout
          </a>
        </div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch />
              <TodoList />
              <AddTodo />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Redux.connect()(TodoApp);
