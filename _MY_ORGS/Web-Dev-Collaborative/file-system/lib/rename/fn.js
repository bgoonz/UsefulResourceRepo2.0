/* /rename
 */

// renames a file or directory
module.exports = fsRename => (oldPath, newPath) =>
  new Promise((resolve, reject) => {
    fsRename(oldPath, newPath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(newPath);
      }
    });
  });
