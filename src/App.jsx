// In App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SharePage from "./pages/SharePage";
import DemoPage from "./pages/DemoPage";
import "./styles/SharePage.css";
import "./styles/App.css";
import "./styles/demoPage.css";
import { FeatureAccessProvider } from "./FeatureAccessContext";

function App() {
  return (
    <div>
      <FeatureAccessProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="/demo" element={<DemoPage />} />
          </Routes>
        </Router>
      </FeatureAccessProvider>
    </div>
  );
}

export default App;
