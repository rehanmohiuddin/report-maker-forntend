import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.report.pending;
const reportCreated = (state: AppState) => state.report.reportedCreated;
const getIsLoggedIn = (state: AppState) => state.report.isLoggedIn;
const getUser = (state: AppState) => state.report.user;
const getReports = (state: AppState) => state.report.reports;
const createReport = (state: AppState) => state.report.report;
const getReport = (state: AppState) => state.report.fetchedReport;
const getError = (state: AppState) => state.report.error;
const getMessage = (state: AppState) => state.report.message;

export const getReportsSelector = createSelector(
  getReports,
  (reports) => reports
);

export const createReportsSelector = createSelector(
  createReport,
  (report) => report
);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getReportCreationSelector = createSelector(
  reportCreated,
  (created) => created
);

export const getLogedInSelector = createSelector(
  getIsLoggedIn,
  (isLoggedIn) => isLoggedIn
);

export const getUserSelector = createSelector(getUser, (user) => user);

export const getReportSelector = createSelector(getReport, (report) => report);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getMessageSelector = createSelector(getError, (msg) => msg);
