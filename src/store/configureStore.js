import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks";
import employeeReducer from "./employees";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    employees: employeeReducer,
  },
});

export default store;
