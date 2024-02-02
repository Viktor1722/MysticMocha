import React from "react";
import MainPage from "./MainPage";
import FirebaseApp from "./fireBaseConfig";
import "./styles/App.css";

function App() {
  return (
    <>
      {" "}
      <FirebaseApp />
      <MainPage />
    </>
  );
}

export default App;
