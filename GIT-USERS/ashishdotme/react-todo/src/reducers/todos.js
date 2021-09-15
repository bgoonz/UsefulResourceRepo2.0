import { ADD_TODO, COMPLETE_TODO } from '../constants/ActionTypes';

const initialState = [
  {
    id: 0,
    text: 'Wash Jeans',
    completed: false,
  },
];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
      ];
    case COMPLETE_TODO:
      debugger;
      let filtertodo = state.filter(todo => todo.id !== action.id);
      return filtertodo;
    default:
      return state;
  }
};

export default todos;
