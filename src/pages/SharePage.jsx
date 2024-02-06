import React from "react";
import { useLocation } from "react-router-dom";
import FlipCard from "./cardFlip";
import logo from "../assets/mysticMocha.svg";

const SharePage = () => {
  const location = useLocation();
  const wish = location.state?.wish;

  return (
    <div className="container">
      <div className="share-card">
        <div className="wish-container">
          <FlipCard />
          <h1 className="wishes">{wish}</h1>
        </div>
        <div className="mystic-mocha">
          <img src={logo} />
          <b>
            <p>Mystic Mocha</p>
          </b>
        </div>
      </div>
      <div className="share-container"></div>
    </div>
  );
};

export default SharePage;
