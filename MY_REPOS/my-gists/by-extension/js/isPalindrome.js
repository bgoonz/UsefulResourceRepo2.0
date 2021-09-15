//ispalindrome algorithm using modern javascript

let ispalindrome = (string) => {
    string = string.toLowerCase();
    let charactersArr = string.split('');
    //ignoring all non alphabet characters
    let validCharacters = 'qwertyuiopasdfghjklzxcvbnm'.split('');

    let lettersArr = [];

    charactersArr.forEach(char =>{
        if (validCharacters.indexOf(char) > -1) lettersArr.push(char);
    });

    if(lettersArr.join('') == lettersArr.reverse().join('')) return true;
    else return false;
};

console.log(ispalindrome('hello:bunny!'));
console.log(ispalindrome('Madam i\'m Adam'));