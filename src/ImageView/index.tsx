import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReportsSelector,
  getPendingSelector,
  getReportSelector,
} from "../store/report/selectors";
import { fetchReportRequest } from "../store/report/actions";
import Header from "../Report/Header";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../ReportView/index.css";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
const Index = () => {
  const report = useSelector(getReportSelector);
  const dispatch = useDispatch();
  const [previewImage, setImage] = useState<string | null>(null);

  useEffect(() => {
    const _id = window.location.pathname.split("/")[2];
    dispatch(fetchReportRequest({ id: _id }));
    const sectionId = window.location.href.split("=")[1];
    const obj = document.getElementById(sectionId);
    if (sectionId && obj) {
      obj.scrollIntoView();
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="image-sections-container">
          {previewImage && (
            <div className="image-preview">
              <FontAwesomeIcon
                onClick={() => setImage(null)}
                className="close-icon"
                icon={faWindowClose}
              />
              <img src={previewImage} />
            </div>
          )}
          {report.sections.map(
            (_section: {
              description: string;
              _id: string;
              name: string;
              media: Array<{ url: string; asset_id: string }>;
            }) => (
              <>
                {_section.media.length > 0 && (
                  <>
                    <h3 className="section-heading">{_section.name}</h3>
                    <div id={_section._id} className="images-preview">
                      {_section.media.map((_image) => (
                        <img
                          onClick={() => setImage(_image.url)}
                          src={_image.url}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
