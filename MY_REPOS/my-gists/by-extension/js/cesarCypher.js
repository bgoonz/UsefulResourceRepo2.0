//caesarCipher algorithm using modern javascript

//Objective: to shift every letter in given string by give number.
//even negative value of number
//only string with spaces are allowed for now.

let caesarCipher = (str, num) => {
    num = num % 26; //IMP to convert numbr > or < 26
    let lowercaseString = str.toLowerCase();
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let newString = '';
    for (let i = 0; i < lowercaseString.length; i++) {
        let currentLetter = lowercaseString[i];
        if (currentLetter == ' ') {
            newString += currentLetter;
            continue;
        };
        let currentIndex = alphabet.indexOf(currentLetter);
        let newIndex = currentIndex + num;
        if (newIndex > 25) newIndex = newIndex - 26; //start's from 0.
        if (newIndex < 0) newIndex = 26 + newIndex;
        if (str[i] == str[i].toUpperCase()) {
            newString += alphabet[newIndex].toUpperCase();
        }
        else newString += alphabet[newIndex];
    };
    return newString;
};

console.log(caesarCipher("amazing algo", -700));
console.log(caesarCipher("i love javascript", -15));
console.log(caesarCipher("Zoo Keeper", 2)); //Bqq Mggrgt