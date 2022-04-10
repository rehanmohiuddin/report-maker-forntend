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
  checkSuccess,
  checkFailure,
  loginSuccess,
  loginFailure,
} from "./actions";
import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,
  CREATE_REPORT_FAILURE,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  FETCH_REPORTS_REQUEST,
  CHECK_AUTH_REQUEST,
  LOGIN_REQUEST,
} from "./actionTypes";
import {
  CheckAuthRequestPayload,
  LoginRequestPayload,
  Report,
  Reports,
} from "./types";
import { API } from "../../API";
axios.defaults.baseURL = API;
const getReports = () => axios.get<Reports[]>(`${API}/reports`);
const createReport = (report: createReportSagaType) =>
  axios.post<Report[]>(`${API}/report`, report.payload.report);
const getReport = (payload: fetchReportSagaType) =>
  axios.get<Reports>(`${API}/report?id=${payload.payload.id}`);

const checkAuth = (payload: checkAuthSagaType) =>
  axios.get(`${API}/check/auth?token=${payload.payload.token}`);

const login = (payload: loginSagaType) =>
  axios.post(`${API}/auth`, { password: payload.payload.password });

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

interface loginSagaType {
  type: string;
  payload: {
    password: string;
  };
}

interface checkAuthSagaType {
  type: string;
  payload: {
    token: string;
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

function* checkAuthSaga(payload: checkAuthSagaType): any {
  try {
    const response = yield call(checkAuth, payload);
    yield put(
      checkSuccess({
        user: response.data,
      })
    );
  } catch (e: any) {
    yield put(
      checkFailure({
        message: e.toString(),
      })
    );
  }
}

function* loginSaga(payload: loginSagaType): any {
  try {
    const response = yield call(login, payload);
    yield put(
      loginSuccess({
        user: response.data,
      })
    );
  } catch (e: any) {
    yield put(
      loginFailure({
        message: e.toString(),
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
    takeLatest(CHECK_AUTH_REQUEST, checkAuthSaga),
    takeLatest(LOGIN_REQUEST, loginSaga),
  ]);
}

export default reportSaga;
