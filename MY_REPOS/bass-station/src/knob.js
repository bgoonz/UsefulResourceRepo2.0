import { knobSpin, knobSpinNotch } from "./knobSpin";
import "./styles/knob.css";

let knobTicArr = [];

for (let i = 0; i < 18; i++) {
  knobTicArr.push(1);
}

const Knob = (props) => {
  const { rotation, setRotation, notch, setting, stagingPatch, originalLevel } =
    props;

  let shadowRotation = 0;
  if (rotation > 0) {
    shadowRotation = -Math.abs(rotation);
  } else {
    shadowRotation = Math.abs(rotation);
  }

  const activateKnobAdjust = (e) => {
    e.preventDefault();
    if (notch === undefined) {
      knobSpin(e, rotation, setRotation, setting, stagingPatch, originalLevel);
    } else {
      knobSpinNotch(
        e,
        rotation,
        setRotation,
        notch,
        setting,
        stagingPatch,
        originalLevel
      );
    }
  };

  return (
    <div
      className="knobMaster"
      onMouseDown={activateKnobAdjust}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className="knobMasterShadow"
        style={{ transform: `rotate(${shadowRotation}deg)` }}
      />
      {knobTicArr.map((tic, idx) => (
        <div
          className={`knobTics KnobTic${idx + 1}`}
          style={{ transform: `rotate(${idx * 20}deg)` }}
          key={`knobTic${idx}`}
        >
          <div className="knobTic" />
        </div>
      ))}
      <div className="knobRise">
        <div
          className="knobUpperShadow"
          style={{ transform: `rotate(${shadowRotation}deg)` }}
        />
        <div className="knobWhite">
          <div className="knobTicWhite" />
        </div>
      </div>
    </div>
  );
};

export default Knob;
