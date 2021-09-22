// creates a directory or a directory tree
module.exports = (fsMkdir, exists) => (path) => {
  const dirs = path.split('/');
  let depth = 0;
  const slicePath = () => {
    depth += 1;
    return dirs.slice(0, depth).join('/');
  };
  const createDir = p => new Promise((resolve, reject) =>
    exists(p)
      .then((exs) => {
        if (exs && depth === 0) {
          const error = new Error(`directory "${p}" already exists`);
          error.code = 'EEXIST';
          reject(error);
        } else if (exs && depth > 0) {
          createDir(slicePath()).then(resolve);
        } else {
          fsMkdir(p, (error) => {
            if (error && error.code === 'ENOENT') {
              createDir(slicePath()).then(resolve);
            } else if (error) {
              reject(error);
            } else if (depth > 0 && depth < dirs.length) {
              createDir(slicePath()).then(resolve);
            } else {
              resolve(p);
            }
          });
        }
      }));
  return createDir(path);
};
