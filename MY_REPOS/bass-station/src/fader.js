import { useRef } from "react";
import "./styles/fader.css";

const Fader = (props) => {
  const { position, setPosition, setting, stagingPatch, originalLevel } = props;
  let faderLineArr = [];
  for (let i = 0; i < 11; i++) {
    faderLineArr.push(1);
  }
  const bigLines = [1, 6, 11];

  let amountBackArrowLight = document.getElementById("amountBackArrowLight");
  let amountForwardArrowLight = document.getElementById(
    "amountForwardArrowLight"
  );

  const faderMaster = useRef(null);
  const faderAdjustActive = useRef(false);
  const clientStart = useRef(0);
  const restingPlace = useRef(position);

  const activateFaderAdjust = (e) => {
    e.preventDefault();
    restingPlace.current = position;
    faderAdjustActive.current = true;
    clientStart.current = e.clientY;
    faderMaster.current.style.cursor = "grabbing";
    amountBackArrowLight = document.getElementById("amountBackArrowLight");
    amountForwardArrowLight = document.getElementById(
      "amountForwardArrowLight"
    );
  };

  const disengageFaderAdjust = () => {
    faderAdjustActive.current = false;
    faderMaster.current.style.cursor = "default";
    restingPlace.current = position;
  };

  const adjustFader = (e) => {
    if (faderAdjustActive.current) {
      let amountMoved = (e.clientY - clientStart.current) * 0.09;
      let moveDifference = amountMoved + restingPlace.current;
      if (moveDifference >= -4.55 && moveDifference <= 4.45) {
        setPosition(moveDifference);
        stagingPatch.current[setting] = moveDifference;
        if (originalLevel > moveDifference) {
          amountForwardArrowLight.className = "amountArrowLightOn";
          amountBackArrowLight.className = "amountArrowLightOff";
        } else if (originalLevel < moveDifference) {
          amountBackArrowLight.className = "amountArrowLightOn";
          amountForwardArrowLight.className = "amountArrowLightOff";
        } else if (originalLevel === moveDifference) {
          amountBackArrowLight.className = "amountArrowLightOff";
          amountForwardArrowLight.className = "amountArrowLightOff";
        }
      }
    }
  };

  return (
    <div
      className="faderMaster"
      onMouseUp={disengageFaderAdjust}
      onMouseLeave={disengageFaderAdjust}
      onMouseMove={adjustFader}
      ref={faderMaster}
    >
      <div className="faderLineBox">
        {faderLineArr.map((line, idx) => {
          if (bigLines.includes(idx + 1)) {
            return <div className="faderLineBig" key={`line${idx}`} />;
          } else {
            return <div className="faderLineSmall" key={`line${idx}`} />;
          }
        })}
      </div>
      <div className="faderTrack">
        <div className="faderTrackSplit" />
        <div
          className="faderNub"
          style={{ transform: `translateY(${position}rem)` }}
        >
          <div className="faderNubTop" onMouseDown={activateFaderAdjust}>
            <div className="faderNubTopLine" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fader;
