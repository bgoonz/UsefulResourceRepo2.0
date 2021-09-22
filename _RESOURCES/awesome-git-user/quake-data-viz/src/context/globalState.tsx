import { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";
import {
  QuakeDataHourly,
  QuakeDataDaily,
  QuakeDataWeekly,
  stateKey,
} from "../data/quakeData";
import StatesData from "../data/states.json";
import CountiesData from "../data/counties.json";
import { StateKeyProps } from "../customTypes";

interface State {
  quakesHourly: Promise<any>;
  quakesDaily: Promise<any>;
  quakesWeekly: Promise<any>;
  stateKey: StateKeyProps;
  states: any;
  counties: any;
  frequency: string;
}

const initialState: State = {
  quakesHourly: QuakeDataHourly(),
  quakesDaily: QuakeDataDaily(),
  quakesWeekly: QuakeDataWeekly(),
  stateKey: stateKey,
  states: StatesData,
  counties: CountiesData,
  frequency: "day",
};

export const GlobalContext = createContext(initialState);

const GlobalState = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        quakesHourly: state.quakesHourly,
        quakesDaily: state.quakesDaily,
        quakesWeekly: state.quakesWeekly,
        stateKey: state.stateKey,
        states: state.states,
        counties: state.counties,
        frequency: state.frequency,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
