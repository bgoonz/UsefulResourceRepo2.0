import { useState, useEffect } from "react";
import "./styles/mixer.css";
import Knob from "./knob";
import KnobBorder from "./knobBorder";
import SwitchABC from "./switchABC";

const Mixer = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [oSC1Knob, setOSC1Knob] = useState(patches[patchNumber].mixerOsc1K);
  const [oSC2Knob, setOSC2Knob] = useState(patches[patchNumber].mixerOsc2K);
  const [eRNS, setERNS] = useState(patches[patchNumber].mixerUtilityS);
  const [subOscKnob, setSubOscKnob] = useState(patches[patchNumber].mixerSubK);
  const [eRNKnob, setERNKnob] = useState(patches[patchNumber].mixerUtilityK);

  useEffect(() => {
    setOSC1Knob(patches[patchNumber].mixerOsc1K);
    setOSC2Knob(patches[patchNumber].mixerOsc2K);
    setERNS(patches[patchNumber].mixerUtilityS);
    setSubOscKnob(patches[patchNumber].mixerSubK);
    setERNKnob(patches[patchNumber].mixerUtilityK);
  }, [patches, patchNumber]);

  return (
    <div className="absolute">
      <div id="mixerOsc1K" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={oSC1Knob}
          setRotation={setOSC1Knob}
          setting={"mixerOsc1K"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].mixerOsc1K}
        />
        <p id="mixerOsc1KL" className="knobLabel">
          Osc 1
        </p>
      </div>
      <div id="mixerOsc2K" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={oSC2Knob}
          setRotation={setOSC2Knob}
          setting={"mixerOsc2K"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].mixerOsc2K}
        />
        <p id="mixerOsc2KL" className="knobLabel">
          Osc 2
        </p>
      </div>
      <div id="mixerSubK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={subOscKnob}
          setRotation={setSubOscKnob}
          setting={"mixerSubK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].mixerSubK}
        />
        <p id="mixerSubKL" className="knobLabel">
          Sub Osc
        </p>
      </div>
      <div id="mixerUtilityK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={eRNKnob}
          setRotation={setERNKnob}
          setting={"mixerUtilityK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].mixerUtilityK}
        />
      </div>
      <div id="mixerUtilityBox" />
      <p id="mixerExtL" className="subLabelLarge">
        Ext
      </p>
      <p id="mixerRingL" className="subLabelLarge">
        Ring
      </p>
      <p id="mixerNoiseL" className="subLabelLarge">
        Noise
      </p>
      <div id="mixerUtilityS">
        <SwitchABC
          orientation={"Vertical"}
          position={eRNS}
          setPosition={setERNS}
          setting={"mixerUtilityS"}
          stagingPatch={stagingPatch}
        />
      </div>
    </div>
  );
};

export default Mixer;
