import React, { useState, useEffect, useRef } from "react";
import Circle from "../elements/hideableCircle";
import PlotValueBox from "../features/plotValueBox";
import * as d3 from "d3";

const SimpleFunction = ({
  xdim,
  ydim,
  xdomain,
  ydomain,
  xstep,
  ystep,
  xdata,
  dimensions,
  margin,
  input_func,
}) => {
  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  const [scaledX, setScaledX] = useState("0");
  const [scaledY, setScaledY] = useState("0");
  const [showCircle, setShowCircle] = useState(false);

  const canvas = useRef(null);

  useEffect(() => {
    let svg = d3.select(canvas.current);

    addAxes(svg);
    addFunction(svg);
  }, [xdim, ydim, xdomain, ydomain, xstep, ystep, xdata, margin, input_func]);

  const addAxes = (svg) => {
    const xscale = d3
      .scaleLinear()
      .domain([xdomain[0], xdomain[1]])
      .range([margin.left, xdim + margin.left]);

    const xAxis = d3.axisBottom(xscale);
    xAxis.tickValues(d3.range(xdomain[0], xdomain[1] + xstep, xstep));

    svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        `translate(0, ${(ydim + margin.top + margin.bottom) / 2})`
      );

    const yscale = d3
      .scaleLinear()
      .domain([ydomain[0], ydomain[1]])
      .range([margin.top + ydim, margin.top]);

    const yAxis = d3.axisLeft(yscale);
    yAxis.tickValues(d3.range(ydomain[0], ydomain[1] + ystep, ystep));

    svg
      .append("g")
      .call(yAxis)
      .attr(
        "transform",
        `translate(${(margin.left + xdim + margin.right) / 2},0)`
      );
  };

  const addFunction = (svg) => {
    var curveGenerator = d3.line().curve(d3.curveCardinal);

    var pathData = curveGenerator(points);

    var path = svg
      .append("path")
      .attr("d", pathData)
      .attr("stroke", "black")
      .attr("fill", "none");

    var pathEl = path.node();
    var pathLength = pathEl.getTotalLength();

    svg.on("mousemove", function () {
      setShowCircle(true);
      var x = d3.mouse(canvas.current)[0];
      var beginning = x - margin.left,
        end = pathLength,
        target;
      var pos = {};
      while (true) {
        target = Math.floor((beginning + end) / 2);
        pos = pathEl.getPointAtLength(target);
        if ((target === end || target === beginning) && pos.x !== x) {
          break;
        }
        if (pos.x > x) end = target;
        else if (pos.x < x) beginning = target;
        else break; //position found
      }
      setX(pos.x);
      setY(pos.y);
      setScaledX(Math.floor(((pos.x - b) / m) * 100) / 100);
      setScaledY(Math.floor(input_func((pos.x - b) / m) * 100) / 100);
    });
    svg.on("mouseout", () => {
      setShowCircle(false);
    });
  };

  const ydata = xdata.map((val) => {
    return input_func(val);
  });

  const xlinearScale = d3
    .scaleLinear()
    .domain([d3.min(xdata), d3.max(xdata)])
    .range([margin.left, xdim + margin.left]);

  const ylinearScale = d3
    .scaleLinear()
    .domain([d3.min(ydata), d3.max(ydata)])
    .range([ydim + margin.top, margin.top]);

  const xscaledVals = xdata.map((xval) => {
    return xlinearScale(xval);
  });

  const yscaledVals = ydata.map((yval) => {
    return ylinearScale(yval);
  });

  const points = xscaledVals.map((elem, i) => {
    return [elem, yscaledVals[i]];
  });
  let m = (xscaledVals[10] - xscaledVals[0]) / (xdata[10] - xdata[0]);
  let b = xscaledVals[0] - m * xdata[0];

  return (
    <div id="simplefunction" className="simplefunction">
      <svg
        viewBox={`0 0 ${xdim + margin.left + margin.right} ${
          ydim + margin.top + margin.bottom
        }`}
        preserveAspectRatio="xMinYMin"
        ref={canvas}
        style={{ background: "beige" }}
        width={xdim + margin.left + margin.right}
        height={ydim + margin.top + margin.bottom}
      >
        <Circle
          x={x}
          y={y}
          r="10"
          show={showCircle}
          color="dodgerblue"
          opacity={1}
          border="black"
          border_width="2"
        />
        <PlotValueBox x={scaledX} y={scaledY} />
      </svg>
    </div>
  );
};

export default SimpleFunction;
