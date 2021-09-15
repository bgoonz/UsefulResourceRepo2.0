

#ifndef _AUDIO_IO_H_
#define _AUDIO_IO_H_

#include <iostream>
#include <math.h>
#include <portaudio.h>

using namespace std;

/*
 * An object of class Audio_IO can be used for reading and/or writing
 *   digital audio samples to/from an audio device. This is a wrapper
 *   around the Portaudio library
 *
 * Modes:
 * - Write only [default]
 * - Read only
 * - Read and write
 */

#define AUDIO_IO_WRITEONLY 1
#define AUDIO_IO_READONLY 2
#define AUDIO_IO_READWRITE 3

class Audio_IO
{
public:
  // Constructors
  Audio_IO();
  Audio_IO(int samplerate, int nrofchannels);

  // Destructor
  ~Audio_IO();

  // Configure
  int list_devices();
  int set_input_device(int device);
  int set_output_device(int device);
  void set_mode(int mode);
  //void set_latency(bool latency); // 0: low   1: high
  void set_samplerate(int samplerate);
  void set_nrofchannels(int nrofchannels);
  void set_framesperbuffer(int framesperbuffer);
  int get_framesperbuffer();

  // initialise must be called prior to listing devices
  void initialise();
  // start_server must be called prior to any read/write actions
  void start_server();

  void write(float *);
  void read(float *);

  void finalise();

private:
  PaStreamParameters outputParameters;
  PaStreamParameters inputParameters;
  PaStream *stream;
  PaError err;
  int input_device, output_device;
  int nrofdevices;
  int samplerate;
  static int nrofchannels;
  int framesperbuffer;

  void leave(); // needs to be replaced by proper exception mechanism

  int mode;

}; // Audio_IO{}

#endif // _AUDIO_IO_H_
