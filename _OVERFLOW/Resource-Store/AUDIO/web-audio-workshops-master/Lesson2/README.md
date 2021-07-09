## Aim

Fetch an audio file and pass it into a buffer to use as your audio source. Harness the power of `context.currentTime` so create a drum loop.

Work in [index.html](index.html). The file is set up with some existing code and a button to help you get started.

## Tasks

1. In out play hihat function create a source

   `const hihat = context.createBufferSource();`

2. Pass in out buffer data to our buffer source we created

   `hihat.buffer = buffer;`

3. Connect our source to our destination

   `hihat.connect(context.destination);`

4. Start and stop our buffer using the time param

   `hihat.start(time);`
   `hihat.stop(time+0.3);`

5. After we've fetched our sound file, play the hihat on the first beat of our set bar

   `playHihat(audioBuffer, time*eighthNoteTime);`

6. **BONUS** Create a loop to play the hi hat on every beat

```javascript
  for (var i = 0; i < 8; ++i) {
    playHihat(audioBuffer, time + i * eighthNoteTime);
  }
```

## What you learnt!

1. What digital audio really is - just numbers!
2. Soemthing about buffers, their like containers with the numbers in that we can use
3. How to get files into a buffer and then play them
4. The power of the Audio API's `currentTime` property
 