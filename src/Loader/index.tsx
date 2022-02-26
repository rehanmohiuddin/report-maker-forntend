import React from "react";
import "./index.css";

function index({ message }: { message: string }) {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-spin"></div>
        <div className="loader-text">{message}...</div>
      </div>
    </div>
  );
}

export default index;
