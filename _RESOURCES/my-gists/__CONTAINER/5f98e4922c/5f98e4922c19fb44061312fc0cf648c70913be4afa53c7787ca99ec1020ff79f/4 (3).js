// VERSION 4 -- also "fixed", but double UGH :(

async function *main() {
   yield ready;
}

async function *main2() {
   yield other;
}

var resolve1;
var resolve2;
var ready = new Promise(function c(res){
   resolve1 = res;
});
var other = new Promise(function c(res){
   resolve2 = res;
});

resolve1("hare");       // winner should be "hare"
resolve2("tortoise");   // and it is! :(


Promise.race([
   main().next(),
   main2().next(),
])
.then(function t({ value: winner }){
   console.log(`The winner is: ${winner}`);   // The winner is: hare
});