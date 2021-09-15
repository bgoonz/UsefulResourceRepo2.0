import "./styles/knobBigBorder.css";

const knobBigBorderArr = [];

for (let i = 0; i < 24; i++) {
  knobBigBorderArr.push(1);
}

const KnobBigBorder = (props) => {
  return (
    <div className="knobBigBorder">
      {knobBigBorderArr.map((dot, idx) => {
        if ((idx + 1) % 2 !== 0) {
          return (
            <div
              className={`knobBigBorderDot knobBigBorder${idx + 1}`}
              style={{ transform: `rotate(${idx * 15}deg)` }}
              key={`knobBigDot${idx}`}
            >
              <div className="knobBigBorderDotDot" />
            </div>
          );
        } else {
          return (
            <div
              className={`knobBigBorderDot knobBigBorder${idx + 1}`}
              style={{ transform: `rotate(${idx * 15}deg)` }}
              key={`knobBigDot${idx}`}
            >
              <div className="knobBigBorderDotDotSmall" />
            </div>
          );
        }
      })}
    </div>
  );
};

export default KnobBigBorder;
