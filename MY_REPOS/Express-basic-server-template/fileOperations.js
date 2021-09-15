const fs = require('fs');

function read(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./files/${fileName}`, 'UTF-8', (err, data) => {
      if (err) {
        reject('File not found');
      } else {
        resolve(data);
      }
    });
  });
}

function write(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./files/${fileName}`, content, (err) => {
      if (err) {
        reject('File not found');
      }
      resolve('Written to the file successfully');
    });
  });
}





function rename(oldFileName, newFileName) {
  return new Promise((resolve, reject) => {
    fs.rename(`./files/${oldFileName}`, `./files/${newFileName}`, (err) => {
      if (err) {
        reject('Could not rename file');
      }

      resolve(`Successfully renamed ${oldFileName} to ${newFileName}`);
    });
  });
}

function append(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.appendFile(`./files/${fileName}`, content, (err) => {
      if (err) {
        reject('File not found');
      }
      resolve(`Appended to ${fileName} successfully`);
    });
  });
}

function remove(fileName) {
  return new Promise((resolve, reject) => {
    fs.unlink(`./files/${fileName}`, (err) => {
      if (err) {
        reject('File not found');
      }
      resolve(`Removed ${fileName}`);
    });
  });
}

module.exports = { read, write, rename, append, remove };
