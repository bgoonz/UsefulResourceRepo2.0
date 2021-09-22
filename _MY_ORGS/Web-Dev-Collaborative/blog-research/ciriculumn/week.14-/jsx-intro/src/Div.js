import Thread from './Thread';

const Div = (props) => {
  return (
    <div
      style={{
        border: '3px solid blue',
        color: props.color,
        backgroundColor: props.background
      }}
    >
      <h1>Div Component</h1>
      {props.name && <h2>{props.name.firstName}</h2>}
    </div>
  );
};

export default Div;
