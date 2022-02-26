import { all, fork } from "redux-saga/effects";

import reportSaga from "./report/sagas";

function* rootSaga() {
  yield all([fork(reportSaga)]);
}

export type AppState = ReturnType<typeof rootSaga>;

export default rootSaga;
