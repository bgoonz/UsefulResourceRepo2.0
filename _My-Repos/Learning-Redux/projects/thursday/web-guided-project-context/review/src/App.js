import React, { useState, useReducer, createContext, useContext } from "react";
import { reducer, initialState, setName, setLocation } from "./reducer";
import data from "./data";

const PersonContext = createContext();

const App = () => {
  // const [state, setState] = useState({person:data});
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App component">
      <h1>Main App</h1>
      <PersonContext.Provider value={[state.person, dispatch]}>
        <SubComp1 />
      </PersonContext.Provider>
    </div>
  );
};

const SubComp1 = () => {
  const [person] = useContext(PersonContext);
  const { title, first, last } = person.name;

  return (
    <div className="component">
      <h2>Sub Comp 1</h2>
      <p>
        {title} {first} {last}
      </p>
      <SubComp2 />
    </div>
  );
};

const SubComp2 = () => {
  const [person, dispatch] = useContext(PersonContext);

  const handleClick = () => {
    dispatch(
      setLocation({
        street: "2222 N 22nd",
        city: "Philadelphia",
        state: "PA",
        postcode: 19133,
      })
    );
  };

  return (
    <div className="component">
      <h2>Sub Comp 2</h2>
      <button onClick={handleClick}>Change Address</button>
      <SubComp3 />
    </div>
  );
};

const SubComp3 = () => {
  const [person, dispatch] = useContext(PersonContext);

  const handleClick = () => {
    dispatch(setName({ title: "Mr", first: "Warren", last: "Longmire" }));
  };

  return (
    <div className="component">
      <h2>Sub Comp 3</h2>
      <button onClick={handleClick}>Change Name</button>
      <p>
        {person.location.street} {person.location.city}, {person.location.state}{" "}
        {person.location.postcode}
      </p>
    </div>
  );
};

export default App;
