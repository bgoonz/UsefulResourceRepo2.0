
#include <iostream>
#include <cstdlib>
#include "audio_io.h"

// Some defaults
#define DEFAULT_SAMPLERATE 44100
#define DEFAULT_NROFCHANNELS 2 // stereo
#define DEFAULT_FRAMES_PER_BUFFER 64

int Audio_IO::nrofchannels;

Audio_IO::Audio_IO()
{
  samplerate = DEFAULT_SAMPLERATE;
  nrofchannels = DEFAULT_NROFCHANNELS;
  mode = AUDIO_IO_WRITEONLY;
  input_device = -1;
  output_device = -1;
  nrofdevices = 0;
}

Audio_IO::Audio_IO(int samplerate, int nrofchannels)
{
  this->samplerate = samplerate;
  this->nrofchannels = nrofchannels;
}

Audio_IO::~Audio_IO()
{
  // finalise aanroepen bijvoorbeeld
}

void Audio_IO::set_mode(int mode)
{
  this->mode = mode;
}

// The function leave() should be replaced by a proper exception mechanism
void Audio_IO::leave()
{
  Pa_Terminate();
  cerr << "Error... error number " << err << endl;
  cerr << "Error message: " << Pa_GetErrorText(err) << endl;
  exit(0);
} // leave()

void Audio_IO::set_samplerate(int samplerate)
{
  this->samplerate = samplerate;
}

void Audio_IO::set_nrofchannels(int nrofchannels)
{
  this->nrofchannels = nrofchannels;
}

void Audio_IO::set_framesperbuffer(int framesperbuffer)
{
  this->framesperbuffer = framesperbuffer;
}

int Audio_IO::get_framesperbuffer()
{
  return framesperbuffer;
}

/* Querying devices:
  http://portaudio.com/docs/v19-doxydocs/querying_devices.html
 */
int Audio_IO::list_devices()
{
  const PaDeviceInfo *info;
  nrofdevices = Pa_GetDeviceCount();

  if (nrofdevices <= 0)
  {
    cout << "No devices found" << endl;
    return 0;
  } // if

  for (int d = 0; d < nrofdevices; d++)
  {
    info = Pa_GetDeviceInfo(d);
    cout << "Device " << d << "\t" << info->name;
    if (info->maxInputChannels > 0)
      cout << " (IN)";
    if (info->maxOutputChannels > 0)
      cout << " (OUT)";
    cout << endl;
  } // for

  return nrofdevices;
} // list_devices()

int Audio_IO::set_input_device(int device)
{
  if (device >= nrofdevices)
    return -1;
  input_device = device;
  return 0;
}

int Audio_IO::set_output_device(int device)
{
  if (device >= nrofdevices)
    return -1;
  output_device = device;
  return 0;
}

void Audio_IO::initialise()
{
  err = Pa_Initialize();
  if (err != paNoError)
    leave();
} // initialise()

void Audio_IO::start_server()
{
  if (mode == AUDIO_IO_WRITEONLY || mode == AUDIO_IO_READWRITE)
  {
    if (output_device > 0)
      outputParameters.device = output_device;
    else
      outputParameters.device = Pa_GetDefaultOutputDevice();
    outputParameters.channelCount = nrofchannels;
    outputParameters.sampleFormat = paFloat32;
    outputParameters.suggestedLatency =
        Pa_GetDeviceInfo(outputParameters.device)->defaultLowOutputLatency;
    outputParameters.hostApiSpecificStreamInfo = NULL;
  }

  if (mode == AUDIO_IO_READONLY || mode == AUDIO_IO_READWRITE)
  {
    if (input_device > 0)
      inputParameters.device = input_device;
    else
      inputParameters.device = Pa_GetDefaultInputDevice();
    inputParameters.channelCount = nrofchannels;
    inputParameters.sampleFormat = paFloat32;
    inputParameters.suggestedLatency =
        Pa_GetDeviceInfo(inputParameters.device)->defaultLowInputLatency;
    inputParameters.hostApiSpecificStreamInfo = NULL;
  }

  switch (mode)
  {
  case AUDIO_IO_WRITEONLY:
    err = Pa_OpenStream(
        &stream,
        NULL, // no input
        &outputParameters,
        samplerate,
        framesperbuffer,
        paClipOff,
        NULL,  // no callback
        NULL); // no user data
    break;
  case AUDIO_IO_READONLY:
    err = Pa_OpenStream(
        &stream,
        &inputParameters,
        NULL, // no output
        samplerate,
        framesperbuffer,
        paClipOff,
        NULL,  // no callback
        NULL); // no user data
    break;
  case AUDIO_IO_READWRITE:
    err = Pa_OpenStream(
        &stream,
        &inputParameters,
        &outputParameters,
        samplerate,
        framesperbuffer,
        paClipOff,
        NULL,  // no callback
        NULL); // no user data
    break;
  default:
    leave(); // invalid mode
  }          // switch

  if (err != paNoError)
    leave();

  err = Pa_StartStream(stream);
  if (err != paNoError)
    leave();
} // start_server()

void Audio_IO::write(float *buf)
{
  if (mode == AUDIO_IO_WRITEONLY || mode == AUDIO_IO_READWRITE)
  {
    // blocking write
    err = Pa_WriteStream(stream, buf, framesperbuffer);
    //if(err != paNoError) leave();
  }
}

void Audio_IO::read(float *buf)
{
  if (mode == AUDIO_IO_READONLY || mode == AUDIO_IO_READWRITE)
  {
    // blocking read
    err = Pa_ReadStream(stream, buf, framesperbuffer);
    if (err != paNoError)
      leave();
  }
}

void Audio_IO::finalise()
{
  err = Pa_StopStream(stream);
  if (err != paNoError)
    leave();

  err = Pa_CloseStream(stream);
  if (err != paNoError)
    leave();

  Pa_Terminate();
} // finalise()
