export default function Composition(props) {
  return (
    <div style={{ border: '4px solid black', backgroundColor: 'white' }}>
      {props.children}
    </div>
  );
}
