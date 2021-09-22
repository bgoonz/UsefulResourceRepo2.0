interface level {
  color: string;
  radius: number;
}

export const markerStatus = (magnitude: number): level => {
  function setMarkerStatus() {
    if (magnitude < 2) {
      return { color: "dodgerblue", radius: 3 };
    } else if (magnitude >= 2 && magnitude < 4) {
      return { color: "yellowgreen", radius: 5 };
    } else if (magnitude >= 4 && magnitude < 6) {
      return { color: "orange", radius: 10 };
    } else if (magnitude >= 6 && magnitude < 8) {
      return { color: "gold", radius: 12 };
    } else {
      return { color: "red", radius: 18 };
    }
  }
  return setMarkerStatus();
};
