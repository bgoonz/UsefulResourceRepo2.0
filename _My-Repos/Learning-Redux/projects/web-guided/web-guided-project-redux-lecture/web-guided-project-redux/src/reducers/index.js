import { combineReducers } from "redux";
import dragonReducer from "./dragonReducer";
import titleReducer from "./titleReducer";

const rootReducer = combineReducers({
  dragon: dragonReducer,
  title: titleReducer,
});

export default rootReducer;
