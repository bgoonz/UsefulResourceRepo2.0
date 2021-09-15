import React from "react";
import Header from "../components/header";
import Plot from "../components/plots/simpleFunction";
import "../styles/functions.css";

const Functions = () => {
  const xlow = -5;
  const xhigh = 5;
  let xcount = -5;
  const n = 1000;
  const f = (x) => {
    return Math.sin(x);
  };
  let xstep = (xhigh - xlow) / n;
  const xvals = [];
  for (let i = 0; i < n; i++) {
    xvals.push(xcount);
    xcount = xcount + xstep;
  }

  return (
    <div className="functions">
      <Header />
      <div className="fp-main">
        <Plot
          xdim={600}
          ydim={400}
          xdomain={[-5, 5]}
          ydomain={[-1, 1]}
          xstep={1}
          ystep={0.2}
          xdata={xvals}
          margin={{
            top: 40,
            bottom: 40,
            left: 60,
            right: 60,
          }}
          input_func={f}
        />
      </div>
    </div>
  );
};

export default Functions;
