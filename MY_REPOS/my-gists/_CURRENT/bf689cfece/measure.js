console.clear();
var instrumentedTaskRuns = 10000;
var runscount = 20;
var overheadresults = [];

var isMeasuring = false;
var marksPerTask = 2 + (isMeasuring ? 1 : 0);

function doRuns(){
    if (runscount <= 0) return console.log('done');

    // can change this to instrumentedConsoleTimeRun
    instrumentedRun = instrumentedPerfMarkRun;

    instrumentingtotal = instrumentedRun();
    notinstrumentingtotal = unInstrumentedRun();

    var overheadpertask = (instrumentingtotal - notinstrumentingtotal) / (instrumentedTaskRuns * marksPerTask);
    var overheadMicro = Number((overheadpertask * 1000).toFixed(3));
    var baselineStr = `  Baseline work cost per run: ${notinstrumentingtotal.toFixed(2)}ms`;
    console.log(`Overhead of ${instrumentedTaskRuns.toLocaleString()} ${instrumentedRun.callname} calls:`, overheadMicro, "µs/call.", baselineStr);
    overheadresults.push(overheadpertask);

    runscount--;
    // doRuns();
    setTimeout(doRuns); // yield evt loop
}

// no instrumentation 
function unInstrumentedRun(){ 
    var overallstart = performance.now();
    for (var i = 0; i < instrumentedTaskRuns; i += 2) {
      doSomeWork()
    }
    var total = performance.now() - overallstart;
    return total;
}

// using performance.mark();
function instrumentedPerfMarkRun(){ 
    var overallstart = performance.now();
    performance.mark('overall');
    for (var i = 0; i < instrumentedTaskRuns; i += 2) {
      performance.mark(i)
      doSomeWork()
      performance.mark(i + 1)
      isMeasuring && performance.measure(i, i, i + 1);
    }
    performance.mark('overallEnd');
    var total = performance.now() - overallstart;

    // these measure calls are not included in cost, as they can be done outside of the critical path. 
//     for (var i = 0; i < instrumentedTaskRuns; i += 2) {
//       performance.measure(i, i, i + 1)
//     }
    performance.measure('overall', 'overall', 'overallEnd')
    
    return total;
}
instrumentedPerfMarkRun.callname = 'perf.mark()';

// using console.time();
function instrumentedConsoleTimeRun(){ 
    var overallstart = performance.now();
    console.time('overall');
    for (var i = 0; i < instrumentedTaskRuns; i += 2) {
      console.time(i)
      doSomeWork()
      console.timeEnd(i)
    }
    console.timeEnd('overall');
    var total = performance.now() - overallstart;
    return total;
}
instrumentedConsoleTimeRun.callname = 'console.time()';

// just some arbitrary work for the VM
function doSomeWork() {
    var i = 1000;
    var s = 0;
    while (i--) 
        s += i * i * i;
    return s;

}


// doRuns();

setTimeout(_ => { doRuns(); },0);
