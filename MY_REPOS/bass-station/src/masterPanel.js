import { useState, useEffect, useRef } from "react";
import Knob from "./knob";
import KnobBorder from "./knobBorder";
import "./styles/masterPanel.css";

const MasterPanel = (props) => {
  const { patchNumber, setPatchNumber, stagingPatch, setPatches, patches } =
    props;

  const [volumeKnob, setVolumeKnob] = useState(patches[patchNumber].volumeK);
  const [savePending, setSavePending] = useState(false);

  const screenNumber1 = useRef(null);
  const screenNumber2 = useRef(null);
  const screenNumber3 = useRef(null);

  const lessThan = useRef(null);
  const greaterThan = useRef(null);

  useEffect(() => {
    setVolumeKnob(patches[patchNumber].volumeK);
  }, [patches, patchNumber]);

  document.addEventListener("click", function (e) {
    if (savePending) {
      if (e.target.id !== "saveBL" && e.target.id !== "saveB") {
        setSavePending(false);
      }
    }
  });

  const save = () => {
    if (!savePending) {
      setSavePending(!savePending);
    } else {
      const newPatch = stagingPatch.current;
      const newPatches = { ...patches };
      newPatches[patchNumber] = newPatch;
      setPatches(newPatches);
      setSavePending(!savePending);
    }
  };

  return (
    <div className="absolute">
      <div id="screen">
        <div id="numberWindow">
          <p id="screenNumbersBack">888</p>
        </div>
        {savePending && <div id="savingDot" />}
        <div id="redPositioner1" className="redPositioner">
          <p
            id="screenNumber1"
            className={`screenNumber ${savePending && "savePending"}`}
            ref={screenNumber1}
          >
            {Math.floor(patchNumber % 10)}
          </p>
        </div>
        <div id="redPositioner2" className="redPositioner">
          <p
            id="screenNumber2"
            className={`screenNumber ${savePending && "savePending"}`}
            ref={screenNumber2}
          >
            {patchNumber >= 10 && Math.floor((patchNumber / 10) % 10)}
          </p>
        </div>
        <div id="redPositioner3" className="redPositioner">
          <p
            id="screenNumber3"
            className={`screenNumber ${savePending && "savePending"}`}
            ref={screenNumber3}
          >
            {patchNumber >= 100 && Math.floor((patchNumber / 100) % 10)}
          </p>
        </div>
        <div id="amountBackArrow" />
        <div id="amountForwardArrow" />
        <div
          id="amountBackArrowLight"
          className="amountArrowLightOff"
          ref={lessThan}
          onAnimationEnd={() => {
            lessThan.current.className = "amountArrowLightOff";
          }}
        />
        <div
          id="amountForwardArrowLight"
          className="amountArrowLightOff"
          ref={greaterThan}
          onAnimationEnd={() => {
            greaterThan.current.className = "amountArrowLightOff";
          }}
        />
      </div>
      <div id="volumeK" className="knobDiv">
        <KnobBorder highNoon={false} />
        <Knob
          rotation={volumeKnob}
          setRotation={setVolumeKnob}
          setting={"volumeK"}
          stagingPatch={stagingPatch}
        />
        <p id="volumeKL" className="knobLabel">
          Volume
        </p>
      </div>
      <p id="novation">novation</p>
      <p id="BSII">BASS STATION II</p>
      <p id="analogue">Analogue Synthesizer</p>
      <div id="patchLine" />
      <div id="patchLineBlock" />
      <p id="patchL" className="buttonLabel">
        Patch
      </p>
      <div id="saveB" className="button" onClick={save}>
        <p id="saveBL" className="buttonLabel" style={{ cursor: "pointer" }}>
          Save
        </p>
      </div>
      <div
        id="backB"
        className="button"
        onClick={() => {
          if (patchNumber > 0) {
            const patchRef = patches[patchNumber - 1];
            const patchClone = { ...patchRef };
            stagingPatch.current = patchClone;
            setPatchNumber(patchNumber - 1);
          }
        }}
      >
        <div id="backArrow" />
      </div>
      <div
        id="forwardB"
        className="button"
        onClick={() => {
          if (patchNumber < 127) {
            const patchRef = patches[patchNumber + 1];
            const patchClone = { ...patchRef };
            stagingPatch.current = patchClone;
            setPatchNumber(patchNumber + 1);
          }
        }}
      >
        <div id="nextArrow" />
      </div>
      <div id="valueLine" />
      <div id="valueLineBlock" />
      <p id="valueL" className="subLabelSmall">
        Value
      </p>
    </div>
  );
};

export default MasterPanel;
