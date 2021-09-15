/* /exists
 */

// checks if a file or dir exists
module.exports = stat => path =>
  stat(path)
    .then(() => true)
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return false;
      }
      return Promise.reject(error);
    });
