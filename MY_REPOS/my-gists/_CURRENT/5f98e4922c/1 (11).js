// NOTE: To see this demo: https://codepen.io/getify/pen/LYPbmYG?editors=0012


var counter = 1;

function printMessage() {
  console.log(`message ${counter++}`);
}

var schedule = Scheduler(/* debounceMinimum = */50,/* throttleMaximum = */500);

// try to schedule a message to be printed (after approx 50ms of debounce)
schedule(printMessage);

setTimeout(function waitAWhile(){
  // try to schedule next message to be printed (after approx 50ms of debounce)
  schedule(printMessage);

  // but now keep flooding the scheduling, so it keeps debouncing, up to the 500ms max throttling
  var intv = setInterval(function(){ schedule(printMessage); },30);
  
  // stop the madness, after about 10 seconds!
  setTimeout(function(){ clearInterval(intv); },10*1000);
},3*1000);

// "message 1" (printed after about 50ms)

// (waiting about 3.5 seconds)

// "message 2"
// "message 3"  (after another 500ms)
// "message 4"  (after another 500ms)
// ..