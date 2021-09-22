import React from "react";
import Layout from "../components/layout";
import "./pageStyles.css";

const Index = () => {
  return (
    <Layout>
      <div className="container">
        <div className="box" id="one">
          box1
        </div>
        <div className="box" id="two">
          box2
        </div>
        <div className="box" id="three">
          box3
        </div>
        <div className="box" id="four">
          box4
        </div>
        <div className="box" id="five">
          box5
        </div>
        <div className="box" id="six">
          box6
        </div>
      </div>
    </Layout>
  );
};

export default Index;
