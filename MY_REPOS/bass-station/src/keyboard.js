import "./styles/keyboard.css";
import WhiteKey from "./whiteKey";
import BlackKey from "./blackKey";

const Keyboard = () => {
  let whiteKeyArr = [];
  for (let i = 0; i < 15; i++) {
    whiteKeyArr.push(1);
  }
  return (
    <div id="keyboardMaster">
      <div id="keyboardDownSlope" />
      <div id="keyContainer">
        {whiteKeyArr.map((key, idx) => (
          <WhiteKey key={`whiteKey${idx}`} />
        ))}
      </div>
      <div id="BK1">
        <BlackKey />
      </div>
      <div id="BK2">
        <BlackKey />
      </div>
      <div id="BK3">
        <BlackKey />
      </div>
      <div id="BK4">
        <BlackKey />
      </div>
      <div id="BK5">
        <BlackKey />
      </div>
      <div id="BK6">
        <BlackKey />
      </div>
      <div id="BK7">
        <BlackKey />
      </div>
      <div id="BK8">
        <BlackKey />
      </div>
      <div id="BK9">
        <BlackKey />
      </div>
      <div id="BK10">
        <BlackKey />
      </div>
    </div>
  );
};

export default Keyboard;
