import { useState, useEffect } from "react";
import "./styles/effects.css";
import Knob from "./knob";
import KnobBorder from "./knobBorder";

const Effects = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [distortionKnob, setDistortionKnob] = useState(
    patches[patchNumber].distortionK
  );
  const [oFMKnob, setOFMKnob] = useState(patches[patchNumber].oFMK);

  useEffect(() => {
    setDistortionKnob(patches[patchNumber].distortionK);
    setOFMKnob(patches[patchNumber].oFMK);
  }, [patches, patchNumber]);

  return (
    <div className="absolute">
      <div id="distortionK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={distortionKnob}
          setRotation={setDistortionKnob}
          setting={"distortionK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].distortionK}
        />
        <p id="distortionKL" className="knobLabel">
          Distortion
        </p>
      </div>
      <div id="oFMK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={oFMKnob}
          setRotation={setOFMKnob}
          setting={"oFMK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].oFMK}
        />
        <p id="oFMKL" className="knobLabel">
          Osc Filter Mod
        </p>
      </div>
    </div>
  );
};

export default Effects;
