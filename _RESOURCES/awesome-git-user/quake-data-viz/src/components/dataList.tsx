import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalState";
import "./styles/dataList.css";

interface frequencyDisplayAttributes {
  [frequency: string]: string;
}

export const DataList = ({ frequency }: { frequency: string }) => {
  const context = useContext(GlobalContext);

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

  const [quakeData, setQuakeData] = useState([]);

  useEffect(() => {
    getQuakeData(frequency).then((response) => setQuakeData(response));
  });

  const frequencyDisplay: frequencyDisplayAttributes = {
    hour: "1 hour",
    day: "24 hours",
    week: "7 days",
  };

  return (
    <div className="datalist-wrapper">
      <h3>
        The Latest:{" "}
        <span style={{ color: "gray" }}>{frequencyDisplay[frequency]}</span>
      </h3>
      <div className="datalist">
        {quakeData.length &&
          quakeData.map((quake, i) => {
            return (
              <div key={i} className="quake-list-item">
                <p>
                  <strong>magnitude:</strong> {quake.properties.mag}
                </p>
                <p>
                  <strong>epicenter:</strong> {quake.properties.place}
                </p>
                <p id="date">
                  <strong>when: </strong>
                  {new Date(quake.properties.time).toLocaleString()}
                </p>
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};
