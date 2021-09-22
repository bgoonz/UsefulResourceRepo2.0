// NOTE: ag(..) is defined in 2.js below

for await (let v of ag("hello")) {
   console.log(`v: ${v}`);
}
// a: hello
// b
// v: 42
// c: some data: 10
// d
// v: some data: 50
//                        .... waiting 5 seconds ....
// e
// finally!

// ********************************************************

for await (let v of ag("hello")) {
   console.log(`v: ${v}`);
   if (v == "some data: 50") {
      break;
   }
}
// a: hello
// b
// v: 42
// c: some data: 10
// d
// v: some data: 50
// finally!

// ********************************************************

var it = ag("hello");
for await (let v of it) {
   console.log(`v: ${v}`);
   if (v == "some data: 50") {
      setTimeout(function(){ it.return(); },10);
   }
}
// a: hello
// b
// v: 42
// c: some data: 10
// d
// v: some data: 50
//                        .... waiting only 10 milliseconds ....
// finally!