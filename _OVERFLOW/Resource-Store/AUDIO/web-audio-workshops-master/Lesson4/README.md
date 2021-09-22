## Aim

Create sounds without audio files part two. Pass created data into a buffer to make noise. Add filter effects to manipulate that noise.

Work in [index.html](index.html). The file is set up with some existing code and a button to help you get started.

## Tasks

1. In our play snare function start setting up a buffer

   `const snareBufferSize = context.sampleRate;`
   `const snareBuffer = context.createBuffer(1, snareBufferSize, context.sampleRate);`

2. Create a buffer source node

   `const snare = context.createBufferSource();`

3. Get the existing data (nothing) and replace it with generated data

```javascript
  var snareData = snareBuffer.getChannelData(0);

  for (let i=0; i<snareBufferSize; i++) {
    snareData[i] = Math.random()*2 - 1;
  }

  snare.buffer = snareBuffer;
```

4. Create a filter node
   
   `const snareFilter = context.createBiquadFilter();`

5. Set filer params

```javascript
   snareFilter.type = "bandpass";
   snareFilter.frequency = 10000;
   snareFilter.Q.value = 0.0001;
```

6. We also create a gain node and drop the volume as before to create effect... lastly make sure the audio graph is connected and call the play snare function on button click

## What you learnt!

1. Hopefully a bit more about buffers and data, this makes up a good understanding of the API
2. Filters, just one way to modify sound dramatically. The others all work in similar ways as far as coding is concerned.
3. That building a drum kit isn't so hard after all.
 