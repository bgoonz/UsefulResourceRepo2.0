# file-manager-js

[![build:?](https://travis-ci.org/js-shelf/file-manager-js.svg?branch=master)](https://travis-ci.org/js-shelf/file-manager-js) [![npm](https://img.shields.io/npm/v/file-manager-js.svg)](https://www.npmjs.com/package/file-manager-js) [![npm](https://img.shields.io/npm/dm/file-manager-js.svg)](https://www.npmjs.com/package/file-manager-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/file-manager-js)

## Description

It uses node filesystem to manage files and directories on the local storage through an enhanced promise interface. It can list/create/remove files and directories recursively with promises.

## Install

```
npm install file-manager-js
```

## Usage

```javascript
// require all functions
const fileManager = require("file-manager-js");

// OR specific functions
const { list, removeFile, rename } = require("file-manager-js");
```

**.stat(path)**

promisified fs.stat. retrieves the stats of a file or directory.
https://nodejs.org/api/fs.html#fs_class_fs_stats

```javascript
fileManager.stat('./test.txt')
  .then((stats) => // stats)
  .catch((error) => // error);
```

**.info(path)**

returns an extended stats object that includes size (**bytes**) and type of the path

```javascript
// file info
fileManager.info('./test.txt').then((info) => {
  /*
   {
     size: 19,
     type: 'file',
     ...
   }
  */
}).catch((error) => // error);

// directory info
fileManager.info('./test')
  .then((info) => {
    /*
     {
       size: 2146, // size of all files in dir tree
       type: 'directory',
       ...
     }
    */
  })
  .catch((error) => // error);
```

**.join(path1, path2)**

join two paths. a delegate to require('path').join

```javascript
let p = fileManager.join("a/b/c", "d/e/f"); // a/b/c/d/e/f
```

**.list(path)**

list first-level files and directories inside a directory

```javascript
// path can be an absolute path using __dirname
fileManager.list('./project')
  .then((entries) => {
    /*
     {
       files: ['index.js', 'README.md'],
       dirs : ['lib', 'node_modules', 'test']
     }
    */
  })
  .catch((error) => // error)
```

**.listDeep(path)**

list in-depth files and directories inside a directory

```javascript
fileManager.listDeep('./content')
  .then((entries) => {
    /*
     {
       files: ['test.txt', 'abc/test.csv', 'new/content/test/a.txt'],
       dirs : ['abc', 'abc/test', 'new/content/test']
     }
    */
  })
  .catch((error) => // error)
```

**.exists(path)**

checks if a path (file or directory) exists and resolve with true or false

```javascript
fileManager.exists('./content')
  .then((exists) => // true)
  .catch((error) => // error)

fileManager.exists('./newContent')
  .then((exists) => // false)
  .catch((error) => // error)
```

**.createDir(path)**

creates a single directory or a directory tree

```javascript
// create a directory tree
fileManager.createDir('./a/b/c/d')
  .then((path) => // path = ./a/b/c/d)
  .catch((error) => // error)
```

**.createFile(path)**

creates a file and creates the directory tree in the path if not exists

```javascript
// creates a directory structure then the file
fileManager.createFile('./x/y/z/test.txt')
  .then((path) => // path = ./x/y/z/test.txt)
  .catch((error) => // error)
```

**.readFile(path)**

reads entire file content

```javascript
fileManager.readFile('./x/y/z/test.txt')
  .then((content) => // content is instance of Buffer)
  .catch((error) => // error)
```

**.removeDir(path)**

removes a directory or directory tree with all its content

```javascript
// remvove a/b/c/d + a/b/c +  a/b/test.txt + a/b + a
fileManager.removeDir('./a')
  .then((path) => // ./a)
  .catch((error) => // error)
```

**.removeFile(path)**

removes a file

```javascript
// removed ./test.txt
fileManager.removeFile('./test.txt')
  .then((path) => // ./test.txt)
  .catch((error) => // error)
```

**.rename(oldPath, newPath)**

rename a file or directory

```javascript
// rename file ./test.txt to ./ttt.txt
fileManager.rename('./test.txt', './ttt.txt')
  .then((newPath) => // ./ttt.txt)
  .catch((error) => // error)
```

## Build

```
grunt build
```

## License

The MIT License. Full License is [here](https://github.com/js-shelf/file-manager-js/blob/master/LICENSE)
