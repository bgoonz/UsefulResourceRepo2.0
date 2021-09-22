/*

*/

// calculates the size of all files in a dir tree
module.exports = (list, stat) => (path) => {
  let size = 0;
  const direSize = p => list(p)
    .then((entries) => {
      const { files } = entries;
      const { dirs } = entries;
      if (files.length > 0) {
        const sizes = files.map(f => stat(f).then((stats) => {
          size += stats.size;
        }));
        return Promise.all(sizes).then(() => dirs);
      }
      return dirs;
    })
    .then((dirs) => {
      if (dirs.length > 0) {
        const sizes = dirs.map(direSize);
        return Promise.all(sizes).then(() => size);
      }
      return size;
    });
  return direSize(path);
};
