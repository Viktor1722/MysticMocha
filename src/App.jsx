// In App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SharePage from "./pages/SharePage";
import Login from "./pages/Login";
import "./styles/SharePage.css";
import "./styles/App.css";

import { FeatureAccessProvider } from "./FeatureAccessContext";

function App() {
  return (
    <div>
      <FeatureAccessProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/share" element={<SharePage />} />
          </Routes>
        </Router>
      </FeatureAccessProvider>
    </div>
  );
}

export default App;
