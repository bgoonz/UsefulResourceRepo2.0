import "./styles/switchABC.css";

const SwitchABC = (props) => {
  const { orientation, position, setPosition, setting, stagingPatch } = props;
  const key = {
    A: "switchABCKnobPosA",
    B: "switchABCKnobPosB",
    C: "switchABCKnobPosC",
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
          if (position === "A") {
            setPosition("B");
            stagingPatch.current[setting] = "B";
          } else if (position === "B") {
            setPosition("C");
            stagingPatch.current[setting] = "C";
          }
        } else if (position === "C") {
          setPosition("B");
          stagingPatch.current[setting] = "B";
        } else {
          setPosition("A");
          stagingPatch.current[setting] = "A";
        }
      } else {
        if (e.clientX > mouseStartingPos) {
          if (position === "A") {
            setPosition("B");
            stagingPatch.current[setting] = "B";
          } else if (position === "B") {
            setPosition("C");
            stagingPatch.current[setting] = "C";
          }
        } else if (position === "C") {
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
    <div className="switchABCMaster">
      <div className="switchABCRounder">
        <div className="swtchABCTrack">
          <div
            className={`switchABCKnob ${key[position]}`}
            onMouseDown={switchMouseDown}
            onMouseLeave={switchMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default SwitchABC;
