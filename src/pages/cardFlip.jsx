import React, { useState } from "react";
import "../styles/cardFlip.css";
import touchIcon from "../assets/click.gif";

const CardFlip = ({ wish }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flip-card" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <img className="touch-icon" src={touchIcon} alt=""></img>
        </div>
        <div className="flip-card-back">
          <h1 className="wishes_cardFlip">{wish}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
