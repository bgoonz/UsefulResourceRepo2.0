var p = Promise();

p.then(function (a) {console.log(a); return Promise().reject(new Error())}, console.error)
.then(console.log, console.error);

p.resolve(false);