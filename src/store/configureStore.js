import {legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./tasks";

const store = createStore(reducer);

export default store;