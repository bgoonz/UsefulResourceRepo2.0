##   <===================== (1-input) =======================>
```js
const fetch = require("node-fetch");
console.log(fetch);
fetch("https://swapi.dev/api/people/1")
  .then((res) => {
    return res.json();
  })
  .then((person) => {
    console.log(person);
  });

```
##   <===================== (1-output) =======================>
```
[Function: fetch] {
  isRedirect: [Function],
  Promise: [Function: Promise],
  default: [Circular],
  Headers: [class Headers],
  Request: [class Request],
  Response: [class Response],
  FetchError: [Function: FetchError]
}
{
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'http://swapi.dev/api/planets/1/',
  films: [
    'http://swapi.dev/api/films/1/',
    'http://swapi.dev/api/films/2/',
    'http://swapi.dev/api/films/3/',
    'http://swapi.dev/api/films/6/'
  ],
  species: [],
  vehicles: [
    'http://swapi.dev/api/vehicles/14/',
    'http://swapi.dev/api/vehicles/30/'
  ],
  starships: [
    'http://swapi.dev/api/starships/12/',
    'http://swapi.dev/api/starships/22/'
  ],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'http://swapi.dev/api/people/1/'
}
```
##   <===================== (2-input) =======================>






##   <===================== (2-output) ======================>





##   <===================== (3-input) =======================>






##   <===================== (3-output) ======================>


##   <===================== (4-input) =======================>






##   <===================== (4-output) ======================>



##   <===================== (5-input) =======================>






##   <===================== (5-output) ======================>



##   <===================== (6-input) =======================>






##   <===================== (6-output) ======================>



##   <===================== (7-input) =======================>






##   <===================== (7-output) ======================>
