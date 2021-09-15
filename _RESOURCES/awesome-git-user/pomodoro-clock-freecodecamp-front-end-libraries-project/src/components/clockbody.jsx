import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaSkullCrossbones } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import "../styles/clockbody.css";

const ClockBody = () => {
  const alarm = useRef();

  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [remainingTime, setRemainingTime] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("session");
  const [textColor, setTextColor] = useState("long");
  const [warning, setWarning] = useState("off");

  useInterval(
    () => {
      if (isRunning && remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      }
      if (remainingTime < 11) {
        setTextColor("short");
        setWarning("on");
      }
      if (remainingTime === 0) {
        switchMode();
        alarm.current.play();
        setTextColor("long");
        setWarning("off");
      }
    },
    isRunning ? 1000 : null
  );

  useEffect(() => {
    setRemainingTime(remainingTime);
  }, [remainingTime]);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const handleIncrement = (event) => {
    if (!isRunning) {
      if (event.target.value === "s+") {
        if (sessionLength <= 59) {
          setRemainingTime(
            mode === "session" ? (sessionLength + 1) * 60 : remainingTime
          );
          setSessionLength(sessionLength + 1);
        } else {
          setRemainingTime(mode === "session" ? 60 * 60 : remainingTime);
          setSessionLength(60);
        }
      } else {
        if (breakLength <= 59) {
          setRemainingTime(
            mode === "break" ? (breakLength + 1) * 60 : remainingTime
          );
          setBreakLength(breakLength + 1);
        } else {
          setRemainingTime(mode === "break" ? 60 * 60 : remainingTime);
          setBreakLength(60);
        }
      }
    }
  };

  const handleDecrement = (event) => {
    if (!isRunning) {
      if (event.target.value === "s-") {
        if (sessionLength > 1) {
          setRemainingTime(
            mode === "session" ? (sessionLength - 1) * 60 : remainingTime
          );
          setSessionLength(sessionLength - 1);
        } else {
          setRemainingTime(mode === "session" ? 1 * 60 : remainingTime);
          setSessionLength(1);
        }
      } else {
        if (breakLength > 1) {
          setRemainingTime(
            mode === "break" ? (breakLength - 1) * 60 : remainingTime
          );
          setBreakLength(breakLength - 1);
        } else {
          setRemainingTime(mode === "break" ? 1 * 60 : remainingTime);
          setBreakLength(1);
        }
      }
    }
  };

  function timeDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime - minutes * 60;
    return `${minutes < 10 ? `0${minutes.toString()}` : minutes.toString()}:${
      seconds < 10 ? `0${seconds.toString()}` : seconds.toString()
    }`;
  }

  const handleCountdown = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionLength(25);
    setBreakLength(5);
    setRemainingTime(25 * 60);
    setMode("session");
    setTextColor("long");
    setWarning("off");
    alarm.current.pause();
    alarm.current.currentTime = 0;
  };

  function switchMode() {
    setRemainingTime(
      mode === "session" ? breakLength * 60 : sessionLength * 60
    );
    setMode(mode === "session" ? "break" : "session");
  }

  return (
    <div className="clockbody">
      <div className="settings-container">
        <div className="settings">
          <h2 id="session-label" className="label">
            Session Length
          </h2>
          <div className="screen-and-buttons">
            <div id="session-length" className="settings-screen">
              {sessionLength}
            </div>
            <div className="button-wrapper">
              <button
                id="session-increment"
                className="settings-button"
                onClick={handleIncrement}
                value="s+"
              >
                &#43;
              </button>
              <button
                id="session-decrement"
                className="settings-button"
                onClick={handleDecrement}
                value="s-"
              >
                &minus;
              </button>
            </div>
          </div>
        </div>
        <div className="settings">
          <h2 id="break-label" className="label">
            Break Length
          </h2>
          <div className="screen-and-buttons">
            <div id="break-length" className="settings-screen">
              {breakLength}
            </div>
            <div className="button-wrapper">
              <button
                id="break-increment"
                className="settings-button"
                onClick={handleIncrement}
                value="b+"
              >
                {" "}
                &#43;
              </button>
              <button
                id="break-decrement"
                className="settings-button"
                onClick={handleDecrement}
                value="b-"
              >
                &minus;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-display">
        <h1 id="timer-label" className="label">{`${mode
          .charAt(0)
          .toUpperCase()}${mode.slice(1)}`}</h1>
        <div id="time-left" className={`text-${textColor}`}>
          {timeDisplay()}
        </div>
      </div>
      <div className="start-stop">
        <button
          id="start_stop"
          className="action-button"
          onClick={handleCountdown}
        >
          <FaPlay />
          <FaPause />
        </button>
        <button id="reset" className="action-button" onClick={handleReset}>
          <GrPowerReset size={20} />
        </button>
      </div>
      <span className={`warning-${warning}`}>
        <FaSkullCrossbones size={30} />
      </span>
      <audio
        id="beep"
        ref={alarm}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        type="audio"
      />
    </div>
  );
};

export default ClockBody;
