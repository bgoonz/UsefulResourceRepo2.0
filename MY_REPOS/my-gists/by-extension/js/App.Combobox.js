import React, { useState, useEffect } from "react";
import "./packages/combobox/styles.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopup
} from "./packages/combobox/index";

function ServerCitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const cities = useCitySearch(searchTerm);
  const handleSearchTermChange = event => setSearchTerm(event.target.value);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2 id="description">Server City Search</h2>
      <Combobox>
        <ComboboxInput
          onChange={handleSearchTermChange}
          aria-labelledby="description"
        />
        <ComboboxPopup>
          <RandomFocasableJunk cities={cities} />
          <ComboboxList aria-labelledby="description">
            {cities.map(city => {
              let str = `${city.city}, ${city.state}`;
              return <ComboboxOption key={str} value={str} />;
            })}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}

function useCitySearch(searchTerm) {
  const [cities, setCities] = useState([]);

  useEffect(
    () => {
      if (searchTerm.trim() !== "") {
        let current = true;
        fetchCities(searchTerm).then(cities => {
          if (current) {
            setCities(cities);
          }
        });
        return () => (current = false);
      }
    },
    [searchTerm]
  );

  return cities;
}

function RandomFocasableJunk({ cities }) {
  return (
    <p
      style={{
        textAlign: "center",
        padding: "5px",
        margin: "0",
        color: "#888",
        fontStyle: "italic"
      }}
    >
      {cities.length} results <a href="https://google.com">Google</a>{" "}
      <button>Dangit</button>
    </p>
  );
}

async function fetchCities(value) {
  try {
    let res = await fetch(`http://localhost:5000/?${value}`);
    return await res.json();
  } catch (e) {
    throw e;
  }
}

export default ServerCitySearch;