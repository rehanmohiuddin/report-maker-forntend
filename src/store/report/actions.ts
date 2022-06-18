import {
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_SUCCESS,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_FAILURE,
  FETCH_REPORTS_FAILURE,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CHECK_AUTH_FAILURE,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_REQUEST,
  LOGOUT,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAILURE,
} from "./actionTypes";
import {
  FetchReportRequest,
  FetchReportSuccess,
  FetchReportSuccessPayload,
  FetchReportFailure,
  FetchReportFailurePayload,
  CreateReportRequest,
  CreateReportSuccessPayload,
  CreateReportSuccess,
  CreateReportFailurePayload,
  CreateReportFailure,
  FetchReportsRequest,
  FetchReportsFailure,
  FetchReportsFailurePayload,
  FetchReportsSuccess,
  FetchReportsSuccessPayload,
  CreateReportRequestPayload,
  FetchReportRequestPayload,
  LoginRequestPayload,
  LoginRequest,
  LoginSuccessPayload,
  LoginSuccess,
  LoginFailurePayload,
  LoginFailure,
  CheckAuthFailurePayload,
  CheckAuthFailure,
  CheckAuthSuccess,
  CheckAuthSuccessPayload,
  CheckAuthRequestPayload,
  CheckAuthRequest,
  LogOut,
  DeleteReportRequestPayload,
  DeleteReportRequest,
  DeleteReportSuccessPayload,
  DeleteReportSuccess,
  DeleteReportFailurePayload,
  DeleteReportFailure,
} from "./types";

export const fetchReportRequest = (
  payload: FetchReportRequestPayload
): FetchReportRequest => ({
  type: FETCH_REPORT_REQUEST,
  payload,
});

export const fetchReportsRequest = (): FetchReportsRequest => ({
  type: FETCH_REPORTS_REQUEST,
});

export const fetchReportSuccess = (
  payload: FetchReportSuccessPayload
): FetchReportSuccess => ({
  type: FETCH_REPORT_SUCCESS,
  payload,
});

export const fetchReportsSuccess = (
  payload: FetchReportsSuccessPayload
): FetchReportsSuccess => ({
  type: FETCH_REPORTS_SUCCESS,
  payload,
});

export const fetchReportFailure = (
  payload: FetchReportFailurePayload
): FetchReportFailure => ({
  type: FETCH_REPORT_FAILURE,
  payload,
});

export const fetchReportsFailure = (
  payload: FetchReportsFailurePayload
): FetchReportsFailure => ({
  type: FETCH_REPORTS_FAILURE,
  payload,
});

export const createReportRequest = (
  payload: CreateReportRequestPayload
): CreateReportRequest => ({
  type: CREATE_REPORT_REQUEST,
  payload,
});

export const createReportSuccess = (
  payload: CreateReportSuccessPayload
): CreateReportSuccess => ({
  type: CREATE_REPORT_SUCCESS,
  payload,
});

export const createReportFailure = (
  payload: CreateReportFailurePayload
): CreateReportFailure => ({
  type: CREATE_REPORT_FAILURE,
  payload,
});

export const deleteReportRequest = (
  payload: DeleteReportRequestPayload
): DeleteReportRequest => ({
  type: DELETE_REPORT_REQUEST,
  payload,
});

export const deleteReportSuccess = (
  payload: DeleteReportSuccessPayload
): DeleteReportSuccess => ({
  type: DELETE_REPORT_SUCCESS,
  payload,
});

export const deleteReportFailure = (
  payload: DeleteReportFailurePayload
): DeleteReportFailure => ({
  type: DELETE_REPORT_FAILURE,
  payload,
});

export const loginRequest = (payload: LoginRequestPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload,
});

export const checkRequest = (
  payload: CheckAuthRequestPayload
): CheckAuthRequest => ({
  type: CHECK_AUTH_REQUEST,
  payload,
});

export const checkSuccess = (
  payload: CheckAuthSuccessPayload
): CheckAuthSuccess => ({
  type: CHECK_AUTH_SUCCESS,
  payload,
});

export const checkFailure = (
  payload: CheckAuthFailurePayload
): CheckAuthFailure => ({
  type: CHECK_AUTH_FAILURE,
  payload,
});

export const logout = (): LogOut => ({
  type: LOGOUT,
});
