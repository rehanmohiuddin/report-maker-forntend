import React from "react";
import Header from "../../Report/Header";
function index({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default index;
