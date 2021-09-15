import { useState, useEffect } from "react";
import "./styles/oscillatorsPanel.css";
import Knob from "./knob";
import KnobBorder from "./knobBorder";
import Bulb from "./bulb";
import SwitchAB from "./switchAB";
import SwitchABC from "./switchABC";

const Oscillators = (props) => {
  const { patches, patchNumber, stagingPatch } = props;
  const [coarseKnob, setCoarseKnob] = useState(patches[patchNumber].coarseK);
  const [fineKnob, setFineKnob] = useState(patches[patchNumber].fineK);
  const [mEDKnob, setMEDKnob] = useState(patches[patchNumber].MEDK);
  const [oSCLFO1Knob, setOSCLFO1Knob] = useState(patches[patchNumber].LFO1K);
  const [pulseWidthKnob, setPulseWidthKnob] = useState(
    patches[patchNumber].pulseWidthK
  );
  const [rangeSelection, setRangeSelection] = useState(
    patches[patchNumber].rangeB
  );
  const [waveformSelection, setwaveformSelection] = useState(
    patches[patchNumber].waveformB
  );
  const [oscSelectS, setOscSelectS] = useState(patches[patchNumber].oscSelectS);
  const [mMLS, setMMLS] = useState(patches[patchNumber].pulseWidthS);
  const [octaveSelectS, setOctaveSelectS] = useState(
    patches[patchNumber].subOscOctaveS
  );
  const [subOscWaveS, setSubOscWaveS] = useState(
    patches[patchNumber].subOscWaveS
  );

  useEffect(() => {
    setCoarseKnob(patches[patchNumber].coarseK);
    setFineKnob(patches[patchNumber].fineK);
    setMEDKnob(patches[patchNumber].MEDK);
    setOSCLFO1Knob(patches[patchNumber].LFO1K);
    setPulseWidthKnob(patches[patchNumber].pulseWidthK);
    setRangeSelection(patches[patchNumber].rangeB);
    setwaveformSelection(patches[patchNumber].waveformB);
    setOscSelectS(patches[patchNumber].oscSelectS);
    setMMLS(patches[patchNumber].pulseWidthS);
    setOctaveSelectS(patches[patchNumber].subOscOctaveS);
    setSubOscWaveS(patches[patchNumber].subOscWaveS);
  }, [patches, patchNumber]);

  return (
    <div className="absolute">
      <div id="coarseK" className="knobDiv">
        <KnobBorder highNoon={true} />
        <Knob
          rotation={coarseKnob}
          setRotation={setCoarseKnob}
          setting={"coarseK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].coarseK}
        />
        <p id="coarseKL" className="knobLabel">
          Coarse
        </p>
      </div>
      <div id="fineK" className="knobDiv">
        <KnobBorder highNoon={true} />
        <Knob
          rotation={fineKnob}
          setRotation={setFineKnob}
          setting={"fineK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].fineK}
        />
        <p id="fineKL" className="knobLabel">
          Fine
        </p>
      </div>
      <div id="MEDK" className="knobDiv">
        <KnobBorder highNoon={true} />
        <Knob
          rotation={mEDKnob}
          setRotation={setMEDKnob}
          setting={"MEDK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].MEDK}
        />
        <p id="MEDKL" className="knobLabel">
          Mod Env depth
        </p>
      </div>
      <div id="LFO1K" className="knobDiv">
        <KnobBorder highNoon={true} />
        <Knob
          rotation={oSCLFO1Knob}
          setRotation={setOSCLFO1Knob}
          setting={"LFO1K"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].LFO1K}
        />
        <p id="LFO1KL" className="knobLabel">
          LFO 1 depth
        </p>
      </div>
      <div id="pulseWidthK" className="knobDiv">
        <KnobBorder highNoon={true} />
        <Knob
          rotation={pulseWidthKnob}
          setRotation={setPulseWidthKnob}
          setting={"pulseWidthK"}
          stagingPatch={stagingPatch}
          originalLevel={patches[patchNumber].pulseWidthK}
        />
        <p id="pulseWidthKL" className="knobLabel">
          Pulse Width
        </p>
      </div>
      <div id="picthBox" />
      <div id="pitchBoxBlock" />
      <p id="pitch1L" className="subLabelLarge">
        Pitch
      </p>
      <div id="coarse16Bulb">
        <Bulb on={rangeSelection === 1} />
      </div>
      <div id="coarse8Bulb">
        <Bulb on={rangeSelection === 2} />
      </div>
      <div id="coarse4Bulb">
        <Bulb on={rangeSelection === 3} />
      </div>
      <div id="coarse2Bulb">
        <Bulb on={rangeSelection === 4} />
      </div>
      <p id="coarse16L" className="subLabelSmall">
        16'
      </p>
      <p id="coarse8L" className="subLabelSmall">
        8'
      </p>
      <p id="coarse4L" className="subLabelSmall">
        4'
      </p>
      <p id="coarse2L" className="subLabelSmall">
        2'
      </p>
      <p id="rangeL" className="subLabelSmall">
        Range
      </p>
      <div
        id="rangeB"
        className="button"
        onClick={() => {
          if (rangeSelection < 4) {
            setRangeSelection(rangeSelection + 1);
            stagingPatch.current.rangeB = rangeSelection + 1;
          } else {
            setRangeSelection(1);
            stagingPatch.current.rangeB = 1;
          }
        }}
      />
      <div id="fineSineBulb">
        <Bulb on={waveformSelection === 1} />
      </div>
      <div id="fineTriBulb">
        <Bulb on={waveformSelection === 2} />
      </div>
      <div id="fineSawBulb">
        <Bulb on={waveformSelection === 3} />
      </div>
      <div id="fineSquareBulb">
        <Bulb on={waveformSelection === 4} />
      </div>
      <p id="fineSineL" className="subLabelSmall">
        S
      </p>
      <p id="fineTriL" className="subLabelSmall">
        V
      </p>
      <p id="fineSawL1" className="subLabelSmall">
        I
      </p>
      <p id="fineSawL2" className="subLabelSmall">
        I
      </p>
      <div id="fineSquareL1" />
      <div id="fineSquareL2" />
      <div id="fineSquareL3" />
      <p id="waveformL" className="subLabelSmall">
        Waveform
      </p>
      <div
        id="waveformB"
        className="button"
        onClick={() => {
          if (waveformSelection < 4) {
            setwaveformSelection(waveformSelection + 1);
            stagingPatch.current.waveformB = waveformSelection + 1;
          } else {
            setwaveformSelection(1);
            stagingPatch.current.waveformB = 1;
          }
        }}
      />
      <p id="oscSelectL1" className="subLabelLarge">
        1
      </p>
      <p id="oscSelectL2" className="subLabelLarge">
        2
      </p>
      <p id="oscSelectL3" className="subLabelLarge">
        Osc Select
      </p>
      <div id="oscSelectS">
        <SwitchAB
          orientation={"Horizontal"}
          position={oscSelectS}
          setPosition={setOscSelectS}
          setting={"oscSelectS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <p id="sync12L" className="subLabelLarge">
        Sync 1 - 2
      </p>
      <div id="sync12Bulb">
        <Bulb on={false} />
      </div>
      <p id="pulseWidthL1" className="subLabelLarge">
        Mod Env
      </p>
      <p id="pulseWidthL2" className="subLabelLarge">
        Manual
      </p>
      <div id="pulseWidthLineSplit" />
      <p id="pulseWidthL3" className="subLabelLarge">
        LFO 2
      </p>
      <div id="pulseWidthS">
        <SwitchABC
          orientation="Horizontal"
          position={mMLS}
          setPosition={setMMLS}
          setting={"pulseWidthS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <p id="sync12OnL" className="subLabelLarge">
        On
      </p>
      <div id="subOscBar" />
      <div id="subOscVBar" className="VBarBreak" />
      <p id="subOscL" className="boldLabel2">
        Sub Osc
      </p>
      <div id="subOscOctaveS">
        <SwitchAB
          orientation={"Vertical"}
          position={octaveSelectS}
          setPosition={setOctaveSelectS}
          setting={"subOscOctaveS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <div id="subOscWaveS">
        <SwitchABC
          orientation={"Vertical"}
          position={subOscWaveS}
          setPosition={setSubOscWaveS}
          setting={"subOscWaveS"}
          stagingPatch={stagingPatch}
        />
      </div>
      <p id="subOscOctaveL" className="subLabelLarge">
        Octave
      </p>
      <div id="subOscOctave1B">
        <Bulb on={octaveSelectS === "A"} />
      </div>
      <div id="subOscOctave2B">
        <Bulb on={octaveSelectS === "B"} />
      </div>
      <div id="subOscWave1B">
        <Bulb on={subOscWaveS === "A"} />
      </div>
      <div id="subOscWave2B">
        <Bulb on={subOscWaveS === "B"} />
      </div>
      <div id="subOscWave3B">
        <Bulb on={subOscWaveS === "C"} />
      </div>
      <p id="subOscOctave1L" className="subLabelSmall">
        - 1
      </p>
      <p id="subOscOctave2L" className="subLabelSmall">
        - 2
      </p>
      <p id="subOscSineL" className="subLabelSmall">
        S
      </p>
      <div id="subOscNarrow1L" />
      <div id="subOscNarrow2L" />
      <div id="subOscSquare1L" />
      <div id="subOscSquare2L" />
      <div />
    </div>
  );
};

export default Oscillators;
