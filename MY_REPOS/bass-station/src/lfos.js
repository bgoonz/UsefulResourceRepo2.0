import { useState, useEffect } from "react";
import "./styles/lFOS.css";
import Knob from "./knob";
import KnobBorder from "./knobBorder";
import Bulb from "./bulb";
import SwitchAB from "./switchAB";

const LFOS = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [lFO1Wave, setLFO1Wave] = useState(patches[patchNumber].lFO1Wave);
  const [lFO1Knob, setLFO1Knob] = useState(patches[patchNumber].lfosLFO1K);
  const [lFO2Knob, setLFO2Knob] = useState(patches[patchNumber].lfosLFO2K);
  const [lFO2Wave, setLFO2Wave] = useState(patches[patchNumber].lFO2Wave);
  const [speedS, setSpeedS] = useState(patches[patchNumber].speedDelayS);

  useEffect(() => {
    setLFO1Wave(patches[patchNumber].lFO1Wave);
    setLFO1Knob(patches[patchNumber].lfosLFO1K);
    setLFO2Knob(patches[patchNumber].lfosLFO2K);
    setLFO2Wave(patches[patchNumber].lFO2Wave);
    setSpeedS(patches[patchNumber].speedDelayS);
  }, [patches, patchNumber]);

  const convertBPM = (position) => {
    return (60 / ((position + 150) * 0.666 + 40)) * 500;
  };

  return (
    <div className="absolute">
      <div
        id="lfosLeftB"
        className="button"
        onClick={() => {
          if (lFO1Wave < 4) {
            setLFO1Wave(lFO1Wave + 1);
            stagingPatch.current.lFO1Wave = lFO1Wave + 1;
          } else {
            setLFO1Wave(1);
            stagingPatch.current.lFO1Wave = 1;
          }
        }}
      />
      <div id="lfosLeftBulb1">
        <Bulb
          blinkClass={lFO1Wave === 1 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(lFO1Knob)}ms linear 0s infinite`}
        />
      </div>
      <div id="lfosLeftBulb2">
        <Bulb
          blinkClass={lFO1Wave === 2 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(lFO1Knob)}ms linear 0s infinite`}
        />
      </div>
      <div id="lfosLeftBulb3">
        <Bulb
          blinkClass={lFO1Wave === 3 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(lFO1Knob)}ms linear 0s infinite`}
        />
      </div>
      <div id="lfosLeftBulb4">
        <Bulb
          blinkClass={lFO1Wave === 4 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(
            lFO1Knob
          )}ms step-start 0s infinite`}
        />
      </div>
      <p id="lfosLeftTriL" className="subLabelSmall">
        V
      </p>
      <p id="lfosLeftSawL1" className="subLabelSmall">
        I
      </p>
      <p id="lfosLeftSawL2" className="subLabelSmall">
        I
      </p>
      <div id="lfosLeftSquareL1" />
      <div id="lfosLeftSquareL2" />
      <p id="lfosLeftSAndHL" className="subLabelSmall">
        S+H
      </p>
      <div id="lfosLFO1K" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={lFO1Knob}
          setRotation={setLFO1Knob}
          setting={"lfosLFO1K"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].lfosLFO1K}
        />
      </div>
      <div id="speedDelayS">
        <SwitchAB
          position={speedS}
          setPosition={setSpeedS}
          orientation={"Vertical"}
          setting={"speedDelayS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <div id="lfosLFO2K" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={lFO2Knob}
          setRotation={setLFO2Knob}
          setting={"lfosLFO2K"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].lfosLFO2K}
        />
      </div>
      <p id="lfosRightTriL" className="subLabelSmall">
        V
      </p>
      <p id="lfosRightSawL1" className="subLabelSmall">
        I
      </p>
      <p id="lfosRightSawL2" className="subLabelSmall">
        I
      </p>
      <div id="lfosRightSquareL1" />
      <div id="lfosRightSquareL2" />
      <p id="lfosRightSAndHL" className="subLabelSmall">
        S+H
      </p>
      <div id="lfosRightBulb1">
        <Bulb
          blinkClass={lFO2Wave === 1 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(lFO2Knob)}ms linear 0s infinite`}
        />
      </div>
      <div id="lfosRightBulb2">
        <Bulb
          blinkClass={lFO2Wave === 2 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(lFO2Knob)}ms linear 0s infinite`}
        />
      </div>
      <div id="lfosRightBulb3">
        <Bulb
          blinkClass={lFO2Wave === 3 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(lFO2Knob)}ms linear 0s infinite`}
        />
      </div>
      <div id="lfosRightBulb4">
        <Bulb
          blinkClass={lFO2Wave === 4 && "lFOSBlink"}
          animation={`lFOSBlink ${convertBPM(
            lFO2Knob
          )}ms step-start 0s infinite`}
        />
      </div>
      <div
        id="lfosRightB"
        className="button"
        onClick={() => {
          if (lFO2Wave < 4) {
            setLFO2Wave(lFO2Wave + 1);
            stagingPatch.current.lFO2Wave = lFO2Wave + 1;
          } else {
            setLFO2Wave(1);
            stagingPatch.current.lFO2Wave = 1;
          }
        }}
      />
      <div id="lfosLeftBracket" />
      <div id="lfosRightBracket" />
      <p id="lfosDelayL" className="subLabelLarge">
        Delay
      </p>
      <p id="lfosSpeedL" className="subLabelLarge">
        Speed
      </p>
      <p id="lfosLFO1L" className="subLabelLarge">
        LFO 1
      </p>
      <p id="lfosLFO2L" className="subLabelLarge">
        LFO 2
      </p>
    </div>
  );
};

export default LFOS;
