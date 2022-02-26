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
  const [depts, setDept] = useState<Array<dataProp>>([
    { name: "Rendering Plant", data: "" },
    { name: "ETP", data: "" },
    { name: "Slaughter", data: "" },
    { name: "Machine Room", data: "" },
    { name: "Civil Dept", data: "" },
    { name: "Office", data: "" },
  ]);
  const [form, setForm] = useState(new FormData());

  return (
    <>
      <Header />
      {pending && <Loader message="Generating Report Please Wait" />}
      {created && <Navigate to={"/Report/" + report._id} />}
      <div className="container">
        {depts.map((_dept, index) => (
          <Editor
            key={index}
            index={index}
            name={_dept.name}
            text={(index: any, name: string, desc: string) => {
              const _depts = depts;
              _depts[index].data = desc;
              setDept([..._depts]);
            }}
            sendFile={(name: string, file: File) => {
              const _form = form;
              _form.append("file", file, `${name}-${file.name}`);
              setForm(_form);
            }}
          />
        ))}
      </div>

      <button
        className="generate-btn"
        onClick={() => {
          const _form = form;
          depts.forEach((_dept) => {
            _dept.data.length > 0 && _form.append(_dept.name, _dept.data);
          });
          dispatch(createReportRequest({ report: _form }));
        }}
      >
        GENERATE REPORT
      </button>
    </>
  );
};

export default Index;
