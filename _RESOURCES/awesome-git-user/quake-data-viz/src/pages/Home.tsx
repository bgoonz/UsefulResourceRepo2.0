import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/globalState";
import { UseQuakeData } from "../hooks/getQuakeData";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import America from "../components/map/America";
import "../styles/home.css";

function Home() {
  const context = useContext(GlobalContext);

  const [frequency, setFrequency] = useState("day");
  const [stateQuakes, setStateQuakes] = useState([]);
  const [stateName, setStateName] = useState("click on state");

  const quakeInfo = UseQuakeData("week");

  const initialSetting = () => {
    quakeInfo.then(async (response: any) => {
      const quakes = await response.filter((quake: any) => {
        return quake.properties.place.includes("CA");
      });
      setStateName("California");
      setStateQuakes(quakes);
    });
  };

  const handleStateSelection = async (id: number) => {
    console.log({ selected: id });
    const stateInfo = await context.stateKey[id];
    setStateName(stateInfo.name);

    await quakeInfo.then(async (data: any) => {
      const quakes = await data.filter((quake: any) => {
        return (
          quake.properties.place.includes(stateInfo.abbreviation) ||
          quake.properties.place.includes(stateInfo.name)
        );
      });
      setStateQuakes(quakes);
    });
  };

  useEffect(() => {
    initialSetting();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="button-case">
        <p>Quakes in the last: </p>
        <div className="input-group">
          <input
            className="radio"
            value="hour"
            type="radio"
            name="frequency"
            onClick={() => setFrequency("hour")}
          />
          <label className="frequency-setting" htmlFor="hour">
            hour
          </label>
          <input
            className="radio"
            value="day"
            type="radio"
            name="frequency"
            onClick={() => setFrequency("day")}
            defaultChecked
          />
          <label className="frequency-setting" htmlFor="day">
            24 hours
          </label>
          <input
            className="radio"
            value="week"
            type="radio"
            name="frequency"
            onClick={() => setFrequency("week")}
          />
          <label className="frequency-setting" htmlFor="week">
            7 days
          </label>
        </div>
      </div>
      <div className="app-body-wrap">
        <America frequency={frequency} stateSelection={handleStateSelection} />
        <Sidebar frequency={frequency} name={stateName} quakes={stateQuakes} />
      </div>
    </div>
  );
}

export default Home;
