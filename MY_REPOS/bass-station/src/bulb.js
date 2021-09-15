import "./styles/bulb.css";

const Bulb = (props) => {
  const { on, blinkClass, animation } = props;
  return (
    <div className="absolute">
      {blinkClass ? (
        <div
          className={`bulbMaster ${blinkClass}`}
          style={{ animation: `${animation}` }}
        />
      ) : (
        <div className={`bulbMaster ${on ? "bulbOn" : "bulbOff"}`} />
      )}
    </div>
  );
};

export default Bulb;
