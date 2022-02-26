import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.report.pending;
const reportCreated = (state: AppState) => state.report.reportedCreated;

const getReports = (state: AppState) => state.report.reports;
const createReport = (state: AppState) => state.report.report;
const getReport = (state: AppState) => state.report.fetchedReport;
const getError = (state: AppState) => state.report.error;

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
export const getReportSelector = createSelector(getReport, (report) => report);

export const getErrorSelector = createSelector(getError, (error) => error);
