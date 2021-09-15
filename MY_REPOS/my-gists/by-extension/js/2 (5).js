// VERSION 2 -- broken

async function *main() {
   yield ready;
}

var resolve1;
var resolve2;
var ready = new Promise(function c(res){
   resolve1 = res;
});
var other = new Promise(function c(res){
   resolve2 = function r(v){ Promise.resolve(v).then(res); };   // ONLY THIS LINE WAS CHANGED!
});

resolve1("hare");                  // winner should be "hare"
resolve2({ value: "tortoise" });   // but winner is "tortoise" :/


Promise.race([
   main().next(),
   other,
])
.then(function t({ value: winner }){
   console.log(`The winner is: ${winner}`);   // The winner is: tortoise
});
