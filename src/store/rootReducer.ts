import { combineReducers } from "redux";

import reportReducer from "./report/reducer";

const rootReducer = combineReducers({
  report: reportReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
