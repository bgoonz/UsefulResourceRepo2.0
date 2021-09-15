/* /listDeep
 */

// lists in-depth files and directories inside a directory
module.exports = list => (path) => {
  const entries = { files: [], dirs: [] };
  const listDeep = p =>
    list(p).then((currEntries) => {
      if (currEntries.files.length > 0) {
        entries.files = entries.files.concat(currEntries.files);
      }
      if (currEntries.dirs.length > 0) {
        entries.dirs = entries.dirs.concat(currEntries.dirs);
        const listing = currEntries.dirs.map(listDeep);
        return Promise.all(listing).then(() => entries);
      }
      return entries;
    });
  return listDeep(path);
};
