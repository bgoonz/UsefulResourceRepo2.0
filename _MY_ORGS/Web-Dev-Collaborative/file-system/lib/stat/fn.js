/* /stat
 */

module.exports = fsStat => path =>
  new Promise((resolve, reject) => {
    fsStat(path, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve(stats);
      }
    });
  });
