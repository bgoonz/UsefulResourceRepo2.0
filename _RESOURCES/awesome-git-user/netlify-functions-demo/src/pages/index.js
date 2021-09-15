import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/index.css";

const Index = () => {
  return (
    <div className="index">
      <Header />
      <div className="main">
        <h1>The List</h1>
        <div>
          <p>List Item 1</p>
          <p>List Item 2</p>
          <p>List Item 3</p>
          <p>List Item 4</p>
          <p>List Item 5</p>
          <p>List Item 6</p>
          <p>List Item 7</p>
          <p>List Item 8</p>
          <p>List Item 9</p>
          <p>List Item 10</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
