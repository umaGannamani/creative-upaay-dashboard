import { createStore, combineReducers } from "redux";
import { tasksReducer } from "./tasksSlice";

// Load state from local storage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("tasksState");
    return data ? JSON.parse(data) : undefined;
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("tasksState", JSON.stringify(state));
  } catch (err) {
    console.log(err);
  }
};

const rootReducer = combineReducers({
  tasksState: tasksReducer,
});

const store = createStore(rootReducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
