#include "audio_io.h"
#include "effect.h"
Effect::Effect()
{
} // Effect()
Effect::~Effect()
{
} // ~Effect()
void Effect::process_samples(float *inputbuffer, float *outputbuffer)
{
  for (int i = 0; i < FRAMESPERBUFFER; i++)
    outputbuffer[i] = inputbuffer[i];
}
