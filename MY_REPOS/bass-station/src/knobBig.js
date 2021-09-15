import { knobSpin } from "./knobSpin";
import "./styles/knobBig.css";

let knobBigTicArr = [];

for (let i = 0; i < 40; i++) {
  knobBigTicArr.push(1);
}

const KnobBig = (props) => {
  const { rotation, setRotation, setting, stagingPatch, originalLevel } = props;

  let shadowRotation = 0;
  if (rotation > 0) {
    shadowRotation = -Math.abs(rotation);
  } else {
    shadowRotation = Math.abs(rotation);
  }

  const activateKnobAdjust = (e) => {
    e.preventDefault();
    knobSpin(e, rotation, setRotation, setting, stagingPatch, originalLevel);
  };

  return (
    <div
      className="knobBigMaster"
      onMouseDown={activateKnobAdjust}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className="knobBigMasterShadow"
        style={{ transform: `rotate(${shadowRotation}deg)` }}
      />
      {knobBigTicArr.map((tic, idx) => (
        <div
          className={`knobBigTics knobBigTic${idx + 1}`}
          style={{ transform: `rotate(${idx * 9}deg)` }}
          key={`knobBigTic${idx}`}
        >
          <div className="knobBigTic" />
        </div>
      ))}
      <div className="knobBigRise">
        <div
          className="knobBigUpperShadow"
          style={{ transform: `rotate(${shadowRotation}deg)` }}
        />
        <div className="knobBigWhite">
          <div className="knobBigTicWhite" />
        </div>
      </div>
    </div>
  );
};

export default KnobBig;
