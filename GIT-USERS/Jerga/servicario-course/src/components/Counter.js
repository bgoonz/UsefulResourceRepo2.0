import React, { useState, useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const Counter = (props) => {
  const [count, setCount] = useState(0);
  const { title, onChange } = props;

  const prevCount = usePrevious(count);
  const prevTestCount = usePrevious(props.testNumber);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange("increment", newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onChange("decrement", newCount);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={increment}>Increment</button>
      <div className="counter"> Current: {count} </div>
      <div className="counter"> Previous: {prevCount} </div>
      <h2>Current Test: {props.testNumber}</h2>
      <h2>Previous Test: {prevTestCount}</h2>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// class Counter extends React.Component {

//   state = {
//     count: 0
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log(prevState)
//     // console.log(prevProps)
//   }

//   increment = () => {
//     const { count } = this.state
//     const { onChange } = this.props
//     this.setState({count: count + 1})
//     onChange('increment', count + 1)
//   }

//   decrement = () => {
//     const { count } = this.state
//     const { onChange } = this.props
//     this.setState({count: count - 1})
//     onChange('decrement', count - 1)
//   }

//   render() {
//     const { count } = this.state
//     const { title } = this.props
//     return (
//       <div>
//         <h1>{title}</h1>
//         <button onClick={this.increment}>Increment</button>
//           <div className="counter"> {count} </div>
//         <button onClick={this.decrement}>Decrement</button>
//       </div>
//     )
//   }
// }

export default Counter;
