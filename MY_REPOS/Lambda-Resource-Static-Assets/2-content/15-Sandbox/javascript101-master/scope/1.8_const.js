var foo = true; 
 
if (foo) {
    var a = 2; 
    const b = 3;
    a = 3; 
    //b = 4; //error
} 
console.log(b); //b is not defined
