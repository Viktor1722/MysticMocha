// In App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SharePage from "./pages/SharePage";
import DemoPage from "./pages/DemoPage";
import DemoPage2 from "./pages/DemoPage2";
import DemoPage3 from "./pages/DemoPage3";
import DemoPage4 from "./pages/DemoPage4";
import DemoPage5 from "./pages/DemoPage5";
import "./styles/SharePage.css";
import "./styles/App.css";
import "./styles/demoPage.css";
import "./styles/demoPage2.css";
import "./styles/demoPage3.css";
import "./styles/demoPage4.css";
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
            <Route path="/demo2" element={<DemoPage2 />} />
            <Route path="/demo3" element={<DemoPage3 />} />
            <Route path="/demo4" element={<DemoPage4 />} />
            <Route path="/demo5" element={<DemoPage4 />} />
          </Routes>
        </Router>
      </FeatureAccessProvider>
    </div>
  );
}

export default App;
