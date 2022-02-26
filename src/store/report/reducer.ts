import {
  FETCH_REPORT_FAILURE,
  FETCH_REPORT_REQUEST,
  FETCH_REPORT_SUCCESS,
  CREATE_REPORT_FAILURE,
  CREATE_REPORT_REQUEST,
  CREATE_REPORT_SUCCESS,
  FETCH_REPORTS_FAILURE,
  FETCH_REPORTS_REQUEST,
  FETCH_REPORTS_SUCCESS,
} from "./actionTypes";

import { ReportState, ReportActions } from "./types";

const initialState: ReportState = {
  pending: false,
  reports: [],
  reportedCreated: false,
  error: null,
  fetchedReport: {
    _id: "",
    sections: [
      {
        name: "",
        description: "",
        graphData: [],
        additionalData: {
          name: "",
          type: "",
          description: "",
        },
        _id: "",
        media: [],
      },
    ],
    date: "",
    images: [],
  },
  report: {
    _id: "",
    name: "",
    description: "",
    graphData: [],
    additionalData: {},
  },
};

export default (state = initialState, action: ReportActions) => {
  switch (action.type) {
    case FETCH_REPORT_REQUEST:
      return {
        ...state,
        pending: true,
        reportedCreated: false,
      };
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        pending: false,
        fetchedReport: action.payload.report,
        error: null,
        reportedCreated: false,
      };
    case FETCH_REPORT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        reportedCreated: false,
      };
    case FETCH_REPORTS_REQUEST:
      return {
        ...state,
        pending: true,
        reportedCreated: false,
      };
    case FETCH_REPORTS_SUCCESS:
      return {
        ...state,
        pending: false,
        reports: action.payload.reports,
        error: null,
        created: false,
      };
    case FETCH_REPORTS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    case CREATE_REPORT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case CREATE_REPORT_SUCCESS:
      return {
        ...state,
        pending: false,
        report: action.payload.report,
        error: null,
        reportedCreated: true,
      };
    case CREATE_REPORT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
