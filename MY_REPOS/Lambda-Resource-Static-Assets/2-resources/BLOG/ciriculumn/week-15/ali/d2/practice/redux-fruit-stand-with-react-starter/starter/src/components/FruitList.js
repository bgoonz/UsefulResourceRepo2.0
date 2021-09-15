import React from 'react';

class FruitList extends React.Component {
  componentDidMount() {
    // TODO Subscribe to the store to listen for state updates.
  }

  componentWillUnmount() {
    // TODO Unsubscribe the listener from the store.
  }

  render() {
    // TODO Get the fruit state from the store.
    const fruit = [];

    return (
      <div>
        {fruit.length > 0
          ? <ul>{fruit.map((fruitName, index) => <li key={index}>{fruitName}</li>)}</ul>
          : <span>No fruit currently in stock!</span>
        }
      </div>
    );
  }
}

export default FruitList;
