import React, { useState, useEffect } from "react";

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null,
};

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [location, setLocation] = useState(initialLocationState);
  let mounted = true;
  useEffect(() => {
    document.title = `I was clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleNetworkOnline);
    window.addEventListener("offline", handleNetworkOffline);
    navigator.geolocation.getCurrentPosition(handleLocation);
    const watchId = navigator.geolocation.watchPosition(handleLocation);
    return () => {
      window.removeEventListener("online", handleNetworkOnline);
      window.removeEventListener("offline", handleNetworkOffline);
      window.removeEventListener("mousemove", handleMouseMove);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };
  }, [count]);

  const handleLocation = (event) => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
      });
    }
  };

  const handleNetworkOnline = () => {
    setNetworkStatus(true);
  };

  const handleNetworkOffline = () => {
    setNetworkStatus(false);
  };

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const increaseCounter = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const toggleBulb = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={increaseCounter}>I was clicked {count} times</button>

      <h2>Toggle light</h2>
      <div
        onClick={toggleBulb}
        style={{
          height: "50px",
          width: "50px",
          background: isOn ? "yellow" : "grey",
        }}
      />

      <h2>Mouse position</h2>
      <p>{JSON.stringify(mousePosition, null, 2)}</p>

      <h2>Network Status</h2>
      <p>
        You are <b>{networkStatus ? "online" : "offline"}</b>
      </p>

      <h2>Geolocation</h2>
      <p>Latitude is {location.latitude}</p>
      <p>Longitude is {location.longitude}</p>
      <p>Speed is {location.speed ? location.speed : 0}</p>
    </>
  );
};

export default App;
