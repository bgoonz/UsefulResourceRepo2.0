#include "delay.h"

void Delay::setDelayTime(float delayTime){
  this->delayTime = delayTime;
}

void Delay::setFeedback(float feedback){
  this->feedback = feedback;
}

void Delay::process_samples(float *inputbuffer, float *outputbuffer)
{
  if (bypass == 1) {
    for(int bufptr=0; bufptr<FRAMESPERBUFFER; bufptr++) {
      outputbuffer[bufptr] = inputbuffer[bufptr];
    }
  }
  else
    {
      for(int bufptr=0; bufptr<FRAMESPERBUFFER; bufptr++) {
	
	if(input >= DELAYBUFFERSIZE){
	  input = 0;
	}
	
	output = input - delayTime;
	
	if(output < 0){
	  output = output + DELAYBUFFERSIZE;
	}
	
	delayBuffer[input] = inputbuffer[bufptr] + (delayBuffer[output] * feedback);
	outputbuffer[bufptr] = cos(delayBuffer[input] + 0.5) ;
	
	input++;
      }//for
      
    }
}//delay
