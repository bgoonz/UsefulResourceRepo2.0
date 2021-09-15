The Node.js fs module
The fs module of Node.js provides useful functions to interact with the file system

The fs module provides a lot of very useful functionality to access and interact with the file system.

There is no need to install it. Being part of the Node.js core, it can be used by simply requiring it:

Once you do so, you have access to all its methods, which include:

* fs.access(): check if the file exists and Node.js can access it with its permissions
* fs.appendFile(): append data to a file. If the file does not exist, it's created
* fs.chmod(): change the permissions of a file specified by the filename passed. Related: fs.lchmod(), fs.fchmod()
* fs.chown(): change the owner and group of a file specified by the filename passed. Related: fs.fchown(), fs.lchown()
* fs.close(): close a file descriptor
* fs.copyFile(): copies a file
* fs.createReadStream(): create a readable file stream
* fs.createWriteStream(): create a writable file stream
* fs.link(): create a new hard link to a file
* fs.mkdir(): create a new folder
* fs.mkdtemp(): create a temporary directory
* fs.open(): set the file mode
* fs.readdir(): read the contents of a directory
* fs.readFile(): read the content of a file. Related: fs.read()
* fs.readlink(): read the value of a symbolic link
* fs.realpath(): resolve relative file path pointers (., ..) to the full path
* fs.rename(): rename a file or folder
* fs.rmdir(): remove a folder
* fs.stat(): returns the status of the file identified by the filename passed. Related: fs.fstat(), fs.lstat()
* fs.symlink(): create a new symbolic link to a file
* fs.truncate(): truncate to the specified length the file identified by the filename passed. Related: fs.ftruncate()
* fs.unlink(): remove a file or a symbolic link
* fs.unwatchFile(): stop watching for changes on a file
* fs.utimes(): change the timestamp of the file identified by the filename passed. Related: fs.futimes()
* fs.watchFile(): start watching for changes on a file. Related: fs.watch()
* fs.writeFile(): write data to a file. Related: fs.write()

**One peculiar thing about the fs module is that all the methods are asynchronous by default, but they can also work synchronously by appending Sync.**

For example:
```js
fs.rename()
fs.renameSync()
fs.write()
fs.writeSync()
```
This makes a huge difference in your application flow.

Node.js 10 includes experimental support for a promise based API

For example let's examine the fs.rename() method. The asynchronous API is used with a callback:
```js
const fs = require('fs')

fs.rename('before.json', 'after.json', err => {
  if (err) {
    return console.error(err)
  }


})
```
A synchronous API can be used like this, with a try/catch block to handle errors:
```js
const fs = require('fs')

try {
  fs.renameSync('before.json', 'after.json')

} catch (err) {
  console.error(err)
}
```
The key difference here is that the execution of your script will block in the second example, until the file operation succeeded.

person(luke)
//
GET /api/people/1/

HTTP 200 OK
Content-Type: application/json
Vary: Accept
Allow: GET, HEAD, OPTIONS

{
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "http://swapi.dev/api/planets/1/",
    "films": [
        "http://swapi.dev/api/films/1/",
        "http://swapi.dev/api/films/2/",
        "http://swapi.dev/api/films/3/",
        "http://swapi.dev/api/films/6/"
    ],
    "species": [],
    "vehicles": [
        "http://swapi.dev/api/vehicles/14/",
        "http://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
        "http://swapi.dev/api/starships/12/",
        "http://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "http://swapi.dev/api/people/1/"
}
//
//
//
//

Homeworld

HTTP 200 OK
Content-Type: application/json
Vary: Accept
Allow: GET, HEAD, OPTIONS

{
    "name": "Tatooine",
    "rotation_period": "23",
    "orbital_period": "304",
    "diameter": "10465",
    "climate": "arid",
    "gravity": "1 standard",
    "terrain": "desert",
    "surface_water": "1",
    "population": "200000",
    "residents": [
        "http://swapi.dev/api/people/1/",
        "http://swapi.dev/api/people/2/",
        "http://swapi.dev/api/people/4/",
        "http://swapi.dev/api/people/6/",
        "http://swapi.dev/api/people/7/",
        "http://swapi.dev/api/people/8/",
        "http://swapi.dev/api/people/9/",
        "http://swapi.dev/api/people/11/",
        "http://swapi.dev/api/people/43/",
        "http://swapi.dev/api/people/62/"
    ],
    "films": [
        "http://swapi.dev/api/films/1/",
        "http://swapi.dev/api/films/3/",
        "http://swapi.dev/api/films/4/",
        "http://swapi.dev/api/films/5/",
        "http://swapi.dev/api/films/6/"
    ],
    "created": "2014-12-09T13:50:49.641000Z",
    "edited": "2014-12-20T20:58:18.411000Z",
    "url": "http://swapi.dev/api/planets/1/"
}
