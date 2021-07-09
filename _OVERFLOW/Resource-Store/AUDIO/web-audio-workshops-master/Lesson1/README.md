## Aim

Load the audio from an audio element within the DOM into the audio API. Play and mute the sound on the click of a button.

Work in [index.html](index.html). The file is set up with an audo element and a button to help you get started.

## Tasks

1. Instigate the audio context

   `const context = new window.AudioContext;`

2. Grab the audio source from the DOM element and pass it into the context to use

   `const source = context.createMediaElementSource(audioEl);`

3. When you click the play button connect the source to the destination

   `source.connect(gainNode).connect(context.destination);`
   `audioEl.play();`

4. Create a gain node and connect it to the audio graph

   `const gainNode = context.createGain();`

5. When you click the mute button mute the audio (set the gain value to 0)

   `gainNode.gain.value = 0;`

6. **BONUS** Open the working demo in Firefox (if you're not already using it) and check out the audio tab of the developer tools. Reload the page to see your audio graph

## What you learnt!

1. How to begin with the API and access all the goodness within
2. What an audio graph is, an understanding of nodes and how they connect together
3. Using a DOM element as a source node
4. What a gain node is and how to use it
5. Firefox's audio developer tools