## Aim

Learn about spacialisation of sound by building a very simple demo to show sound moving in space.

Work in [index.html](index.html). The file is set up with some existing code and a button to help you get started.

## Tasks

1. Set our sound source

   `const soundSource = context.createPanner();`

2. Set our listener source

   `const listener = context.listener;`

3. Set the position of both the sound & the listener in 3D space

```javascript
  listener.setPosition(0, 0, 5);
  soundSource.setPosition(0, 0, 5);
```

4. Create out buffer source nodes with params

```jaavscript
  const music = context.createBufferSource();
  music.buffer = audioBuffer;
  music.loop = true;
```

5. Start music
6. Change our source postion when we move our mouse

```javascript
   soundSource.setPosition((evt.clientX-startPosX)/10, (evt.clientY-startPosY)/10, (evt.clientY-startPosY)/10);
```

7. Move our span with our mouse

```javascript
   spaceSource.style.transform = 'translate('+(evt.clientX-startPosX)+'px, '+(evt.clientY-startPosY)+'px)';
```

8. When we release our mouse stop the music

## What you learnt!

1. That you can place sound in space
2. What the difference between a listener and sound source is
3. The 3D space we are in - there are other things such as coords, velocity etc...
 