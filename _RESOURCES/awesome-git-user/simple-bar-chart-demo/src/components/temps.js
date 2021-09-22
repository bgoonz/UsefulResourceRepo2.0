import React from "react";
import { BarChartLinear } from "@willjw3/simple-bar-chart";
import globaldata from "../../data/globaltemp.json";

const Temps = () => {
  const tempsraw = Object.entries(globaldata.data);
  const years = tempsraw.map((entry) => {
    return entry[0].slice(0, 4);
  });
  const temps = tempsraw.map((entry) => {
    return entry[1].value;
  });
  console.log(tempsraw);
  console.log(years);
  console.log(temps);
  return (
    <div className="temp-chart">
      <BarChartLinear
        horizontal={years}
        vertical={temps}
        margin={{
          top: 90,
          bottom: 60,
          right: 60,
          left: 60,
        }}
        width={800}
        height={400}
        barColor={`lightgreen`}
        barBorder={`black`}
        horizontalText={{
          text: "Year (Starting from 1895)",
          color: "yellow",
          space: 20,
          fromLeft: 300,
        }}
        verticalText={{
          text: "Average Temperature",
          color: "yellow",
          space: 15,
          fromTop: -350,
        }}
        setMin={[false, 0]}
        title={{
          text: "Contiguous U.S., Average Temperature, January-December in Degrees Fahrenheit",
          color: "yellow",
          fromLeft: 150,
        }}
        chartBackground={"darkgray"}
        tooltip={{
          x: "Year",
          y: "Avg. Temperature",
          background: "steelblue",
          color: "black",
          opacity: "0.7",
          width: "160px",
          height: "30px",
          xshift: 18,
          yshift: 44,
        }}
      />
    </div>
  );
};

export default Temps;
