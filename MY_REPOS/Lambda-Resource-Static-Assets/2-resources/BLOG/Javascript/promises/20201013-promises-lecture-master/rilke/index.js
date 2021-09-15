const fs = require("fs");

// Allow operations to be STARTED, without blocking program.
// Signal back when operation is complete with a callback function.

// DOES NOT WORK
// const files = [
//     "./file0.txt",
//     "./file1.txt",
//     "./file2.txt",
//     "./file3.txt"
// ];
// const newArrayOfFileContents = files.map(fileName => {
//     return fs.readFile(fileName, (err, contents) => {
//         if (err) {
//             console.error(err);
//         } else {
//             // ????
//         }
//     });
// });
// console.log(newArrayOfFileContents);

fs.readFile(
  // BEGIN OPERATION TO READ FILE `file0.txt`. // 1second
  "./file0.txt",
  (err, contents1) => {
    // THIS FUNCTION IS CALLED WHEN FILE READ IS COMPLETE.
    if (err) {
      // We check to see if an error occured trying to read `file0.txt`
      console.error(err); // We console.error that err and try nothing else.
      // We do this in every callback after this point.
    } else {
      // No error, so .....
      // BEGIN OPERATION TO READ FILE `file1.txt`.
      // CALLBACK FUNCTION IS CALLED WHEN FILE READ IS COMPLETE.
      fs.readFile("./file1.txt", (err2, contents2) => { // 1second
        if (err2) {
          // We use err2 because we can't call it err without shadowing the other variable.
          console.err(err2);
        } else {
          // BEGIN OPERATION TO READ FILE `file2.txt`.
          // CALLBACK FUNCTION IS CALLED WHEN FILE READ IS COMPLETE.
          fs.readFile("./file2.txt", (err3, contents3) => { // 1second
            if (err3) {
              console.err(err3);
            } else {
              // BEGIN OPERATION TO READ FILE `file3.txt`.
              // CALLBACK FUNCTION IS CALLED WHEN FILE READ IS COMPLETE.
              fs.readFile("./file3.txt", (err4, contents4) => { // 1second
                if (err4) {
                  console.error(err4);
                } else {
                  // We log out the poem by concatenating contents1-4 variables we have IN SCOPE.
                  console.log(
                    contents1.toString() +
                      contents2.toString() +
                      contents3.toString() +
                      contents4.toString()
                  );
                }
              });
            }
          });
        }
      });
    }
  }
);

// Read the contents of every file.
// Concatenate all of the text and console.log the full poem
// in order

// an error?
// undefined <-- correct
// the contents of the file? NO
