/* /list
 */

// lists first-level files and directories inside a directory
module.exports = (fsReaddir, stat, join) => (path) => {
  const entries = { files: [], dirs: [] };
  const addEntry = p =>
    stat(p).then((stats) => {
      if (stats.isDirectory()) {
        entries.dirs.push(p);
      } else if (stats.isFile()) {
        entries.files.push(p);
      }
    });

  return new Promise((resolve, reject) => {
    fsReaddir(path, (error, content) => {
      if (error) {
        reject(error);
      } else {
        const listing = content.map(c => addEntry(join(path, c)));
        Promise.all(listing).then(() => resolve(entries));
      }
    });
  });
};
