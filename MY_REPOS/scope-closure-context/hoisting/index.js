a = 2;
console.log('valor a por hoisting: ', a);
var a;
// Hoisting eleva las declaraciones

// solo en declaraciones y no inicializaciones
// no funciona con let ni const

console.log('valor a por var: ', a);

console.log(a);

var a;


nameOfDog('Mascota Desde Hoisting')

functionnameOfDog(name){
    console.log(name);
}

nameOfDog('Sandy sin hoisting')