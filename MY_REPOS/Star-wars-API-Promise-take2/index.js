const fetch = require("node-fetch");
const fs = require("fs").promises;

const fetchLuke = fetch("https://swapi.dev/api/people/1");
const fetchFilms = fetch("https://swapi.dev/api/people/1");
const fetchLukeHome = fetch("http://swapi.dev/api/planets/1/");

const parseFilms = (array) => {
  return array.map((ele) => {
    return fetch(ele)
      .then((response) => response.json())
      .then((filmObj) => filmObj.title);
  });
};

const fetchedLuke = fetchLuke
  .then((lukeResponse) => lukeResponse.json())
  .then((lukeObj) => lukeObj.name)
  .catch((err) => console.error(err));

const fetchedHome = fetchLukeHome
  .then((homeResponse) => homeResponse.json())
  .then((homeObj) => homeObj.name)
  .catch((err) => console.error(err));

const fetchedFilmNames = fetchFilms
  .then((startResponse) => startResponse.json())
  .then((startObj) => startObj.films)
  .then((films) => {
    return Promise.all(parseFilms(films));
  })
  .then((processFilms) => processFilms)
  .catch((err) => console.error(err));

const getInfo = Promise.all([fetchedLuke, fetchedHome, fetchedFilmNames])
  .then((array) =>
    fs.writeFile(
      "./testFile.txt",
      `My name is ${array[0]}.\nI am from ${array[1]}. \nI starred in the following films: \n\t||-${array[2][0]}. \n\t||-${array[2][1]}. \n\t||-${array[2][2]}. \n\t||-${array[2][3]}.`,
      "utf-8"
    )
  )
  .catch((err) => console.error(err));

/* My name is Luke Skywalker, I am from Tatooine
I starred in the following films: A New Hope,
The Empire Strikes Back, Return of the Jedi,
Revenge of the Sith */
