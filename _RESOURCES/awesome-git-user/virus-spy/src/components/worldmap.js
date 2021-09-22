import React, { useState, useEffect } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import CovidCountryData from "../data/country/covid19.json";
import "../styles/worldmap.scss";

const WorldMap = () => {
  const [worlddata, setWorlddata] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const projection = () => {
    return geoMercator()
      .scale(120)
      .translate([800 / 2, 500 / 1.65])
      .scale(130);
  };
  console.log("/world-110m.json");
  useEffect(() => {
    fetch("/world-110m.json").then((response) => {
      response.json().then((worlddata) => {
        setWorlddata(feature(worlddata, worlddata.objects.countries).features);
        // let data = worlddata.objects.countries.geometries
        //console.log(data)
      });
    });
  }, []);

  const handleCountryHover = (i) => {
    if (i === isActive) {
      setIsActive(null);
    } else {
      setIsActive(i);
    }
  };

  const fillColor = (countryName) => {
    if (countryName === "United States of America") {
      countryName = "US";
    }
    if (countryName === "Taiwan") {
      countryName = "Taiwan*";
    }
    if (countryName === "South Korea") {
      countryName = "Korea,  South";
    }
    let countryColor = {};
    CovidCountryData.forEach((country) => {
      if (country.country === countryName) {
        if (country.confirmed < 1000) {
          countryColor = "dodgerblue";
        }
        if (country.confirmed >= 1000 && country.confirmed < 5000) {
          countryColor = "lightblue";
        }
        if (country.confirmed >= 5000 && country.confirmed < 10000) {
          countryColor = "green";
        }
        if (country.confirmed >= 10000 && country.confirmed < 50000) {
          countryColor = "yellow";
        }
        if (country.confirmed >= 50000 && country.confirmed < 100000) {
          countryColor = "orange";
        }
        if (country.confirmed >= 100000) {
          countryColor = "red";
        }
      }
    });
    return countryColor;
  };

  return (
    <div className="worldmap">
      <div className="legend">
        <p className="legend-text">
          &lt; 1000 cases<div className="legend-color1"></div>
        </p>
        <p className="legend-text">
          &gt; 1000 cases<span className="legend-color2"></span>
        </p>
        <p className="legend-text">
          &gt; 5000 cases<span className="legend-color3"></span>
        </p>
        <p className="legend-text">
          &gt; 10000 cases<span className="legend-color4"></span>
        </p>
        <p className="legend-text">
          &gt; 50000 cases<span className="legend-color5"></span>
        </p>
        <p className="legend-text">
          &gt; 100000 cases<span className="legend-color6"></span>
        </p>
      </div>
      <svg width={`100vw`} height={`80vh`} viewBox="0 0 800 450">
        <g className="countries">
          {worlddata.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection())(d)}
              className="country"
              // fill="#2A1B0A"
              // fill={
              //   isActive === i
              //     ? '#6E6E6E'
              //     : '#2A1B0A'
              // }
              fill={fillColor(d.properties.name)}
              stroke="#6E6E6E"
              strokeWidth={0.5}
              onMouseEnter={() => handleCountryHover(i)}
            />
          ))}
        </g>
        <g className="markers">
          {/* {this.state.cities.map((city, i) => (
                <svg key={i}>
                    <circle
                        key={`marker-${i}`}
                        cx={this.projection()(city.coordinates)[0]}
                        cy={this.projection()(city.coordinates)[1]}
                        r={2}
                        fill="#FFFFFF"
                        //stroke="#FFFFFF"
                        className="marker"
                        onClick={() => this.handleMarkerClick(i)}
                    />
                    <text
                        className="temp-text"
                        x={this.projection()(city.coordinates)[0]}
                        y={this.projection()(city.coordinates)[1]}
                        fill={this.textColor(city.temp)}
                        onClick={() => this.handleMarkerClick(i)}
                    >
                        {city.name} {city.temp} &#176;C
                    </text>
                </svg>
            ))} */}
        </g>
      </svg>
    </div>
  );
};

export default WorldMap;
