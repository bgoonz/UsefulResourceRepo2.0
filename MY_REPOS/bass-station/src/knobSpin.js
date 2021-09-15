export const knobSpin = (
  e,
  rotation,
  setRotation,
  setting,
  stagingPatch,
  originalLevel
) => {
  let clientStart = null;

  const amountBackArrowLight = document.getElementById("amountBackArrowLight");
  const amountForwardArrowLight = document.getElementById(
    "amountForwardArrowLight"
  );

  clientStart = e.clientX;
  const appContainer = document.getElementById("appContainer");
  appContainer.style.cursor = "grabbing";
  document.addEventListener("mousemove", function (e) {
    let amountToMove = (e.clientX - clientStart) * 2;
    let moveDifference = rotation + amountToMove;
    if (
      clientStart !== null &&
      moveDifference <= 150 &&
      moveDifference >= -150
    ) {
      setRotation(moveDifference);
      stagingPatch.current[setting] = moveDifference;
      if (originalLevel > moveDifference) {
        amountForwardArrowLight.className = "amountArrowLightOff";
        amountBackArrowLight.className = "amountArrowLightOn";
      } else if (originalLevel < moveDifference) {
        amountBackArrowLight.className = "amountArrowLightOff";
        amountForwardArrowLight.className = "amountArrowLightOn";
      } else if (originalLevel === moveDifference) {
        amountBackArrowLight.className = "amountArrowLightOff";
        amountForwardArrowLight.className = "amountArrowLightOff";
      }
    }
  });
  document.addEventListener("mouseup", function () {
    clientStart = null;
    appContainer.style.cursor = "default";
  });
};

export const knobSpinNotch = (
  e,
  rotation,
  setRotation,
  notches,
  setting,
  stagingPatch,
  originalLevel
) => {
  const notchKey = {
    4: 15,
    8: 135,
  };
  let clientStart = null;

  const amountBackArrowLight = document.getElementById("amountBackArrowLight");
  const amountForwardArrowLight = document.getElementById(
    "amountForwardArrowLight"
  );

  clientStart = e.clientX;
  const appContainer = document.getElementById("appContainer");
  appContainer.style.cursor = "grabbing";
  document.addEventListener("mousemove", function (e) {
    let amountToMove = (e.clientX - clientStart) * 2;
    let moveDifference = rotation + amountToMove;
    if (
      clientStart !== null &&
      moveDifference <= notchKey[notches] &&
      moveDifference >= -90
    ) {
      let notchedMovement = Math.floor(moveDifference / 30) * 30;
      setRotation(notchedMovement);
      stagingPatch.current[setting] = notchedMovement;
      if (originalLevel > notchedMovement) {
        amountForwardArrowLight.className = "amountArrowLightOff";
        amountBackArrowLight.className = "amountArrowLightOn";
      } else if (originalLevel < notchedMovement) {
        amountBackArrowLight.className = "amountArrowLightOff";
        amountForwardArrowLight.className = "amountArrowLightOn";
      } else if (originalLevel === notchedMovement) {
        amountBackArrowLight.className = "amountArrowLightOff";
        amountForwardArrowLight.className = "amountArrowLightOff";
      }
    }
  });
  document.addEventListener("mouseup", function () {
    clientStart = null;
    appContainer.style.cursor = "default";
  });
};
