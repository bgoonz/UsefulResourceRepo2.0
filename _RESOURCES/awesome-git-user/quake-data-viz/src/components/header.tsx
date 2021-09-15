import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import "./styles/header.css";

export const Header = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const legendColors = ["dodgerblue", "yellowgreen", "orange", "gold", "red"];

    function drawLegend() {
      const legend = d3
        .select(canvas.current)
        .append("svg")
        .attr("width", "410px")
        .attr("height", "80px");

      const xscale = d3.scaleLinear().domain([0, 10]).range([0, 350]);

      const xAxis = d3.axisBottom(xscale).tickValues([0, 2, 4, 6, 8, 10]);

      legend.append("g").call(xAxis).attr("transform", "translate(50, 50)");

      legend
        .selectAll("rect")
        .data(legendColors)
        .enter()
        .append("g")
        .append("rect")
        .attr("width", "70px")
        .attr("height", "10px")
        .attr("y", 35)
        .attr("x", function (d, i) {
          return 50 + 70 * i;
        })
        .attr("fill", function (d, i) {
          return d;
        });
    }
    drawLegend();
  }, []);

  return (
    <div className="header">
      <div id="title">
        <Link to="/">
          <h1 className="siteTitle">Quake Data Viz US</h1>
        </Link>
      </div>
      <div className="legend-wrapper">
        <p>magnitude</p>
        <div id="legend" ref={canvas}></div>
      </div>
    </div>
  );
};
