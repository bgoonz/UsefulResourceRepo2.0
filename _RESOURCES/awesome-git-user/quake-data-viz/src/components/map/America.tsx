import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/globalState";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { Topology, GeometryCollection } from "topojson-specification";
import { cities } from "../../data/cities";
import { QuakeTooltip } from "../quakeTooltip";
import { markerStatus } from "../../hooks/markerStatus";
import "../styles/america.css";

const America = ({
  frequency,
  stateSelection,
}: {
  frequency: string;
  stateSelection: any;
}) => {
  const context = useContext(GlobalContext);

  const mapData = feature(
    context.states as unknown as Topology,
    context.states.objects.states as GeometryCollection
  ).features;

  const [quakeData, setQuakeData] = useState([]);
  const [quakeId, setQuakeId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [tooltip, setTooltip] = useState({
    show: false,
    id: 0,
    info: {},
    coordinates: [0, 0],
  });

  const getQuakeData = async (frequency: string) => {
    let quakes: any = [];
    if (frequency === "hour") {
      quakes = await context.quakesHourly;
    } else if (frequency === "day") {
      quakes = await context.quakesDaily;
    } else {
      quakes = await context.quakesWeekly;
    }
    return quakes;
  };

  const height = 450,
    width = 800;

  const projection: any = () =>
    geoAlbersUsa()
      .scale(900)
      .translate([width / 2, height / 2]);

  useEffect(() => {
    getQuakeData(frequency).then((response) => setQuakeData(response));
  }, [frequency]);

  function stateColor(id: number) {
    return id === stateId ? "#33160C" : "#130804";
  }

  return (
    <div className="map-wrapper">
      <svg className="svg" width={`100%`} height={`100%`} viewBox="0 0 800 450">
        <g className="states">
          {mapData.length &&
            mapData.map((d, i) => (
              <path
                d={geoPath().projection(projection())(d)}
                className="country"
                fill={stateColor(Number(d.id))}
                stroke="#6E6E6E"
                strokeWidth={0.5}
                cursor="pointer"
                onMouseEnter={() => setStateId(Number(d.id))}
                onMouseLeave={() => setStateId(0)}
                onClick={() => stateSelection(Number(d.id))}
              />
            ))}
        </g>
        <g>
          {cities.length &&
            cities.map((city, j) => {
              return (
                <svg key={`city-${j}`}>
                  <circle
                    cx={
                      projection()(city.coordinates) &&
                      projection()(city.coordinates)[0]
                    }
                    cy={
                      projection()(city.coordinates) &&
                      projection()(city.coordinates)[1]
                    }
                    r={2}
                    fill="#FFFFFF"
                    className="marker"
                  />
                  <text
                    className="temp-text"
                    x={
                      projection()(city.coordinates) &&
                      projection()(city.coordinates)[0] + 10
                    }
                    y={
                      projection()(city.coordinates) &&
                      projection()(city.coordinates)[1]
                    }
                    fill="#FFFFFF"
                  >
                    {city.name}
                  </text>
                </svg>
              );
            })}
        </g>
        <g className="markers">
          {quakeData.length &&
            quakeData.map((quake, k) => {
              return (
                <svg key={`marker-${k}`}>
                  <circle
                    id={`${quake.id}`}
                    cx={
                      projection()(quake.geometry.coordinates) &&
                      projection()(quake.geometry.coordinates)[0]
                    }
                    cy={
                      projection()(quake.geometry.coordinates) &&
                      projection()(quake.geometry.coordinates)[1]
                    }
                    r={markerStatus(quake.properties.mag).radius}
                    fill={markerStatus(quake.properties.mag).color}
                    stroke="#ffffff"
                    strokeWidth={0.25}
                    opacity=".7"
                    cursor="pointer"
                    className="marker"
                    onMouseEnter={() => {
                      setQuakeId(quake.id);
                      setTooltip({
                        show: true,
                        id: quake.id,
                        info: quake.properties,
                        coordinates: [
                          projection()(quake.geometry.coordinates) &&
                            projection()(quake.geometry.coordinates)[0],
                          projection()(quake.geometry.coordinates) &&
                            projection()(quake.geometry.coordinates)[1] - 45,
                        ],
                      });
                    }}
                    onMouseLeave={() => {
                      setTooltip({
                        ...tooltip,
                        show: false,
                      });
                    }}
                  />
                </svg>
              );
            })}
        </g>
        {tooltip.show && (
          <QuakeTooltip
            x={tooltip.coordinates[0]}
            y={tooltip.coordinates[1]}
            info={tooltip.info}
          />
        )}
      </svg>
    </div>
  );
};

export default America;
