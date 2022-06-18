import React, { useState } from "react";
import Header from "./Header";
import "./index.css";
import Editor from "./Editor";
import { useDispatch, useSelector } from "react-redux";
import {
  createReportsSelector,
  getErrorSelector,
  getPendingSelector,
  getReportCreationSelector,
} from "../store/report/selectors";
import {
  createReportRequest,
  fetchReportsRequest,
} from "../store/report/actions";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../Loader";

interface dataProp {
  name: string;
  data: string;
}
const Index: React.FC = () => {
  const dispatch = useDispatch();
  const created = useSelector(getReportCreationSelector);
  const report = useSelector(createReportsSelector);
  const error = useSelector(getErrorSelector);
  const pending = useSelector(getPendingSelector);
  const navigation = useNavigate();
  const [reportCreated, setCreated] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const [form, setForm] = useState(new FormData());

  const handleGenerateReport = () => {
    const _form = form;
    const todayDate = new Date().toLocaleDateString();
    _form.append(`Daily Report ${todayDate}`, data);
    dispatch(createReportRequest({ report: _form }));
  };

  return (
    <>
      <Header />
      {pending && <Loader message="Generating Report Please Wait" />}
      {created && <Navigate to={"/Report/" + report._id} />}
      <div className="container">
        <Editor
          index={0}
          name={"Daily Report"}
          text={(desc: string) => {
            setData(desc);
          }}
          sendFile={(name: string, file: File) => {
            const _form = form;
            _form.append("file", file, `${name}-${file.name}`);
            setForm(_form);
          }}
        />
      </div>

      <button className="generate-btn" onClick={handleGenerateReport}>
        GENERATE REPORT
      </button>
    </>
  );
};

export default Index;
