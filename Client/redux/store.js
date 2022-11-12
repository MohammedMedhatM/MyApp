import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer from "./user";
import requestReducer from "./request";
import messageReducer from "./message";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userReducer,
  requestReducer,
  messageReducer,
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
