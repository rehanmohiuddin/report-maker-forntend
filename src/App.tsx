import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Report";
import Reports from "./Reports";
import Report from "./ReportView";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Report/:id" element={<Report />} />
      </Routes>
    </div>
  );
}
export default App;
