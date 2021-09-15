import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { uuid } from "uuidv4";
import TodosContext from "../context";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const {
    state: { todos = [], currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTodo("");
    if (currentTodo.text) {
      const response = await axios.patch(
        `https://hooks-api-lemon.vercel.app/todos/${currentTodo.id}`,
        {
          text: todo,
        }
      );
      dispatch({
        type: "UPDATE_TODO",
        payload: response.data,
      });
    } else {
      const response = await axios.post(
        "https://hooks-api-lemon.vercel.app/todos",
        {
          id: uuid(),
          text: todo,
          complete: false,
        }
      );
      dispatch({
        type: "ADD_TODO",
        payload: response.data,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
    </form>
  );
};

export default TodoForm;
