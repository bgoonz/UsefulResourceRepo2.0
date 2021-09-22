import { combineReducers } from "redux";
import notesReducer from "./notes";
import tabsReducer from "./tabs";

export default combineReducers({
  notes: notesReducer,
  tabs: tabsReducer,
});
