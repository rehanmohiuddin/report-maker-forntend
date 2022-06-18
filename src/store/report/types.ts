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
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
  CHECK_AUTH_REQUEST,
  LOGOUT,
  DELETE_REPORT_REQUEST,
  DELETE_REPORT_SUCCESS,
  DELETE_REPORT_FAILURE,
} from "./actionTypes";

export interface Report {
  _id: string;
  name: string;
  description: string;
  graphData: [];
  additionalData: object;
}

export interface getReport {
  _id: string;
}

export interface Reports {
  _id: string;
  sections: [
    {
      name: string;
      description: string;
      graphData: [];
      additionalData: {
        name: string;
        type: string;
        description: string;
      };
      _id: string;
      media: Array<object>;
    }
  ];
  date: string;
  images: Array<any>;
}

export interface ReportState {
  reports: Reports[];
  error: string | null;
  pending: boolean;
  report: Report;
  fetchedReport: any;
  reportedCreated: boolean;
  user: {};
  isLoggedIn: boolean;
  message: string | null;
}
export interface FetchReportRequestPayload {
  id: string;
}
export interface FetchReportSuccessPayload {
  report: Report;
}
export interface FetchReportsSuccessPayload {
  reports: Reports[];
}

export interface CreateReportSuccessPayload {
  report: Report;
}

export interface FetchReportFailurePayload {
  error: string;
}

export interface CreateReportRequestPayload {
  report: FormData;
}

export interface DeleteReportRequestPayload {
  _id: string;
}

export interface DeleteReportSuccessPayload {
  message: Report;
}

export interface DeleteReportFailurePayload {
  error: string;
}

export interface LoginRequestPayload {
  password: string;
}

export interface LoginFailurePayload {
  message: string;
}

export interface LoginSuccessPayload {
  user: { token: string; email: string };
}

export interface CheckAuthRequestPayload {
  token: string;
}

export interface CheckAuthFailurePayload {
  message: string;
}

export interface CheckAuthSuccessPayload {
  user: { token: string; email: string };
}

export interface FetchReportsFailurePayload {
  error: string;
}
export interface CreateReportFailurePayload {
  error: string;
}

export interface FetchReportRequest {
  type: typeof FETCH_REPORT_REQUEST;
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginRequestPayload;
}

export interface CheckAuthRequest {
  type: typeof CHECK_AUTH_REQUEST;
  payload: CheckAuthRequestPayload;
}

export interface FetchReportsRequest {
  type: typeof FETCH_REPORTS_REQUEST;
}

export interface CreateReportRequest {
  type: typeof CREATE_REPORT_REQUEST;
  payload: CreateReportRequestPayload;
}

export interface LogOut {
  type: typeof LOGOUT;
}

export interface FetchReportRequest {
  type: typeof FETCH_REPORT_REQUEST;
  payload: FetchReportRequestPayload;
}

export type FetchReportSuccess = {
  type: typeof FETCH_REPORT_SUCCESS;
  payload: FetchReportSuccessPayload;
};
export type FetchReportsSuccess = {
  type: typeof FETCH_REPORTS_SUCCESS;
  payload: FetchReportsSuccessPayload;
};
export type CreateReportSuccess = {
  type: typeof CREATE_REPORT_SUCCESS;
  payload: CreateReportSuccessPayload;
};
export type FetchReportFailure = {
  type: typeof FETCH_REPORT_FAILURE;
  payload: FetchReportFailurePayload;
};
export type FetchReportsFailure = {
  type: typeof FETCH_REPORTS_FAILURE;
  payload: FetchReportFailurePayload;
};
export type CreateReportFailure = {
  type: typeof CREATE_REPORT_FAILURE;
  payload: CreateReportFailurePayload;
};

export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
};

export type LoginFailure = {
  type: typeof LOGIN_FAILURE;
  payload: LoginFailurePayload;
};

export type CheckAuthSuccess = {
  type: typeof CHECK_AUTH_SUCCESS;
  payload: LoginSuccessPayload;
};

export type CheckAuthFailure = {
  type: typeof CHECK_AUTH_FAILURE;
  payload: LoginFailurePayload;
};

export type DeleteReportRequest = {
  type: typeof DELETE_REPORT_REQUEST;
  payload: DeleteReportRequestPayload;
};

export type DeleteReportSuccess = {
  type: typeof DELETE_REPORT_SUCCESS;
  payload: DeleteReportSuccessPayload;
};

export type DeleteReportFailure = {
  type: typeof DELETE_REPORT_FAILURE;
  payload: DeleteReportFailurePayload;
};

export type ReportActions =
  | FetchReportRequest
  | FetchReportSuccess
  | FetchReportFailure
  | FetchReportsRequest
  | FetchReportsSuccess
  | FetchReportsFailure
  | CreateReportRequest
  | CreateReportSuccess
  | CreateReportFailure
  | DeleteReportRequest
  | DeleteReportSuccess
  | DeleteReportFailure
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | CheckAuthRequest
  | CheckAuthSuccess
  | CheckAuthFailure
  | LogOut;
