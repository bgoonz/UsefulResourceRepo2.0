//harmlessRansomNote algorithm using modern javascript

//INFO: BIG O Notation: describe's how fast or how scaleble algorithm is.
// O (1) constant
// O (n) linear
// O (n2) exponential
// O (log n) logarithmic

let harmlessRansomNote = (noteText, magazineText) => {
    let noteArr = noteText.split(' ');
    let magazineArr = magazineText.split(' ');
    let magazineObj = {};

    magazineArr.forEach(word =>{
        if(!magazineObj[word]) magazineObj[word] = 0;
        magazineObj[word]++;
    });

    let noteIsPossible = true;
    noteArr.forEach(word =>{
        if (magazineObj[word]) {
            magazineObj[word]--;
            if (magazineObj[word]  <0 ) noteIsPossible =false;
        }
        else noteIsPossible = false;

    });

    return noteIsPossible;

};

console.log(harmlessRansomNote('all text', 'this is all the text magazine in all the magazine'));

console.log(harmlessRansomNote('all text secret', 'this is all the text magazine in all the magazine'));