import React from "react";
import Header from "../components/yurakuchotaproomheader";
import "../styles/layout.scss";

const YurakuchoTaproomLayout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default YurakuchoTaproomLayout;
