import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  fetchReportFailure,
  fetchReportRequest,
  fetchReportSuccess,
  createReportFailure,
  createReportRequest,
  createReportSuccess,
  fetchReportsSuccess,
  fetchReportsFailure,
} from "./actions";
import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,
  CREATE_REPORT_FAILURE,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  FETCH_REPORTS_REQUEST,
} from "./actionTypes";
import { Report, Reports } from "./types";
import { API } from "../../API";
const getReports = () => axios.get<Reports[]>(`${API}/reports`);
const createReport = (report: createReportSagaType) =>
  axios.post<Report[]>(`${API}/report`, report.payload.report);
const getReport = (payload: fetchReportSagaType) =>
  axios.get<Reports>(`${API}/report?id=${payload.payload.id}`);

interface createReportSagaType {
  type: string;
  payload: {
    report: FormData;
  };
}
interface fetchReportSagaType {
  type: string;
  payload: {
    id: string;
  };
}

function* fetchReportSaga(payload: fetchReportSagaType): any {
  try {
    const response = yield call(getReport, payload);
    yield put(
      fetchReportSuccess({
        report: response.data.message,
      })
    );
  } catch (e: any) {
    yield put(
      fetchReportFailure({
        error: e.toString(),
      })
    );
  }
}

function* fetchReportsSaga(): any {
  try {
    const response = yield call(getReports);
    yield put(
      fetchReportsSuccess({
        reports: response.data.message,
      })
    );
  } catch (e: any) {
    yield put(
      fetchReportsFailure({
        error: e.toString(),
      })
    );
  }
}
function* createReportSaga(report: createReportSagaType): any {
  try {
    console.log("ANy", report);
    const response = yield call(createReport, report);
    yield put(
      createReportSuccess({
        report: response.data.message,
      })
    );
  } catch (e) {
    yield put(
      createReportFailure({
        error: "",
      })
    );
  }
}

function* reportSaga() {
  yield all([
    takeLatest(FETCH_REPORT_REQUEST, fetchReportSaga),
    takeLatest(CREATE_REPORT_REQUEST, createReportSaga),
    takeLatest(FETCH_REPORTS_REQUEST, fetchReportsSaga),
  ]);
}

export default reportSaga;
