import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./tasks";
import reducer from "./employees";

const store = configureStore({reducer});

export default store;