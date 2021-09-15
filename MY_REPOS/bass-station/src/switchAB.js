import "./styles/switchAB.css";

const SwitchAB = (props) => {
  const { orientation, position, setPosition, setting, stagingPatch } = props;
  const key = {
    A: "switchABKnobPosA",
    B: "switchABKnobPosB",
  };

  let mouseStartingPos = null;

  const switchMouseDown = (e) => {
    e.preventDefault();
    if (orientation === "Vertical") {
      mouseStartingPos = e.clientY;
    } else {
      mouseStartingPos = e.clientX;
    }
  };

  const switchMouseLeave = (e) => {
    e.preventDefault();
    if (mouseStartingPos !== null) {
      if (orientation === "Vertical") {
        if (e.clientY > mouseStartingPos) {
          setPosition("B");
          stagingPatch.current[setting] = "B";
        } else {
          setPosition("A");
          stagingPatch.current[setting] = "A";
        }
      } else {
        if (e.clientX > mouseStartingPos) {
          setPosition("B");
          stagingPatch.current[setting] = "B";
        } else {
          setPosition("A");
          stagingPatch.current[setting] = "A";
        }
      }
    }
    mouseStartingPos = null;
  };

  return (
    <div className="switchABMaster">
      <div className="switchABRounder">
        <div className="swtchABTrack">
          <div
            className={`switchABKnob ${key[position]}`}
            onMouseDown={switchMouseDown}
            onMouseLeave={switchMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default SwitchAB;
