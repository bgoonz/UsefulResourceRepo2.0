import React from "react";
import Header from "../components/taproomheader";
import "../styles/layout.scss";

const TaproomLayout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default TaproomLayout;
