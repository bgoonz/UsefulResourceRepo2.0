import "./styles/knobBorder.css";

const knobBorderArr = [];

for (let i = 0; i < 12; i++) {
  knobBorderArr.push(1);
}

const KnobBorder = (props) => {
  const remove = props.remove || [];
  return (
    <div className="knobBorder">
      {knobBorderArr.map((dot, idx) => {
        if (remove.includes(idx)) {
          return (
            <div
              className={`knobBorderDot knobBorder${idx + 1}`}
              style={{ transform: `rotate(${idx * 30}deg)` }}
              key={`knobDot${idx}`}
            >
              <div className="knobBorderDotDot" style={{ display: "none" }} />
            </div>
          );
        } else if (props.highNoon & (idx === 0)) {
          return (
            <div
              className={`knobBorderDot knobBorder${idx + 1}`}
              style={{ transform: `rotate(${idx * 30}deg)` }}
              key={`knobDot${idx}`}
            >
              <div className="highNoon" />
            </div>
          );
        } else {
          return (
            <div
              className={`knobBorderDot knobBorder${idx + 1}`}
              style={{ transform: `rotate(${idx * 30}deg)` }}
              key={`knobDot${idx}`}
            >
              <div className="knobBorderDotDot" />
            </div>
          );
        }
      })}
    </div>
  );
};

export default KnobBorder;
