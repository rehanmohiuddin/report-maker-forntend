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
