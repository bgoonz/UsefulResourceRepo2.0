# File System Manager


---
[![build:?](https://travis-ci.org/js-shelf/file-manager-js.svg?branch=master)](https://travis-ci.org/js-shelf/file-manager-js) [![npm](https://img.shields.io/npm/v/file-manager-js.svg)](https://www.npmjs.com/package/file-manager-js) [![npm](https://img.shields.io/npm/dm/file-manager-js.svg)](https://www.npmjs.com/package/file-manager-js) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/file-manager-js)

---

```

.
├── createDir
│   ├── fn.js
│   └── index.js
├── createFile
│   ├── fn.js
│   └── index.js
├── dirSize
│   ├── fn.js
│   └── index.js
├── exists
│   ├── fn.js
│   └── index.js
├── info
│   ├── fn.js
│   └── index.js
├── list
│   ├── fn.js
│   └── index.js
├── listDeep
│   ├── fn.js
│   └── index.js
├── readFile
│   ├── fn.js
│   └── index.js
├── removeDir
│   ├── fn.js
│   └── index.js
├── removeFile
│   ├── fn.js
│   └── index.js
├── rename
│   ├── fn.js
│   └── index.js
├── src-tree.md
└── stat
    ├── fn.js
    └── index.js

12 directories, 25 files
```

---
---
```
\___________________________________________________
bryan_dir:REPO_exitstatus:0 ====>

npm run test

> file-manager-js@3.1.6 test /mnt/c/MY-WEB-DEV/04-Personal-Projects/_source-repos/REPO
> grunt test

Running "mochaTest:files" (mochaTest) task


  fileManager tests
    .stat(path)
      ✓ should get a dir stats
      ✓ should get a file stats
      ✓ should reject with an error when path not found
    .list(path)
      ✓ should list files and dirs inside a path
    .listDeep(path)
      ✓ should list files and dirs inside a path (38ms)
    .info(path)
      ✓ should get info object of a file
      ✓ should get info object of a directory (53ms)
    .exists(path)
      ✓ should check that a path exists and resolve with true
      ✓ should check that a path exists resolve with false
    .createDir(path)
      ✓ should create a directory
      ✓ should create a directory tree recursively (38ms)
    .createFile(path)
      ✓ should create a file
      ✓ should create a file inside a directory tree
    .readFile(path)
      ✓ should read file content
    .removeFile(path)
      ✓ should remove an existing file
    .removeDir(path)
      ✓ should remove an existing directory
      ✓ should remove an existing directory tree recursively
    .rename(oldPath, newPath)
      ✓ should rename a file
      ✓ should rename a directory


  19 passing (270ms)


Done.

\___________________________________________________
bryan_dir:REPO_exitstatus:0 ====>

```
