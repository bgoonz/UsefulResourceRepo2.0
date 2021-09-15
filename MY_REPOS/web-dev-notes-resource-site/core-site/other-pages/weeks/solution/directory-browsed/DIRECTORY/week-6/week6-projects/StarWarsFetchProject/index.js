const fs = require('fs').promises;
const fetch = require('node-fetch');

// The baseURL for the Star Wars API
const baseURL = 'https://swapi.dev/api/people/';

// helper function which fetches and parses JSON in one go, and
// also handles any errors from fetch.
const getUrl = (url) => {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error(`Couldn't fetch ${url}, got a ${response.status}`);
            }
        })
        .catch(e => {
            throw e;
        });
}

// Gets a person from the API, returns a promise
// which resolves to a person object
const getPerson = (id) => {
    const personUrl = `${baseURL}${id}`;
    return getUrl(personUrl);
};

// Gets the homeworld for a person, returns a promise
// which resolves to a homeworld object
const getHomeworld = (person) => {
    return getUrl(person.homeworld);
}

// gets the films, returns a promise which resolves to a list of film objects
const getFilms = (filmUrls) => {
    return Promise.all(filmUrls.map(url => getFilm(url)));
}

// Get a single film based on it's URL
const getFilm = (filmURL) => {
    return getUrl(filmURL);
}

// Write the info to a file based on the person's name
const writePersonToFile = (person, homeworld, films) => {
    const filmTitles = films.map(film => film.title);
    let fileContents = `My name is ${person.name}, I am from ${homeworld.name}\n`;
    fileContents += `I starred in the following films: ${filmTitles.join(', ')}`;
    return fs.writeFile(`${person.name}.txt`, fileContents, 'utf-8');
}

// Read a file based on a person's name
const readPersonFromFile = (person) => {
    return fs.readFile(`${person.name}.txt`, "utf-8");
}


let currentPerson;
let currentHomeworld;
let currentFilms;
// Get a person by id
getPerson(1)
    // Then get their homeworld
    .then(person => {
        currentPerson = person;
        return getHomeworld(person);
    })
    // Then get thier list of films
    .then(homeworld => {
        currentHomeworld = homeworld
        return getFilms(currentPerson.films);
    })
    // Then write the info to the file
    .then(films => {
        currentFilms = films;
        return writePersonToFile(currentPerson, currentHomeworld, currentFilms);
    })
    // Then read it back from the file
    .then(() => {
        return readPersonFromFile(currentPerson);
    })
    // Then log what we read to the screen
    .then(person => {
        console.log(person);
    })
    // Catch any errors and log the message from them. Try id = 99
    .catch(e => {
        console.log(e.message);
    });

