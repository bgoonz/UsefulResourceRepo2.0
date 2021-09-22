/*
  This replaces <Sequencer> + multiple <Sampler>s with a marble diagram sequencer.
  You can use it like this:

      <Marble
        resolution={16}
        samples={[
          'samples/kick.wav',
          'samples/snare.wav',
        ]}
        diagrams={[
          'x-x- ---- x-x- ----',
          '---- x--- ---- x---',
        ]}
      />
  
  Whitespace is ignored in the diagrams.

  By default, "x" means play and "-" means skip.
  However you can also define custom "expansions".
  
  Expansions are the letters that "expand" to the patterns you define.
  They will be interpolated into the track according to the free space you left out from its resolution.

  For example:

      <Marble
        resolution={16}
        samples={[
          'samples/kick.wav',
          'samples/snare.wav',
          'samples/snare.wav',
        ]}
        diagrams={[
          'x-x- ---- x-x- ----',
          '---- x--- ---- x---',
          '---- ---- ---- o   ',
        ]}
        expansions={{
          o: 'xxx',
        }}
      />
  
  Since we know the resolution is 16 but the third diagram only contains 12 "resolved" characters,
  the 2 other beats are distributed between expansion characters. We only have one of them ("o")
  at the very end, so it gets replaced with "xxx" which is spread over 2 free beats. Dubstep!
  
  Expansions can use other expansions, and time will be allocated recursively by the same algorithm.
  For example:
  
      <Marble
        resolution={16}
        samples={[
          'samples/kick.wav',
          'samples/snare.wav',
          'samples/snare.wav',
        ]}
        diagrams={[
          'x-x- ---- x-x- ----',
          '---- x--- ---- x---',
          '---- ---- ---- o   ',
        ]}
        expansions={{
          o: 'p-t',
          p: 'x--',
          t: 'xxx',
        }}
      />
      
  Be careful with expansions: if you have a loop between them, the stack will overflow.
  Have fun!
*/

import React from 'react';
import { Sampler, Sequencer } from 'react-music';

const parseBeats = (diagram, expansions) => {
  const beats = diagram.replace(/\s/g, '').split('');
  for (let i = 0; i < beats.length; i++) {
    const char = beats[i];
    if (char === '-') {
      beats[i] = false;
    } else if (char === 'x') {
      beats[i] = true;
    } else {
      beats[i] = parseBeats(expansions[char], expansions);
    }
  }
  return beats;
};

const getExpansionResolution = (beats, resolution) => {
  const resolvedCount = beats.filter((c) => typeof c === 'boolean').length;
  const spaceForExpansions = resolution - resolvedCount;
  const expansionCount = beats.length - resolvedCount;
  const spacePerExpansion = spaceForExpansions / expansionCount;
  return spacePerExpansion;
};

const convertBeatsToSteps = (beats, resolution) => {
  const steps = [];
  const expansionResolution = getExpansionResolution(beats, resolution);

  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];
    if (beat === true) {
      steps.push(i);
    } else if (beat === false) {
      continue;
    } else {
      const expansionSteps = convertBeatsToSteps(beat, expansionResolution);
      const interpolatedSteps = expansionSteps.map((relativeStep) =>
        i + relativeStep / expansionSteps.length * expansionResolution
      );
      steps.push(...interpolatedSteps);
    }
  }
  return steps;
};

const parseDiagram = (diagram, resolution, expansions) => {
  const beats = parseBeats(diagram, expansions);
  return convertBeatsToSteps(beats, resolution);
};

const Marble = ({
  children,
  diagrams,
  expansions,
  resolution,
  samples,
}) => (
  <Sequencer
    resolution={resolution}
    bars={1}
  >
    {diagrams.map((diagram, index) =>
      <Sampler
        key={index}
        sample={samples[index]}
        steps={parseDiagram(diagram, resolution, expansions)}
      >
        {children}
      </Sampler>
    )}
  </Sequencer>
);

Marble.defaultProps = {
  expansions: {},
};

Marble.propTypes = {
  children: React.PropTypes.node,
  diagrams: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ).isRequired,
  expansions: React.PropTypes.objectOf(
    React.PropTypes.string.isRequired
  ).isRequired,
  resolution: React.PropTypes.number.isRequired,
  samples: React.PropTypes.arrayOf(
    React.PropTypes.string.isRequired
  ).isRequired,
};
