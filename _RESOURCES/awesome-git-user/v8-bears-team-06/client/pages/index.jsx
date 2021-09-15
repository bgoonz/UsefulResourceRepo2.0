import React from "react";

import Layout from "../components/layouts/Layout";

const Index = () => (
  <Layout>
    <div className="bg">
      <h1>goodWork</h1>
      <h3>Where charities and volunteers meet!</h3>
      <div className="buttons">
        <button type="button" className="btn btn-success">
          {"I'm a charity"}
        </button>
        <button type="button" className="btn btn-outline-success">
          {"I'm a volunteer"}
        </button>
      </div>
    </div>
    <style>{`
      body, html {
        // height: 100vh;
        // width: 100vw;
      }

      .buttons {
        flex-direction: row;
      }

      .btn-outline-success {
        margin-left: 30px;
      }

      h1 {
        font-size: 64px;
        font-weight: 700;
        margin: 0 0 125px 0;
        color: #2c3e50;
      }

      h3 {
        color: #2c3e50;
        margin-bottom: 40px;
      }

      .bg {
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(../static/leone.jpg);
        height: 100vh;
        min-height: 500px;
        width: 100vw;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        justify-content: center;
        text-align: center;
      }
    `}</style>
  </Layout>
);

export default Index;
