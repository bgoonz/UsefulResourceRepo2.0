const fs = require('fs');

const [TARGET_FILE, OLD_STR, NEW_STR, REPLACE_NUM] = process.argv.slice(2);

fs.readFile(TARGET_FILE, "utf8", (err, data) => {
  if(err) {
    console.log('error reading the file');
    console.log(err);
  }

  let newData;
  if (REPLACE_NUM === undefined) {
    newData = replaceAll(data, OLD_STR, NEW_STR);
  } else {
    newData = replaceSome(data, OLD_STR, NEW_STR, REPLACE_NUM);
  }

  fs.writeFile(TARGET_FILE, newData, 'utf8', (err) => {
    if(err) {
      console.log('error writing the file');
      console.log(err);
    } else {
      console.log('write successful');
    }
  })
});

function replaceAll(string, str1, str2) {
  return string.split(str1).join(str2);
}

function replaceSome(string, str1, str2, count) {
  let newString = '';
  let numReplaced = 0;
  let i = 0;
  while(i < string.length) {
    if (string.slice(i, i + str1.length) === str1 && numReplaced < count) {
      newString += str2;
      i += str1.length;
      numReplaced++
    } else {
      newString += string[i];
      i++
    }
  }
  return newString;
}

