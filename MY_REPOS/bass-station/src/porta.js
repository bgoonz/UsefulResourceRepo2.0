import { useState, useEffect } from "react";
import "./styles/porta.css";
import Knob from "./knob";
import KnobBorder from "./knobBorder";

const Porta = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [glideTimeKnob, setGlideTimeKnob] = useState(
    patches[patchNumber].glideTimeK
  );

  useEffect(() => {
    setGlideTimeKnob(patches[patchNumber].glideTimeK);
  }, [patches, patchNumber]);

  return (
    <div className="absolute">
      <div id="glideTimeK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={glideTimeKnob}
          setRotation={setGlideTimeKnob}
          setting={"glideTimeK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].glideTimeK}
        />
        <p id="glideTimeKL" className="knobLabel">
          Glide Time
        </p>
      </div>
    </div>
  );
};

export default Porta;
