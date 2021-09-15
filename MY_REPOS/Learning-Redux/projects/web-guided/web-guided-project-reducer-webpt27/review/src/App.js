import React, { useState, useReducer } from "react";
import calcReducer from "./reducers/calcReducer";
import "./styles.css";

export default function App() {
  // const [total, setTotal] = useState(0);
  // const [memory]
  const [calcState, dispatch] = useReducer(calcReducer, {
    currentValue: 0,
    memory: 0,
  });

  const handleAddFive = (e) => {
    e.preventDefault();
    // setTotal(total + 5);
    dispatch({ type: "ADD", payload: 5 });
  };

  const handleSubtractOne = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBTRACT", payload: 1 });
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR" });
  };

  // clear
  // set memory
  // subtract
  // multiply

  return (
    <div className="App">
      <textarea
        rows="1"
        value={calcState.currentValue}
        id="total"
        type="text"
        name="ans"
      ></textarea>
      <br />
      <button type="button" className="btn" onClick={handleAddFive}>
        +5
      </button>
      <button type="button" className="btn" onClick={handleSubtractOne}>
        -1
      </button>
      <button type="button" className="btn" onClick={handleClear}>
        CLR
      </button>
    </div>
  );
}
