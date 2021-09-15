

Intro to Web Audio Recorder
---------------------------

`WebAudioRecorder.js` is a JavaScript library written in 2015 by [higuma](https://github.com/higuma) that can record audio and encode to common formats directly in the browser.

When used in conjunction with `getUserMedia()` it can record the audio from the user's microphone or webcam.

It supports 3 encoding formats:

*   Uncompressed waveform audio (.wav)
*   Vorbis audio in ogg container (.ogg)
*   MP3 (MPEG-1 Audio Layer III) (.mp3)

Libraries
----------------------------

`WebAudioRecorder.js` employs outside JavaScript libraries to change over the crude sound to mp3 and Vorbis. These libraries are Java Script adaptations of the well known [Weak mp3 encoder](http://lame.sourceforge.net/download.php) and [libogg](https://xiph.org/ogg/)/[libvorbis](https://xiph.org/vorbis/) encoders gotten by compiling the initial C code utilizing [Empscripten](http://kripken.github.io/emscripten-site/) as (the asm.js subset of) JavaScript. Since JavaScript is slower than local code you ought to anticipate your encoding times to be higher.

These libraries are loaded and used as Web Workers which prevents the browser tab from becoming unresponsive while the audio encoding is underway.

Even though the main `WebAudioRecorder.min.js` JS file comes in at just 3.6KB when minified (and 1.21 KB when gzipped) unless you're recording to wav, you do have to make extra HTTP requests and load the external libraries, and these libraries are quite big:


**For encoding MP3**

*   `WebAudioRecorderMp3.min.js` 386 KB minified and 114 KB gzipped
*   `Mp3LameEncoder.min.js.mem` 96 KB minified and 12 KB gzipped

That's 2 HTTP requests and 126KB in total when gzipped.

The MP3 encoder is locked at recording 2 channels but you can configure the bitrate from 64 to 320. The current implementation supports LAME CBR encoding only, no VBR (variable bit rate).

**For encoding Vorbis in ogg container**

*   `WebAudioRecorderOgg.min.js` 311 KB minified and 95 KB gzipped
*   `OggVorbisEncoder.min.js.mem` 553 KB minified and 114KB gzipped

That's 2 HTTP requests and 209KB in total when gzipped.

The Vorbis encoder can encode mono or stereo sound and you can configure the bitrate from 45kb/s to 500kb/s. Also, keep in mind that Vorbis is mostly aimed at compressing music and audio in general, it's not aimed at compressing speech [like the way Speex is](https://wiki.xiph.org/Speex_FAQ#Why_do_we_need_Speex.3F_Vorbis_is_open_source_and_patent-free.).

**Uncompressed wav sound**

The small code for capturing data as uncompressed wav is located separately in `WebAudioRecorderWav.min.js` which comes in at just 2.6 KB minified and 1 KB gzipped. No need for large libraries here.

When recording to wav, audio data is recorded as 2 channel 16bit audio (CD quality) and thus will be [exactly 10.582MB/minute](https://www.colincrawley.com/audio-file-size-calculator/) at 44.1kHz but you can lower the number of channels from the `WebAudioRecorder` constructor to halve that size.

**Sampling rate**

Regardless of the library, the sample rate used will be the one set in your OS for your playback device ([as per the spec](https://www.w3.org/TR/webaudio/#dom-audiocontextoptions-samplerate)). In practice, you'll mostly see sample rates of 44100 (44.1kHz) and 48000 (48kHz).

Project Folder
--------------

To use the library you must 1st download the [latest release (0.1.1 from 2015) from GitHub](https://github.com/higuma/web-audio-recorder-js/releases) and set up your project folder. Here's how I set up mine:

![Folder structure for simple web audio recorder demo](https://blog.addpipe.com/content/images/2018/06/simple-web-audio-recorder-demo-folder-structure-1-300x214.png)

Folder structure for simple web audio recorder demo

I'm using `index.html` for a simple record/stop UI and `app.js` to host the code for the interface.

HTML File
---------

In `index.html` we need a select for the type of encoding, 2 buttons: start and stop, a list for showing the recorded files and a visible log too keep track of what's happening. Here's how my `index.html` looks:

We're inserting`WebAudioRecorder.min.js` and`app.js` at the end to make sure they have access to all the DOM elements when run.

JavaScript File
---------------

Now let's move on to `app.js` and build our web based audio recorder.

We'll start out by defining a few variables and setting up references to those DOM UI elements. The comments describe each variable in detail:

With our record & stop buttons referenced in JS we can add event listeners for when they're clicked:

Code for starting a recording
-----------------------------

The `startRecording()` function will do most of the heavy lifting in this demo.

In it we first:

1.  set up the constraints object for audio only (see our [audio constraints](https://addpipe.com/blog/audio-constraints-getusermedia/) article for toggling advanced options like noise reduction and echo cancellation)
2.  call the promise based `navigator.mediaDevices.getUserMedia()`

Only if `getUserMedia()` succeeds (user grants microphone access) we trigger the rest of the code.

In `getUserMedia`'s success function we'll start by booting up a new `WebAudioRecorder` object taking care to provide the function for the `onEncoderLoading` event directly in its constructor. `onEncoderLoading` is the only event to be fired during construction process so to catch the first event correctly, it should be set from constructor parameter.

The JS worker files for converting audio to mp3 and Vorbis are loaded when creating a recorder object or when changing encoding with `setEncoding()`. To correctly load those worker files we must set the worker directory from the constructor object using `workerDir` ("/js" in our case because that's where we've put all the `WebAudioRecorder`files).

The last property we'll be setting in the constructor object is the `encoding` property (mp3, wav or ogg). We'll use the value from our `encodingTypeSelect` drop down menu.

With the new `recorder` object initialised we can use the `onComplete` event to trigger what happens when the encoding is done – basically we just pass the blob to the `createDownloadLink(blob,encoding)` function but more on that later. We could have set up this event in the constructor but for this demo we'll just add it after:

Before starting the recording we configure the `recorder` object to:

1.  record for maximum 120 seconds
2.  encode the audio data AFTER the recording process is stopped
3.  we set the quality for Vorbis recodings to 0.5 which means abut 160kbps
4.  we set the bitrate for mp3 encodings to 160 (kbps)

For the mp3 `bitRate` you can use values from 64 to 320 while for the Vorbis `quality` you can use values from -0.1 to 1.0.

This is the average bitrate each Vorbis quality value corresponds to:

![Each Vorbis ogg quality setting and their respective average bit rate](https://blog.addpipe.com/content/images/2018/06/Screen-Shot-2018-06-15-at-12.19.28.png)

