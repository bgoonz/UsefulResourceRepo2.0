/* /readFile
 */

// retrieves file content
module.exports = fsReadFile => path =>
  new Promise((resolve, reject) => {
    fsReadFile(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
