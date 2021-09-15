/* /removeFile
 */

module.exports = fsUnlink => path =>
  new Promise((resolve, reject) => {
    fsUnlink(path, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(path);
      }
    });
  });
