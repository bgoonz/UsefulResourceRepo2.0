## Aim

Create sounds without audio files. Make an oscillator node and modify it's properties to create a sound.

Work in [index.html](index.html). The file is set up with some existing code and a button to help you get started.

## Tasks

1. In our play laser function create an oscillator node

   `const laser = context.createOscillator();`

2. Set properties of our oscillator

   `laser.frequency.value = 500;`
   `laser.type = 'triangle';`

3. Drop the frequency when it starts

   `laser.frequency.exponentialRampToValueAtTime(10, context.currentTime+1);`

4. Create a gain node - you can do this!
5. Set gain node value to 1 at the very start

   `laserGain.gain.setValueAtTime(1, context.currentTime);`

6. Drop the volume when it starts - you can do this!
7. Connect the audio graph - don't forget the gain node!
8. Start and stop the laser
9. On click call the play laser function
10. **BONUS** Change the params in the code to see how it affects the laser sound

## What you learnt!

1. How to make 8 bit noise!!
2. Really though, creating a usable sound from nothing but a computer generated sound wave
3. Some of the many added methods we get with nodes in the Audio API
 