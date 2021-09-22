import { useContext } from "react";
import { GlobalContext } from "../context/globalState";

export const UseQuakeData = (frequency: string) => {
  const context = useContext(GlobalContext);

  let quakes: any = [];
  if (frequency === "hour") {
    quakes = context.quakesHourly;
  } else if (frequency === "day") {
    quakes = context.quakesDaily;
  } else {
    quakes = context.quakesWeekly;
  }
  return quakes;
};
