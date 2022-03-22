import React, { createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {
  createReportsSelector,
  getPendingSelector,
  getReportSelector,
} from "../store/report/selectors";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { fetchReportRequest } from "../store/report/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Loader from "../Loader";
import Header from "../Report/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { getWeekDay } from "../Util";
import axios from "axios";

const Index = () => {
  const report = useSelector(getReportSelector);
  const pending = useSelector(getPendingSelector);

  const dispatch = useDispatch();
  const [Report, setReport] = useState<{ date: string; sections: Array<any> }>({
    date: new Date().toISOString(),
    sections: [],
  });
  const [_ReportData, setReportData] = useState<{
    date: string;
    sections: Array<{ name: string; description: string }>;
  }>({
    date: new Date().toISOString(),
    sections: [],
  });
  const [baseFile, setbaseFile] = useState<string>("");

  useEffect(() => {
    const _id = window.location.pathname.split("/")[2];
    dispatch(fetchReportRequest({ id: _id }));
  }, []);

  useEffect(() => {
    const _report = { ...report, sections: [] };
    const __ReportData: {
      date: string;
      sections: Array<{ name: string; description: string }>;
    } = { ...report, sections: [], date: new Date().toISOString() };
    if (report._id.length > 0) {
      report.sections.forEach((_section: any) => {
        const editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(JSON.parse(_section.description)))
        );
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks
          .map((block) => (!block.text.trim() && "\n") || block.text)
          .join("\n");
        _report.sections.push({
          ..._section,
          description: JSON.parse(_section.description),
        });
        __ReportData.sections.push({
          ..._section,
          description: value,
        });
      });
      setReport(_report);
      setReportData(__ReportData);
    }
  }, [report]);
  console.log({ _ReportData });
  return (
    <div>
      <Header />
      <div className="container report-view-container ">
        {pending && <Loader message="Getting Report" />}

        <div className="report-container">
          <div className="report" id="capture">
            <div className="report-date">
              Date: {new Date(Report.date).toLocaleDateString()}
            </div>
            <div className="report-date report-day">
              Day: {getWeekDay(new Date(Report.date).getDay())}
            </div>
            {Report &&
              Report.sections.map(
                (_section: {
                  description: string;
                  id: string;
                  name: string;
                  media: Array<{ url: string; asset_id: string }>;
                }) => (
                  <div className="section">
                    <fieldset className="section">
                      <legend>{_section.name}</legend>
                      <Editor
                        key={_section.id}
                        editorState={EditorState.createWithContent(
                          convertFromRaw(JSON.parse(_section.description))
                        )}
                        onChange={() => console.log({ _section })}
                        readOnly={true}
                      />
                    </fieldset>
                    <Carousel>
                      {_section.media.map((_med) => (
                        <img src={_med.url} className="section-media-img" />
                      ))}
                    </Carousel>
                  </div>
                )
              )}
          </div>
        </div>
        <button
          onClick={async () => {
            axios.post("/generate/report", _ReportData).then(async (res) => {
              setbaseFile(res.data);
              const url = `data:application/pdf;base64,${res.data}`;
              const base64Response = await fetch(url);
              const blob = await base64Response.blob();
              const file = new File([blob], `${report._id}.pdf`, {
                type: "application/pdf",
              });
              try {
                await navigator.share({
                  title: "Daily Report",
                  text: `Report For Date : ${new Date(
                    Report.date
                  ).toLocaleDateString()}`,
                  url: `/Report/${window.location.pathname.split("/")[2]}`,
                  files: [file],
                });
              } catch (err) {}
            });
          }}
          className="share-btn"
        >
          <FontAwesomeIcon size="2x" color="#fff" icon={faShare} />
        </button>
        <a
          download={"out.pdf"}
          href={`data:application/pdf;base64,${baseFile}`}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default Index;
