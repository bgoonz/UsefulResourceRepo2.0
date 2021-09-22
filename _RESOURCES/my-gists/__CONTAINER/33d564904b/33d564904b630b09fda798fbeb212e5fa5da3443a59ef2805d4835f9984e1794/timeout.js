var timer = null;
var domhrtTimeAtStartOfPerformance;
var msgIndex;
var PREQUEUE = 0;   // with a conformant sendMIDIMessage w/ timestamps, could be set to a larger number like 200.

function tick() {
    var msg, delay;

    var domhrtRelativeTime = Math.round(window.performance.webkitNow() -
            domhrtTimeAtStartOfPerformance);

    if (msgIndex=sequenceLength) 
        return;  // we've hit the end of the sequence.  This shouldn't be hit, except for an empty initial sequence.

    msg = sequence[msgIndex];
    delay = msg.timestamp - domhrtRelativeTime;
    
    while (delay <= PREQUEUE ) { // send all messages that are due now.
        output.sendMIDIMessage(msg);

        logMessage("timestamp: " + msg.timestamp + ", domhrtTime: " + domhrtRelativeTime + 
            ", scheduling deviation: " + (domhrtRelativeTime - msg.timestamp));

        msgIndex++;
        if (msgIndex == sequenceLength)
            return; // we've hit the end of the sequence.
        msg = sequence[msgIndex];
        delay = msg.timestamp - domhrtRelativeTime;
    }

    window.setTimeout(tick, delay);  // this will schedule the next tick.
}



function sendMIDISequence() {
    domhrtTimeAtStartOfPerformance = window.performance.webkitNow();
    msgIndex = 0;
    tick();
}