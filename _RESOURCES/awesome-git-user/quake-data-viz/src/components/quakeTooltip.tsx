import "./styles/quakeTooltip.css";

export const QuakeTooltip = ({ x, y, info }: { x: any; y: any; info: any }) => {
  console.log(x);
  console.log(y);
  return (
    <foreignObject
      className="tooltip"
      x={x}
      y={y}
      width={100}
      height={65}
      fontSize=".5em"
    >
      <div className="quake-tooltip-main">
        <p>
          <strong>magnitude:</strong> {info.mag}
        </p>
        <p>
          <strong>epicenter:</strong> {info.place}
        </p>
        <p>
          <strong>when:</strong> {new Date(info.time).toLocaleString()}
        </p>
      </div>
    </foreignObject>
  );
};
