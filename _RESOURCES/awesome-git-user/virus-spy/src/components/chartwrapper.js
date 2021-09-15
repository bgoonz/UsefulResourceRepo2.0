import React from "react";
import Chart from "./chart";
import WorldChartData from "../data/chart/chartdata.json";
import "../styles/chartwrapper.scss";

const ChartWrapper = () => {
  const dates = WorldChartData.map((date) => {
    return date.date;
  });
  const cases = WorldChartData.map((date) => {
    return Number(date.cases);
  });
  const deaths = WorldChartData.map((date) => {
    return Number(date.deaths);
  });

  return (
    <div className="chart-wrapper">
      <div className="chart-box">
        <Chart
          xdata={dates}
          ydata={cases}
          setMin={[true, 0]}
          color="yellow"
          xtext="Date"
          ytext="Number of Cases"
        />
      </div>
      <div className="chart-box">
        <Chart
          xdata={dates}
          ydata={deaths}
          setMin={[true, 0]}
          color="red"
          xtext="Date"
          ytext="Number of Deaths"
        />
      </div>
    </div>
  );
};

export default ChartWrapper;
