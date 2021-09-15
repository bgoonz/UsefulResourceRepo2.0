/*
1) fs.readfile base madlib
2) search for ()
3) prompt user for word within ()
4) replace that word including the ()
5) repeat for every case of ()
6) console.log the result
7) fs.writefile to a new .txt file

Bonus objectives:
1) Randomize the given madlib
2) Prompt user "Are you ready for a MadLibs? (yes/no)"  ->  if they respond "Adult" an adult Madlibs is given
3) Keep the adult madlibs in a hidden directory
*/

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const getNextWord = (text) => {
    
    if (text.includes('#*')) {
        
        let openingIndex = text.indexOf('#*');
        let closingIndex = text.indexOf('*#');
        let word = text.slice(openingIndex + 2, closingIndex)
        return [word, openingIndex, closingIndex];
    }
}


const replaceWord = (text, nextWordArr) => {
    let [replace, openingIndex, closingIndex] = nextWordArr // Fix: WORD is NOT Replace
    let before = text.slice(0, openingIndex);
    let after = text.slice(closingIndex + 2);
    return before + replace + after;
}


fs.readFile('madLibShort.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return
    }

    const getFindReplace = (longStr) => {
        // base case
        if (longStr.indexOf('#*') === -1) {
            rl.close();
            console.log(longStr);
            fs.writeFile(`completed_madLibs.txt`, 'madLibs.js', 'utf8', err => {
                if (err) {
                    console.log(err);
                    return
                }
            });
            return longStr
        }

        let nextWordArr = getNextWord(longStr);
        let nextWord = nextWordArr[0];
        
        rl.question(`Please choose a ${nextWord}:  `, (answer) => {
            nextWordArr[0] = answer;
            let alteredText = replaceWord(longStr, nextWordArr);
            return getFindReplace(alteredText)
        });
    } 
    return getFindReplace(data)
});