import ListItem from './ListItem';

const List = (props) => {
  return (
    <div
      style={{
        border: '1px solid red',
        marginBottom: '10px',
        backgroundColor: 'yellow'
      }}
    >
      <h1>List Component</h1>
      <ul>
        {props.fruits.map((fruit) => (
          <ListItem key={fruit} fruit={fruit} />
        ))}
      </ul>
    </div>
  );
};
export default List;
