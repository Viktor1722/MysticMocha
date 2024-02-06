// In App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SharePage from "./pages/SharePage";

import "./styles/App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/share" element={<SharePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
