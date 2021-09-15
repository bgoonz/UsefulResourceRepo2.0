import { useState, useEffect } from "react";
import "./styles/envelopes.css";
import SwitchABC from "./switchABC";
import Fader from "./fader";
import Bulb from "./bulb";

const Envelopes = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [eSS, setESS] = useState(patches[patchNumber].envSelectS);
  const [attackFader, setAttackFader] = useState(
    patches[patchNumber].attackFader
  );
  const [decayFader, setDecayFader] = useState(patches[patchNumber].decayFader);
  const [sustainFader, setSustainFader] = useState(
    patches[patchNumber].sustainFader
  );
  const [releaseFader, setReleaseFader] = useState(
    patches[patchNumber].releaseFader
  );
  const [triggeringS, setTriggeringS] = useState(
    patches[patchNumber].triggeringS
  );

  useEffect(() => {
    setESS(patches[patchNumber].envSelectS);
    setAttackFader(patches[patchNumber].attackFader);
    setDecayFader(patches[patchNumber].decayFader);
    setSustainFader(patches[patchNumber].sustainFader);
    setReleaseFader(patches[patchNumber].releaseFader);
    setTriggeringS(patches[patchNumber].triggeringS);
  }, [patches, patchNumber]);

  return (
    <div className="absolute">
      <div id="envSelectS">
        <SwitchABC
          orientation={"Vertical"}
          position={eSS}
          setPosition={setESS}
          setting={"envSelectS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <p id="envSelectL" className="subLabelLarge">
        Env Select
      </p>
      <p id="envSelectL1" className="subLabelLarge">
        Amp Env
      </p>
      <p id="envSelectL2" className="subLabelLarge">
        Mod Env
      </p>
      <p id="envSelectL3" className="subLabelLarge">
        Amp+Mod Env
      </p>
      <div id="attackFader">
        <Fader
          position={attackFader}
          setPosition={setAttackFader}
          setting={"attackFader"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].attackFader}
        />
      </div>
      <div id="envelopesLeftLine" />
      <p id="attackL" className="subLabelLarge">
        Attack
      </p>
      <div id="decayFader">
        <Fader
          position={decayFader}
          setPosition={setDecayFader}
          setting={"decayFader"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].decayFader}
        />
      </div>
      <p id="decayL" className="subLabelLarge">
        Decay
      </p>
      <div id="sustainFader">
        <Fader
          position={sustainFader}
          setPosition={setSustainFader}
          setting={"sustainFader"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].sustainFader}
        />
      </div>
      <p id="sustainL" className="subLabelLarge">
        Sustain
      </p>
      <div id="releaseFader">
        <Fader
          position={releaseFader}
          setPosition={setReleaseFader}
          setting={"releaseFader"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].releaseFader}
        />
      </div>
      <p id="releaseL" className="subLabelLarge">
        Release
      </p>
      <div id="triggeringS">
        <SwitchABC
          orientation={"Vertical"}
          position={triggeringS}
          setPosition={setTriggeringS}
          setting={"triggeringS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <p id="triggeringL" className="subLabelLarge">
        Triggering
      </p>
      <div id="triggeringBulb1">
        <Bulb on={triggeringS === "A"} />
      </div>
      <div id="triggeringBulb2">
        <Bulb on={triggeringS === "B"} />
      </div>
      <div id="triggeringBulb3">
        <Bulb on={triggeringS === "C"} />
      </div>
      <p id="triggeringBulbL1" className="subLabelLarge">
        Autoglide
      </p>
      <p id="triggeringBulbL2" className="subLabelLarge">
        Single
      </p>
      <p id="triggeringBulbL3" className="subLabelLarge">
        Multi
      </p>
    </div>
  );
};

export default Envelopes;
