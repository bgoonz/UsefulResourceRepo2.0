import React from "react";
import WorldTotal from "../data/world/worldtotal.json";
import "../styles/worldtotals.scss";

const WorldTotals = () => {
  return (
    <div className="worldtotals">
      <div className="totals-wrap">
        <h3 className="world-total">
          Total Confirmed Cases Worldwide:{" "}
          <span className="total-number">
            {WorldTotal[0].totalConfirmedCases}
          </span>
        </h3>
        <small>
          <span>{WorldTotal[0].newCases}</span> new cases
        </small>
        <small>
          {new Date().getMonth() + 1}/{new Date().getDate()}/
          {new Date().getFullYear()} (Tokyo)
        </small>
      </div>
      <div className="totals-wrap">
        <h3 className="world-total">
          Total Deaths Worldwide:{" "}
          <span className="total-number">{WorldTotal[0].totalDeaths}</span>
        </h3>
        <small>
          <span>{WorldTotal[0].newDeaths}</span> new deaths
        </small>
        <small>
          {new Date().getMonth() + 1}/{new Date().getDate()}/
          {new Date().getFullYear()} (Tokyo)
        </small>
      </div>
    </div>
  );
};

export default WorldTotals;
