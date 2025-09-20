import { combineReducers } from "redux";
import { tasksReducer } from "./tasksSlice";

export default combineReducers({
  tasksState: tasksReducer,
});
