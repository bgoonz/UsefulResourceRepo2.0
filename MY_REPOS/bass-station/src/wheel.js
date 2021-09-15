import "./styles/wheel.css";

const Wheel = (props) => {
  const wheelAdjust = (e) => {
    e.preventDefault();

    let clientStart = null;

    clientStart = e.clientY;
    const appContainer = document.getElementById("appContainer");
    appContainer.style.cursor = "grabbing";
    document.addEventListener("mousemove", function (e) {
      let amountToMove = (e.clientY - clientStart) * 0.06;
      let moveDifference = props.position + amountToMove;
      if (
        clientStart !== null &&
        moveDifference <= 7.5 &&
        moveDifference >= 0
      ) {
        props.setPosition(moveDifference);
      }
    });
    document.addEventListener("mouseup", function () {
      clientStart = null;
      appContainer.style.cursor = "default";
      if (props.type === "Pitch") {
        props.setPosition(3.75);
      }
    });
  };
  return (
    <div className="wheelMaster">
      <div className="wheel">
        <div
          className="wheelNotch"
          style={{ transform: `translateY(${props.position}rem)` }}
        />
        <div className="wheelShadow" />
        <div
          className="wheelNotchGrab"
          style={{ transform: `translateY(${props.position}rem)` }}
          onMouseDown={wheelAdjust}
        />
      </div>
    </div>
  );
};

export default Wheel;
