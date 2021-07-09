## Aim

Actually know what MIDI is! And how we harness that in a browser. Plug in a MIDI instrument or controller and trigger events to play when you press buttons!

Work in [index.html](index.html). The file is set up with some existing code to help you get started.

## Tasks

#### There's a few functions already in the file - let's have a quick look over them

1. Requesting MIDI access: We're firstly checking here if Web MIDI is supported by testing the `requestMIDIAccess` method of the navigator object.
   
   If it is, we call it - if not we alert the user there is no MIDI support available.

   We set some params when we call `requestMIDIAccess` - in this case `sysex: false` which means we don't want to talk back to the device. The method returns a promise.

2. `onMIDISuccess` function: Our raw MIDI data gets passed to this function. We want to listen for all MIDI input messages and when there is one call the `onMIDIMessage` function.

3. `onMIDIMessage` logs the data we receive in the browser to the console... So plug in a MIDI controller, open the HTML file & console and watch as data is logged when you press buttons and turn dials :D

4. You have all the functions we wrote before to play when you receive a MIDI message. Test for certain values and trigger functions!


## What you learnt!

1. That MIDI isn't quite what you think it is :)
2. How you get MIDI information in a browser, how to listen for events and easily use them in JavaScript to harness functionality that you want
3. Hopefully make some kind of synth with everything you've learnt!
 