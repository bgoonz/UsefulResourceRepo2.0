var INTERVAL = 200;  // in milliseconds

function sendMIDISequence(MIDIAccess) {
    setIntervalHandle = setInterval(function () {
        var msg, delay, setIntervalHandle, domhrtRelativeTime;

        domhrtRelativeTime = Math.round(window.performance.webkitNow() -
            domhrtTimeAtStartOfPerformance);

        while (msgIndex<sequenceLength) {
            msg = sequence[msgIndex];
            delay = msg.timestamp - domhrtRelativeTime;
    
            if (delay > INTERVAL*2 )
                return; // This is the usual exit point from the interval
                        // callback - we only push events that are less than
                        // INTERVAL*2 ahead in time into the MIDI queue

            output.sendMIDIMessage(msg);

            logMessage("timestamp: " + msg.timestamp + ", domhrtTime: " + domhrtRelativeTime + ", deviation: " + (domhrtRelativeTime - msg.timestamp));

            msgIndex++;
        }

        // If we get here, we've sent all the MIDI messages.

        window.clearInterval(setIntervalHandle);    // stop the timer.
    }, INTERVAL);
}