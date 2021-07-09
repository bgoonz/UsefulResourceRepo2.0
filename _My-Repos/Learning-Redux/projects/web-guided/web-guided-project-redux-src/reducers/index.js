import { combineReducers } from "redux";
import { titleReducer } from "./titleReducer";
import { membersReducer } from "./membersReducer";

export default combineReducers({
  title: titleReducer,
  members: membersReducer,
});
