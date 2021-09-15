import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/chart.scss";

const Chart = ({ xdata, ydata, setMin, color, xtext, ytext }) => {
  const canvas = useRef(null);

  useEffect(() => {
    const hdata = xdata;
    const vdata = ydata;
    const htext = xtext;
    const vtext = ytext;
    const fillColor = color;
    const minVal = setMin[0] === true ? setMin[1] : d3.min(vdata);
    vdata.length && drawBarChart(hdata, vdata, minVal, fillColor, htext, vtext);
  }, [xdata, ydata, setMin, color, xtext, ytext]);

  const drawBarChart = (hdata, vdata, minVal, fillColor, htext, vtext) => {
    const width = 600;
    const height = 300;
    const margin = {
      left: 90,
      right: 60,
      top: 90,
      bottom: 90,
    };

    var div = d3
      .select(canvas.current)
      .append("div")
      .attr("id", "tooltip")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr(
        "viewBox",
        "0 0 " +
          (width + margin.left + margin.right) +
          " " +
          (height + margin.top + margin.bottom)
      )
      .attr("preserveAspectRatio", "xMinYMin");

    const xscale = d3.scaleBand().domain(hdata).range([0, width]).padding(0.1);

    const xAxis = d3.axisBottom(xscale);

    const bartop = margin.top / 2 + 5;
    const barbase = height + bartop;
    svg
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .style("color", "white")
      .attr("transform", "translate(" + margin.left + "," + barbase + ")")
      .selectAll("text")
      .style("color", "white")
      .style("font", "10px Rubik")
      .attr("y", 0)
      .attr("x", 40)
      .attr("transform", "rotate(90)");
    var ticks = d3.selectAll(".tick text");
    ticks.style("display", (d, i) => {
      return i % 2 ? "none" : "initial";
    });

    svg
      .append("text")
      .attr("x", width / 1.75)
      .attr("y", height + margin.top + 60)
      .attr("fill", `${fillColor}`)
      .text(htext);

    const linearScale = d3
      .scaleLinear()
      .domain([minVal, d3.max(vdata)])
      .range([0, height]);

    const scaledVals = vdata.map(function (item) {
      return linearScale(item);
    });

    const yscale = d3
      .scaleLinear()
      .domain([minVal, d3.max(vdata)])
      .range([height, 0]);

    const yAxis = d3.axisLeft(yscale);

    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .style("color", "white")
      .attr("transform", "translate(" + margin.left + "," + bartop + ")");

    svg
      .append("text")
      .attr("x", -height / 1.15)
      .attr("y", 30)
      .attr("fill", `${fillColor}`)
      .text(vtext)
      .attr("transform", "rotate(-90)");

    svg
      .selectAll("rect")
      .data(scaledVals)
      .enter()
      .append("rect")
      .attr("width", xscale.bandwidth())
      .attr("height", function (d) {
        return d;
      })
      .attr("stroke", "black")
      .attr("stroke-width", "0.25")
      .attr("fill", `${fillColor}`)
      .attr("x", function (d, i) {
        return xscale(hdata[i]) + margin.left;
      })
      .attr("y", function (d, i) {
        return height - d + bartop;
      })
      .on("mouseover", (d, i) => {
        div
          .transition()
          .duration(200)
          .style("width", "100px")
          .style("height", "50px")
          .style("opacity", ".7")
          .style("color", "black")
          .style("background", "lightsteelblue");
        div
          .html(htext + ": " + hdata[i] + "<br>" + vtext + ": " + vdata[i])
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function (d) {
        div.transition().duration(200).style("opacity", 0);
      });
  };

  return (
    <div className="discrete-chart">
      <div className="canvas" ref={canvas}></div>
    </div>
  );
};

export default Chart;
