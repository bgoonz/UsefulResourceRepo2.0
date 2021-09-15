// NOTE: asyncGenerator(..) utility is defined in 3.js below

var ag = asyncGenerator(function *main(pwait,a){
// NOTE: `pwait` parameter here is how we fake an `await` inside a normal generator
//       for it to work, you have to do `yield pwait(..)`, not just `pwait(..)`
  
  try {
     console.log(`a: ${a}`);
     yield pwait(delay(500));    // <---- fake `await`
     console.log("b");
     yield 42;
     var c = yield pwait(getData(10));    // <---- fake `await`
     console.log(`c: ${c}`);
     yield pwait(delay(500));    // <---- fake `await`
     console.log("d");
     yield getData(50);    // but THIS one is just yielding a promise out through the async generator machinery, which is where the "v: some data: 50" log message comes from
     yield pwait(delay(5000));    // <---- fake `await`
     console.log("e");
     yield pwait(delay(500));    // <---- fake `await`
     return 250;
   }
   finally {
     console.log("finally!");
   }
  
});