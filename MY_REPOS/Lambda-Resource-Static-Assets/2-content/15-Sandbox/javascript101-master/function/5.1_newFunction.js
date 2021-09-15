'use strict'
function BuildFunction() {
    var code = `
    if(a<5){
        console.log(11);
    }else{
        console.log(22);
    }
    `;

    return new Function("a", code);
}

var fun = BuildFunction();
fun(3);
