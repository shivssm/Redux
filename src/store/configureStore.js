import { configureStore } from "@reduxjs/toolkit";
import reducer from "./tasks";

const store = configureStore({reducer});

export default store;