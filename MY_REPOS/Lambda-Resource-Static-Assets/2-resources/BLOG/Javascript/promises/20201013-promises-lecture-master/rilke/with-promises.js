const fs = require("fs");

const readFilePromisified = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, contents) => {
            if (err) {
                reject(err);
            } else {
                resolve(contents.toString());
            }
        });
    });
};

const promiseForFile0 = readFilePromisified("./file0.txt"); // 1second
const promiseForFile1 = readFilePromisified("./file1.txt"); // 1second
const promiseForFile2 = readFilePromisified("./file2.txt"); // 1second
const promiseForFile3 = readFilePromisified("./file3.txt"); // 1second

const promiseForAllFiles = Promise.all([
    promiseForFile0,
    promiseForFile1,
    promiseForFile2,
    promiseForFile3
]);

promiseForAllFiles.then((allResolvedValues) => {
    console.log("Line 28");
    console.log(
        allResolvedValues[0] + 
        allResolvedValues[1] +
        allResolvedValues[2] + 
        allResolvedValues[3]
    );
}).catch((value) => {
    console.log(value);
});