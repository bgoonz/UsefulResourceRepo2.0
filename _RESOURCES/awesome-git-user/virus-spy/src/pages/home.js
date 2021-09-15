import React from "react";
import WorldTotals from "../components/worldtotals";
import CountryTable from "../components/countryTable";
import WorldMap from "../components/worldmap";
import ChartWrapper from "../components/chartwrapper";
import Header from "../components/header";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <WorldTotals />
      <ChartWrapper />
      <WorldMap />
      <CountryTable />
    </div>
  );
};

export default Home;
