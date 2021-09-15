/* /info
 */

// gets an extended stats object from stats
module.exports = (stat, dirSize) => (path) => {
  let info = {};
  return stat(path)
    .then((stats) => {
      info = Object.assign({}, stats);
      if (stats.isFile()) {
        info.type = 'file';
        return stats.size;
      }
      info.type = 'directory';
      return dirSize(path);
    })
    .then((sz) => {
      info.size = sz;
      return info;
    });
};
