export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      return {
        ...state,
        todos: toggledTodos,
      };
    case "DELETE_TODO":
      if (action.payload && action.payload.id) {
        const filteredTodos = state.todos.filter(
          (t) => t.id !== action.payload.id
        );
        const isCurrentTodoDeleted =
          action.payload.id === state.currentTodo.id ? {} : state.currentTodo;
        return {
          ...state,
          currentTodo: isCurrentTodoDeleted,
          todos: filteredTodos,
        };
      } else {
        return state;
      }
    case "CHANGE_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload,
      };
    case "UPDATE_TODO":
      const updatedTodo = action.payload;
      const updatedTodoIndex = state.todos.findIndex(
        (t) => t.id === state.currentTodo.id
      );
      return {
        ...state,
        currentTodo: {},
        todos: [
          ...state.todos.slice(0, updatedTodoIndex),
          updatedTodo,
          ...state.todos.slice(updatedTodoIndex + 1),
        ],
      };
    case "ADD_TODO":
      const newTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: newTodos,
      };

    default:
      return state;
  }
}
