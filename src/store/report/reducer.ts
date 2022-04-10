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
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  LOGOUT,
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
  user: {},
  isLoggedIn: false,
  message: null,
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
        message: null,
        error: null,
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

    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
        message: null,
        error: null,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify({ ...action.payload.user }));
      return {
        ...state,
        pending: false,
        user: action.payload,
        isLoggedIn: true,
        message: "Login Success",
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        pending: false,
      };

    case CHECK_AUTH_REQUEST:
      return {
        ...state,
        pending: true,
        message: null,
        error: null,
      };

    case CHECK_AUTH_SUCCESS:
      localStorage.setItem("user", JSON.stringify({ ...action.payload.user }));
      return {
        ...state,
        pending: false,
        user: action.payload,
        isLoggedIn: true,
        message: "Welcome",
      };

    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        pending: false,
        isLoggedIn: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        message: "Log Out Success",
      };

    default:
      return {
        ...state,
      };
  }
};
