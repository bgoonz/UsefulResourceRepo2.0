function PeopleList(props) {
  return (
    <ul>
      {props.people.map(person => (
        <li>{person.lastName}, {person.firstName}</li>
      ))}
    </ul>
  );
}

const peopleListElement = document.querySelector('#people-list');
fetch('https://example.com/api/people')
  .then(response => response.json())
  .then(people => {
    const props = { people };
    ReactDOM.render(<PeopleList props={props}/>, peopleListElement);
  });