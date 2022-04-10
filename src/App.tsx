import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Report";
import Reports from "./Reports";
import Report from "./ReportView";
import ImageView from "./ImageView";
import Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/Reports"
          element={<ProtectedRoute component={Reports} />}
        />
        <Route path="/Report/:id" element={<Report />} />
        <Route path="/Images/:id" element={<ImageView />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
export default App;
