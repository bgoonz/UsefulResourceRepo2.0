# Star Wars API Promises Project

In this project you will be using the [Star Wars API](https://swapi.dev/) to
fetch information about Star Wars characters and save it into a file.

You will use `node-fetch` and `fs` to accomplish this.

**First, setup your code directory with a package.json and install node-fetch.**

```shell
npm init -y
npm install node-fetch
```

**Now let's create a new `index.js` file in here and start coding!**

Look at the example on the SWAPI website. You can see it gives us a URL like this to grab info on a person (the number is the id of the person, `1` is Luke Skywalker. **Your code should work for any character id**).

`https://swapi.dev/api/people/1`

This API responds with JSON by default and these are all `GET` requests so we can use plain 'ol fetch with the defaults like this:

```js
fetch('https://swapi.dev/api/people/1');
```

As we know, fetch returns a promise, so next we would need to call `.then()` and then parse the `json` from the response.

```js
fetch('https://swapi.dev/api/people/1')
    .then(response => response.json())
```

Remember, this short arrow function syntax is the same as this:

```js
fetch('https://swapi.dev/api/people/1')
    .then((response) => {
        return response.json()
    })
```

But since we are only doing one thing, we can shorten it into one line.

The point here is `response.json()` returns another promise, so this means we can chain another `.then()` call and that should get the resolved information from the JSON promise. Which should be the object representing a character from Star Wars.

```js
    fetch('https://swapi.dev/api/people/1')
    .then((response) => {
        return response.json()
    })
    .then(personObject => {
        console.log(personOnject);
    });
```

If you console.log the person object you'll see it looks like this:

```js
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

You'll notice this has URLs in various places.  **See if you can make more fetch calls to get the homeworld of the character.**

After you are getting both the person and the homeworld, **try getting all of the films for the person**. You'll notice they are stored as an array of film URLs.  You _perhaps_ could use `Promise.all` to make a bunch of fetch calls for those URLs and then after they are finished you should have a complete list of the films as objects.

Once you've got your person, their homeworld and the list of films, we will use the `fs` module's `promises` version to write this info out to a file.

To use the promise version of `fs` you simple import it like this:

```js
const fs = require('fs').promises;
```

The documentation for the promises version of `fs` is [here](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_promises_api).

You see it contains almost identical versions of all the functions on `fs` but these versions return Promises instead of taking callback functions as arguments.

So to write a file it would look something like this:

```js
const fs = require('fs').promises;

fs.writeFile('filename.txt', fileContents, 'utf-8')
    .then(() => {
        console.log("The file is finished being written");
    }
    .catch(e => {
        console.error("Something went wrong when writing the file");
    }
```

You can chain `.then()` and `.catch()` methods after `writeFile` exactly like we did with `fetch`.

**See if you can write out the following sentence to a file:**

```text
My name is Luke Skywalker, I am from Tatooine
I starred in the following films: A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith
```

Once you've finished this, see if you can refactor your code into multiple helper functions that each do one thing per the Single Responsibility principle.

