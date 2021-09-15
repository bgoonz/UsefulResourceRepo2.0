import React from "react";
import Layout from "../components/layout";
import { BarChart, BarChartNeg } from "@willjw3/simple-bar-chart";
import Usage3 from "../components/usage3.mdx";

import "./style.css";

const ExampleChart = () => {
  const independent = [0, 1, 2, 3, 4, 5, 6, 7];
  const dependent = [6, 3, 7, 1, 4, 10, 17, 8];
  const dependentNegVals = [6, -3, 7, 1, -4, 10, 17, 8];
  return (
    <Layout>
      <div>
        <div className="example-header">
          <h2>More Example Charts</h2>
        </div>
        <div className="wrapper">
          <BarChart
            horizontal={independent}
            vertical={dependent}
            margin={{
              top: 60,
              bottom: 60,
              right: 60,
              left: 60,
            }}
            width={600}
            height={400}
            barColor={"tomato"}
            barBorder={"transparent"}
            spaceBetween={0.1}
            horizontalText={{
              text: "Independent Variable Values",
              color: "rebeccapurple",
              space: 20,
              fromLeft: 225,
            }}
            verticalText={{
              text: "Dependent Variable Values",
              color: "rebeccapurple",
              space: 28,
              fromTop: -350,
            }}
            setMin={[true, 0]}
            title={{
              text: "Example Chart",
              color: "rebeccapurple",
              fromLeft: 300,
            }}
            chartBackground={"white"}
            tooltip={{
              x: "x-value",
              y: "y-value",
              background: "lightsteelblue",
              color: "black",
              opacity: "0.7",
              width: "160px",
              height: "30px",
              xshift: 18,
              yshift: 44,
            }}
          />
        </div>
        <div className="wrapper">
          <BarChartNeg
            horizontal={independent}
            vertical={dependentNegVals}
            margin={{
              top: 60,
              bottom: 260,
              right: 60,
              left: 60,
            }}
            width={600}
            height={400}
            barColor={"purple"}
            barBorder={"transparent"}
            spaceBetween={0.1}
            horizontalText={{
              text: "",
              color: "rebeccapurple",
              space: 20,
              fromLeft: 225,
            }}
            verticalText={{
              text: "Dependent Variable Values",
              color: "rebeccapurple",
              space: 28,
              fromTop: -350,
            }}
            setMin={[true, 0]}
            title={{
              text: "Example Chart With Negative Values",
              color: "rebeccapurple",
              fromLeft: 200,
            }}
            chartBackground={"gold"}
            tooltip={{
              x: "x-value",
              y: "y-value",
              background: "lightsteelblue",
              color: "black",
              opacity: "0.7",
              width: "160px",
              height: "30px",
              xshift: 18,
              yshift: 44,
            }}
          />
        </div>
        <div className="content">
          <Usage3 />
        </div>
      </div>
    </Layout>
  );
};

export default ExampleChart;
