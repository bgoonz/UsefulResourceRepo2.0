

// creates a file and its directory tree if not exists
module.exports = (fsOpen, createDir, exists) => (path) => {
  const createFile = p => new Promise((resolve, reject) => {
    exists(p)
      .then((fileExists) => {
        if (fileExists) {
          const error = new Error(`file "${p}" already exists`);
          error.code = 'EEXIST';
          reject(error);
        } else {
          fsOpen(p, 'w', (error) => {
            if (error && error.code === 'ENOENT') {
              const parts = p.split('/');
              const dirs = parts.slice(0, parts.length - 1).join('/');
              createDir(dirs)
                .then(() => createFile(p))
                .then(() => resolve(p));
            } else if (error) {
              reject(error);
            } else {
              resolve(p);
            }
          });
        }
      });
  });
  return createFile(path);
};
