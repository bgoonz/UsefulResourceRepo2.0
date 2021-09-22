import React, { useReducer } from "react";
import reducer, { initialState } from "./reducers/index";
import "./App.css";
import {
  ADD_ONE,
  applyNumber,
  changeOperator,
  clearDisplay,
} from "./actions/index";
import TotalDisplay from "./components/TotalDisplay";
import CalcButton from "./components/CalcButton";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const eventHandler = e => {
  //   e.preventDefault();
  //   dispatch({type: ADD_ONE});
  // }

  const betterHandler = (num) => {
    dispatch(applyNumber(num));
  };

  const operatorHandler = (operator) => {
    dispatch(changeOperator(operator));
  };

  const clearHandler = () => {
    dispatch(clearDisplay());
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img width="40px" src="./Lambda-Logo-Red.png" /> Lambda Reducer
          Challenge
        </a>
      </nav>

      <div className="container row mt-5">
        <div className="col-md-12 d-flex justify-content-center">
          <form name="Cal">
            <TotalDisplay value={state.total} />
            <div className="row details">
              <span id="operation">
                <b>Operation:</b> {state.operation}
              </span>
              <span id="memory">
                <b>Memory:</b> {state.memory}
              </span>
            </div>

            <div className="row">
              <CalcButton value={"M+"} />
              <CalcButton value={"MR"} />
              <CalcButton value={"MC"} />
            </div>

            <div className="row">
              <CalcButton
                onClick={() => {
                  betterHandler(1);
                }}
                value={1}
              />
              <CalcButton
                onClick={() => {
                  betterHandler(2);
                }}
                value={2}
              />
              <CalcButton
                onClick={() => {
                  betterHandler(3);
                }}
                value={3}
              />
            </div>

            <div className="row">
              <CalcButton
                onClick={() => {
                  betterHandler(4);
                }}
                value={4}
              />
              <CalcButton
                onClick={() => {
                  betterHandler(5);
                }}
                value={5}
              />
              <CalcButton
                onClick={() => {
                  betterHandler(6);
                }}
                value={6}
              />
            </div>

            <div className="row">
              <CalcButton
                onClick={() => {
                  betterHandler(7);
                }}
                value={7}
              />
              <CalcButton
                onClick={() => {
                  betterHandler(8);
                }}
                value={8}
              />
              <CalcButton
                onClick={() => {
                  betterHandler(9);
                }}
                value={9}
              />
            </div>

            <div className="row">
              <CalcButton
                onClick={() => {
                  operatorHandler("+");
                }}
                value={"+"}
              />
              <CalcButton
                onClick={() => {
                  operatorHandler("*");
                }}
                value={"*"}
              />
              <CalcButton
                onClick={() => {
                  operatorHandler("-");
                }}
                value={"-"}
              />
            </div>

            <div className="row ce_button">
              <CalcButton
                onClick={() => {
                  clearHandler();
                }}
                value={"CE"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
