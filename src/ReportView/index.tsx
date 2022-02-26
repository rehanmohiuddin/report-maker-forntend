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
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const report = useSelector(getReportSelector);
  const [Ref, setRef] = useState<HTMLDivElement>();
  const pending = useSelector(getPendingSelector);
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.createEmpty()
  );
  const dispatch = useDispatch();
  const [Report, setReport] = useState<{ date: string; sections: Array<any> }>({
    date: new Date().toISOString(),
    sections: [],
  });

  useEffect(() => {
    const _id = window.location.pathname.split("/")[2];
    dispatch(fetchReportRequest({ id: _id }));
  }, []);
  useEffect(() => {
    const _report = { ...report, sections: [] };
    if (report._id.length > 0) {
      report.sections.forEach((_section: any) => {
        _report.sections.push({
          ..._section,
          description: JSON.parse(_section.description),
        });
      });
      setReport(_report);
      console.log("Report11", report);
    }
  }, [report]);

  return (
    <div className="container ">
      <Header />
      {pending && <Loader message="Getting Report" />}
      <div className="report-container">
        <div className="report" id="capture">
          <div className="report-date">
            Date: {new Date(Report.date).toLocaleDateString()}
          </div>
          {Report &&
            Report.sections.map(
              (_section: {
                description: string;
                id: string;
                name: string;
                media: Array<{ url: string; asset_id: string }>;
              }) => (
                <>
                  <h3 className="section-heading">{_section.name}</h3>
                  <div className="section-preview">
                    <Editor
                      key={_section.id}
                      editorState={EditorState.createWithContent(
                        convertFromRaw(JSON.parse(_section.description))
                      )}
                      onChange={() => console.log()}
                      readOnly={true}
                    />
                    <Carousel>
                      {_section.media.map((_med) => (
                        <img src={_med.url} className="section-media-img" />
                      ))}
                    </Carousel>
                  </div>
                </>
              )
            )}
        </div>
      </div>
      <button
        onClick={async () => {
          try {
            await navigator.share({
              title: "Daily Report",
              text: `Report For Date : ${new Date(
                Report.date
              ).toLocaleDateString()}`,
              url: `/Report/${window.location.pathname.split("/")[2]}`,
            });
          } catch (err) {}
        }}
        className="share-btn"
      >
        <FontAwesomeIcon size="2x" color="#fff" icon={faShare} />
      </button>
    </div>
  );
};

export default Index;
