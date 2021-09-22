import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import employeesReducer from "./employeesReducer";

export default combineReducers({
  employees: employeesReducer,
  errors: errorsReducer,
});
