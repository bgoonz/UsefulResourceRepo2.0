import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "./styles/chart.css";

export const Chart = ({ name, quakes }: { name: string; quakes: any }) => {
  const chartCanvas = useRef(null);
  const [bins, setBins] = useState([]);
  const [dates, setDates] = useState([]);
  const [quakeCounts, setQuakeCounts] = useState([]);
  const daysKey: any = [];

  for (let i = 0; i < 7; i++) {
    daysKey[i] = {
      date: new Date(Date.now() - 86400 * 1000 * i).getDate(),
      count: 0,
      month: new Date(Date.now() - 86400 * 1000 * i).getMonth() + 1,
    };
  }

  quakes.forEach((quake: any) => {
    for (let i = 0; i < 7; i++) {
      if (new Date(quake.properties.time).getDate() === daysKey[i].date) {
        daysKey[i] = {
          date: daysKey[i].date,
          count: daysKey[i].count + 1,
          month: daysKey[i].month,
        };
      }
    }
  });

  useEffect(() => {
    setBins(daysKey);
    const datesArray = daysKey.map((day: any) => {
      return `${day.month}/${day.date}`;
    });
    const countsArray = daysKey.map((day: any) => {
      return day.count;
    });
    setDates(datesArray);
    setQuakeCounts(countsArray);
  }, [quakes]);

  useEffect(() => {
    drawChart();
  }, [quakeCounts]);

  const drawChart = () => {
    const width = 500;
    const height = 300;
    const margin = {
      left: 90,
      right: 60,
      top: 90,
      bottom: 90,
    };

    d3.select(".chartCanvas").remove();

    const svg = d3
      .select(chartCanvas.current)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("class", "chartCanvas")
      .attr(
        "viewBox",
        "0 0 " +
          (width + margin.left + margin.right) +
          " " +
          (height + margin.top + margin.bottom)
      )
      .attr("preserveAspectRatio", "xMinYMin");

    const xscale = d3.scaleBand().domain(dates).range([0, width]).padding(0.1);

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
      .style("font", "22px Rubik")
      .attr("y", 20)
      .attr("x", 0)
      .attr("transform", "rotate(0)");
    var ticks = d3.selectAll(".tick text");
    ticks.style("display", (d, i) => {
      return i % 1 ? "none" : "initial";
    });

    svg
      .append("text")
      .attr("x", width / 1.75)
      .attr("y", height + margin.top + 40)
      .style("font", "22px Rubik")
      .attr("fill", `goldenrod`)
      .text("date");

    const linearScale = d3
      .scaleLinear()
      .domain([0, d3.max(quakeCounts)])
      .range([0, height]);

    const scaledVals = quakeCounts.map(function (item) {
      return linearScale(item);
    });

    const yscale = d3
      .scaleLinear()
      .domain([0, d3.max(quakeCounts)])
      .range([height, 0]);

    const yAxis = d3.axisLeft(yscale);

    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .style("color", "white")
      .attr("transform", "translate(" + margin.left + "," + bartop + ")")
      .selectAll("text")
      .style("color", "white")
      .style("font", "22px Rubik");

    svg
      .append("text")
      .attr("x", -height / 1.15)
      .attr("y", 20)
      .style("font", "22px Rubik")
      .attr("fill", `goldenrod`)
      .text("number of quakes")
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
      .attr("fill", `red`)
      .attr("x", function (d, i) {
        return xscale(dates[i]) + margin.left;
      })
      .attr("y", function (d, i) {
        return height - d + bartop;
      });
  };

  return (
    <div className="chart">
      <h3>
        Last 7 Days by State: <span style={{ color: "gray" }}> {name}</span>
      </h3>
      <div className="chart-wrapper" ref={chartCanvas}></div>
    </div>
  );
};
