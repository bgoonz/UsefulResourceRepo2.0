import React, { useState, useEffect } from 'react';

function AutoComplete(props) {
  const [inputVal, setInputVal] = useState('');
  const [matches, setMatches] = useState([]);
  const names = props.names;

  useEffect(() => {
    if (inputVal.length) {
      const matchingNames = names.filter(name => {
        return name.toLowerCase().startsWith(inputVal.toLowerCase());
      });
      setMatches(matchingNames);
    } else {
      setMatches([...names]);
    }
  }, [inputVal]);

  const results = matches.map((result, i) => {
    return <li key={i}>{result}</li>
  });

  return (
    <div>
      <h1>Autocomplete</h1>
      <div className="auto">
        <input
          onChange={e => setInputVal(e.target.value)}
          value={inputVal}
          placeholder="Search..."
        />
        <ul onClick={e => setInputVal(e.target.innerText)}>
          {results}
        </ul>
      </div>
    </div>
  );
}

export default AutoComplete;
