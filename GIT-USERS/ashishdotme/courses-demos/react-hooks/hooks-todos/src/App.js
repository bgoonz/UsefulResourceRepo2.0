import React, { useContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import TodosList from "./components/todosList";
import TodoForm from "./components/todoForm";
import todosReducer from "./reducer";
import TodosContext from "./context";

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI("https://hooks-api-lemon.vercel.app/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos,
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodosList />
    </TodosContext.Provider>
  );
}

export default App;
