import React from "react";

const TodosContext = React.createContext({
  currentTodo: {},
  todos: [
    { id: 1, text: "Eat breakfast", complete: false },
    { id: 2, text: "Drink tea", complete: true },
    { id: 3, text: "Sleep", complete: false },
  ],
});

export default TodosContext;
