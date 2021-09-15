import { useState, useEffect } from "react";
import "./styles/arpeggiator.css";
import Knob from "./knob";
import KnobBorder from "./knobBorder";
import Bulb from "./bulb";

const Arpeggiator = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [tempoKnob, setTempoKnob] = useState(patches[patchNumber].tempoK);
  const [rhythmKnob, setRhythmKnob] = useState(patches[patchNumber].rhythmK);
  const [directionKnob, setDirectionKnob] = useState(
    patches[patchNumber].rhythm2K
  );
  const [legatoStatus, setLegatoStatus] = useState(
    patches[patchNumber].arpLegatoBulb
  );
  const [latchStatus, setLatchStatus] = useState(
    patches[patchNumber].arpLatchBulb
  );
  const [aOSKnob, setAOSKnob] = useState(patches[patchNumber].arpOctavesK);

  useEffect(() => {
    setTempoKnob(patches[patchNumber].tempoK);
    setRhythmKnob(patches[patchNumber].rhythmK);
    setDirectionKnob(patches[patchNumber].rhythm2K);
    setLegatoStatus(patches[patchNumber].arpLegatoBulb);
    setLatchStatus(patches[patchNumber].arpLatchBulb);
    setAOSKnob(patches[patchNumber].arpOctavesK);
  }, [patches, patchNumber]);

  const convertBPM = (position) => {
    return (60 / ((position + 150) * 0.666 + 40)) * 1000;
  };

  return (
    <div className="absolute">
      <div id="tempoK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={tempoKnob}
          setRotation={setTempoKnob}
          setting={"tempoK"}
          stagingPatch={stagingPatch}
        />
        <p id="tempoKL" className="knobLabel">
          Tempo
        </p>
      </div>
      <p id="arp40L" className="subLabelLarge">
        40
      </p>
      <p id="arp240L" className="subLabelLarge">
        240
      </p>
      <div id="arpTempoBulb">
        <Bulb
          blinkClass={"tempoBlink"}
          animation={`tempoBlink ${convertBPM(
            tempoKnob
          )}ms step-start 0s infinite`}
        />
      </div>
      <div id="arpLegatoBulb">
        <Bulb on={legatoStatus} />
      </div>
      <div
        id="arpOnB"
        className="button"
        onClick={() => {
          setLegatoStatus(!legatoStatus);
          stagingPatch.current.arpLegatoBulb = !legatoStatus;
        }}
      >
        <p id="arpOnL">On</p>
      </div>
      <p id="arpLegatoL" className="whiteBoxL">
        Legato
      </p>
      <div
        id="arpLatchB"
        className="button"
        onClick={() => {
          setLatchStatus(!latchStatus);
          stagingPatch.current.arpLatchBulb = !latchStatus;
        }}
      >
        <p id="arpLatchL">Latch</p>
      </div>
      <p id="arpRestL" className="whiteBoxL">
        Rest
      </p>
      <div id="arpLatchBulb">
        <Bulb on={latchStatus} />
      </div>
      <div id="rhythmK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={rhythmKnob}
          setRotation={setRhythmKnob}
          setting={"rhythmK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].rhythmK}
        />
        <p id="rhythmKL" className="knobLabel">
          Rhythm
        </p>
      </div>
      <p id="arp1L" className="subLabelLarge">
        1
      </p>
      <p id="arp32L" className="subLabelLarge">
        32
      </p>
      <div id="rhythm2K" className="knobDiv">
        <KnobBorder highNoon={false} remove={[5, 6, 7, 8]} />
        <Knob
          rotation={directionKnob}
          setRotation={setDirectionKnob}
          notch={8}
          setting={"rhythm2K"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].rhythm2K}
        />
      </div>
      <p id="arpUpL" className="subLabelLarge">
        Up
      </p>
      <p id="arpDnL" className="subLabelLarge">
        Dn
      </p>
      <p id="arpUpDn1L" className="subLabelLarge">
        UpDn 1
      </p>
      <p id="arpUpDn2L" className="subLabelLarge">
        UpDn 2
      </p>
      <p id="arpPlayedL" className="subLabelLarge">
        Played
      </p>
      <p id="arpRandomL" className="subLabelLarge">
        Random
      </p>
      <p id="arpPlayL" className="whiteBoxL">
        Play
      </p>
      <p id="arpRecordL" className="whiteBoxL">
        Record
      </p>
      <div id="arpOctavesK" className="knobDiv">
        <KnobBorder highNoon={false} remove={[1, 2, 3, 4, 5, 6, 7, 8]} />
        <Knob
          rotation={aOSKnob}
          setRotation={setAOSKnob}
          notch={4}
          setting={"arpOctavesK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].arpOctavesK}
        />
      </div>
      <p id="AO1L" className="subLabelLarge">
        1
      </p>
      <p id="AO2L" className="subLabelLarge">
        2
      </p>
      <p id="AO3L" className="subLabelLarge">
        3
      </p>
      <p id="AO4L" className="subLabelLarge">
        4
      </p>
      <p id="arpArpL" className="subLabelLarge">
        Arp
      </p>
      <p id="arpOctavesL" className="subLabelLarge">
        Octaves
      </p>
      <p id="arpSeqL" className="whiteBoxL">
        Seq
      </p>
    </div>
  );
};

export default Arpeggiator;
