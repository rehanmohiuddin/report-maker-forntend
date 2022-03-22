import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../Report/Header";
import ReportCover from "../Assets/report-default-cover.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingSelector,
  getReportsSelector,
} from "../store/report/selectors";
import { fetchReportsRequest } from "../store/report/actions";
import Loader from "../Loader";
import { getReport, Report, Reports } from "../store/report/types";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const reports = useSelector(getReportsSelector);
  const pending = useSelector(getPendingSelector);
  const [Reports, setReports] = useState<Reports[]>([
    {
      _id: null || "",
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
      images: [
        {
          asset_id: "",
          public_id: "",
          version: 0,
          version_id: "",
          signature: "",
          width: 0,
          height: 0,
          format: "",
          resource_type: "",
          created_at: "",
          tags: [],
          bytes: 0,
          type: "",
          etag: "",
          placeholder: false,
          url: "",
          secure_url: "",
          original_filename: "",
          api_key: "",
        },
      ],
    },
  ]);
  const dispatch = useDispatch();
  const reportReducer = (acc: Array<Reports>, curr: Reports) => {
    const images: Array<object> = [];
    curr.sections.forEach(
      (_section: { media: Array<object> }) =>
        _section.media.length > 0 && images.push(..._section.media)
    );
    return [...acc, { ...curr, images: [...images] }];
  };
  const sortByDate = (arr: Reports[]) => {
    const sortByDateReducer = (acc: Array<Reports>, curr: Reports) =>
      new Date(curr.date) > new Date(acc[0].date)
        ? [curr, ...acc]
        : [...acc, curr];

    return arr.sort(
      (report1: Reports, report2: Reports) =>
        new Date(report2.date).valueOf() - new Date(report1.date).valueOf()
    );
  };
  const reduceAndSort = () => sortByDate(reports.reduce(reportReducer, []));
  useEffect(() => {
    dispatch(fetchReportsRequest());
  }, []);
  useEffect(() => {
    reports.length > 0 && setReports(reduceAndSort());
  }, [reports]);
  return (
    <div className="container ">
      <Header />
      {pending && <Loader message="Getting Reports" />}

      <div className="report-cont">
        <div className="reports-container">
          <h2 className="reports-h2">Reports</h2>
          <div className="reports-table-header">
            <h3>Title</h3>
            <h3>Date</h3>
            <h3>Timestamp</h3>
          </div>
          {["1", "2", "3", "4", "5"].map((_report) => (
            <div
              onClick={() => navigate("/Report/")}
              key={_report}
              className="report-card"
            >
              <h3>Report #{_report}</h3>
              <h3> {new Date().toLocaleDateString()}</h3>
              <h3>Report Date: {new Date().toLocaleDateString()}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Index;
