import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const isOperator = /[x/+‑]/;
const endsWithOperator = /[x+‑/]$/;

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: "0",
      prevVal: "0",
      tmpVal: "0",
      formula: "0",
      tmpOper: "",
      evaluated: false,
    };

    this.handleClear = this.handleClear.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClear() {
    this.setState({
      currentVal: "0",
      prevVal: "0",
      formula: "",
    });
  }

  handleNumbers(e) {
    if (this.state.currentVal.length >= 20) {
      if (this.state.currentVal === "Max Input Limit") {
        this.setState({
          tmpVal: this.state.tmpVal,
        });
      } else {
        this.setState({
          tmpVal: this.state.currentVal,
          currentVal: "Max Input Limit",
        });
      }
      setTimeout(
        () =>
          this.setState({
            currentVal: this.state.tmpVal,
          }),
        1000
      );
    } else if (this.state.evaluated === true) {
      this.setState({
        currentVal: e.target.value,
        formula: e.target.value,
        evaluated: false,
      });
    } else if (isOperator.test(this.state.currentVal) === true) {
      this.setState({
        tmpOper: this.state.currentVal,
        currentVal: e.target.value,
      });
      if (e.target.value == "0" && this.state.tmpOper === "/") {
        this.setState({
          formula: this.state.formula,
        });
      } else {
        this.setState({ formula: this.state.formula + e.target.value });
      }
    } else if (this.state.currentVal == "0") {
      this.setState({
        currentVal: e.target.value,
        formula: this.state.formula.slice(0, -1) + e.target.value,
      });
    } else {
      this.setState({
        currentVal: this.state.currentVal + e.target.value,
        formula: this.state.formula + e.target.value,
      });
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false,
      });
    } else if (this.state.currentVal.includes(".")) {
      this.setState({
        currentVal: this.state.currentVal,
        formula: this.state.formula,
      });
    } else if (isOperator.test(this.state.currentVal) === true) {
      this.setState({
        currentVal: "0.",
        formula: this.state.formula + "0.",
      });
    } else if (this.state.currentVal == "0") {
      this.setState({
        currentVal: "0.",
        formula: this.state.formula.slice(0, -1) + "0.",
      });
    } else {
      this.setState({
        currentVal: this.state.currentVal + ".",
        formula: this.state.formula + ".",
      });
    }
  }

  handleOperators(e) {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: e.target.value,
        formula: this.state.prevVal + e.target.value,
        evaluated: false,
      });
    } else if (isOperator.test(this.state.currentVal) === true) {
      this.setState({
        currentVal: e.target.value,
        formula: this.state.formula.slice(0, -1) + e.target.value,
      });
    } else {
      this.setState({
        currentVal: e.target.value,
        formula: this.state.formula + e.target.value,
      });
    }
  }

  handleEvaluate() {
    let expression = this.state.formula;
    if (endsWithOperator.test(expression) === true) {
      expression = expression.slice(0, -1);
    }
    expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
    let answer = Math.round(100000 * eval(expression)) / 100000;
    this.setState({
      currentVal: answer.toString(),
      formula: expression.replace(/\*/g, "x").replace(/-/g, "-") + "=" + answer,
      prevVal: answer,
      evaluated: true,
    });
  }

  handleDelete() {
    if (this.state.currentVal.length > 0) {
      this.setState({
        currentVal: this.state.currentVal.slice(0, -1),
      });
      if (this.state.evaluated !== true) {
        this.setState({
          formula: this.state.formula.slice(0, -1),
        });
      } else {
        this.setState({ formula: this.state.formula });
      }
    }
  }

  render() {
    return (
      <div id="calculator-body" className="frame">
        <div id="body-top" className="frame">
          <div id="display1" className="screen">
            <div id="equation-display" className="sub-screen"></div>
            <div id="display" className="sub-screen">
              {this.state.currentVal}
            </div>
          </div>
        </div>
        <div id="body-bottom" className="frame">
          <div id="number-pad" className="keys">
            <button
              onClick={this.handleNumbers}
              id="seven"
              className="std-button numbers"
              value="7"
            >
              7
            </button>
            <button
              onClick={this.handleNumbers}
              id="eight"
              className="std-button numbers"
              value="8"
            >
              8
            </button>
            <button
              onClick={this.handleNumbers}
              id="nine"
              className="std-button numbers"
              value="9"
            >
              9
            </button>
            <button
              onClick={this.handleNumbers}
              id="four"
              className="std-button numbers"
              value="4"
            >
              4
            </button>
            <button
              onClick={this.handleNumbers}
              id="five"
              className="std-button numbers"
              value="5"
            >
              5
            </button>
            <button
              onClick={this.handleNumbers}
              id="six"
              className="std-button"
              value="6"
            >
              6
            </button>
            <button
              onClick={this.handleNumbers}
              id="one"
              className="std-button"
              value="1"
            >
              1
            </button>
            <button
              onClick={this.handleNumbers}
              id="two"
              className="std-button"
              value="2"
            >
              2
            </button>
            <button
              onClick={this.handleNumbers}
              id="three"
              className="std-button"
              value="3"
            >
              3
            </button>
            <button
              onClick={this.handleNumbers}
              id="zero"
              className="std-button"
              value="0"
            >
              0
            </button>
            <button
              onClick={this.handleDecimal}
              id="decimal"
              className="std-button"
              value="."
            >
              .
            </button>
            <button
              onClick={this.handleOperators}
              id="add"
              className="std-button"
              value="+"
            >
              +
            </button>
            <button
              onClick={this.handleOperators}
              id="subtract"
              className="std-button"
              value="-"
            >
              -
            </button>
            <button
              onClick={this.handleOperators}
              id="multiply"
              className="std-button"
              value="x"
            >
              x
            </button>
            <button
              onClick={this.handleOperators}
              id="divide"
              className="std-button"
              value="/"
            >
              /
            </button>
          </div>
          <div id="execute-pad" className="keys">
            <button
              onClick={this.handleClear}
              id="clear"
              className="exc-button"
              value="AC"
            >
              AC
            </button>
            <button
              onClick={this.handleDelete}
              id="delete"
              className="exc-button"
              value="Del"
            >
              Del
            </button>
            <button
              onClick={this.handleEvaluate}
              id="equals"
              className="exc-std-button"
              value="="
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Simple Calculator</h1>
        <hr />
        <Calculator />
        <div id="footer">
          made by
          <a href="https://github.com/willjw3" target="_blank">
            willjw3
          </a>
        </div>
      </div>
    );
  }
}

export default App;
