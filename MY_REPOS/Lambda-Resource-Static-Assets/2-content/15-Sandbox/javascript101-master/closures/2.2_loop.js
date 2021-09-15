for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i); //6...6
    }, i * 1000);
}

/////////////////////////////////////////////////////////

for (var i = 1; i <= 5; i++) {
    (function (j) {
        setTimeout(function timer() {
            console.log(j); //1..5
        }, j * 1000);
    })(i); 
}

/////////////////////////////////////////////////////////

for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);//1..5
    }, i * 1000);
}

