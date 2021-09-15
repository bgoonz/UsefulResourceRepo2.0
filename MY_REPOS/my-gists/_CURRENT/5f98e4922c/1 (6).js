// VERSION 1 -- broken

async function *main() {
   yield ready;
}

var resolve1;
var resolve2;
var ready = new Promise(function c(res){
   resolve1 = res;
});
var other = new Promise(function c(res){
   resolve2 = res;
});

resolve1("hare");                  // winner should be "hare"
resolve2({ value: "tortoise" });   // but winner is "tortoise" :/


Promise.race([
   main().next(),
   other,
])
.then(function t({ value }){
   console.log(`The winner is: ${value}`);   // The winner is: tortoise
});
