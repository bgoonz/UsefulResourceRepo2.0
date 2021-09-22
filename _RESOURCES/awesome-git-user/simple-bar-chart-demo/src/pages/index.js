import React from "react";
import Layout from "../components/layout";
import Temps from "../components/temps";
import Usage1 from "../components/usage1.mdx";
import Usage2 from "../components/usage2.mdx";

import "./style.css";

const Index = () => {
  return (
    <Layout>
      <div className="container">
        <div className="content">
          <h3 className="post-title">Example Usage - BarChartLinear</h3>
          <small>Published on September 30, 2019</small>
          <div className="markdown">
            <Usage1 />
          </div>
          <div className="chart-one">
            <Temps />
          </div>
          <div className="markdown">
            <Usage2 />
          </div>
        </div>
        <div className="links">
          <h4>Useful Links</h4>
          <ul>
            <li>Data Science Weekly</li>
            <li>Machine Learning Journal</li>
            <li>Python Today</li>
            <li>Woodsborough School of Statistics</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
