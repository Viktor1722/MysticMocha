import React, { useState, useEffect } from "react";
import FlipCard from "./cardFlip";
import planFeatures from "../planConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../fireBaseConfig";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [fortune, setFortune] = useState("");
  const [userPlan, setUserPlan] = useState("premium");
  const [wishes, setWishes] = useState([]);

  const captureWishCard = async () => {
    const cardElement = document.getElementById("flipCard");
    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL("image/png");
    return image;
  };

  const downloadImage = async () => {
    const image = await captureWishCard();
    const link = document.createElement("a");
    link.href = image;
    link.download = "wish.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wishes"));
        if (!querySnapshot.empty) {
          const wishesDoc = querySnapshot.docs[0];
          if (wishesDoc.exists()) {
            const fetchedWishes = wishesDoc.data().wishes;
            setWishes(fetchedWishes);

            const randomIndex = Math.floor(
              Math.random() * fetchedWishes.length
            );
            const randomWish = fetchedWishes[randomIndex];
            setFortune(randomWish);
            console.log("Random wish:", randomWish);
          }
        } else {
          console.log("No documents found in 'wishes' collection");
        }
      } catch (error) {
        console.error("Error fetching wishes:", error);
      }
    };

    fetchWishes();
  }, []);

  const goToSharePage = () => {
    navigate("/share", { state: { wish: fortune } }); // Pass fortune as state
  };

  const featureAccess = planFeatures[userPlan];
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    fortune
  )}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    document.location.href
  )}&quote=${encodeURIComponent(fortune)}`;

  const googleReviewLink =
    "https://www.google.com/maps/place/[https://www.google.com/maps/place/Cherry+by+Mary/@43.2075205,27.9218619,53m/data=!3m1!1e3!4m6!3m5!1s0x40a4551d2e10fb85:0x518af4d8d4b7711!8m2!3d43.2074796!4d27.9217361!16s%2Fg%2F11qz39lctt?entry=ttu";

  return (
    <div className="container">
      <h2 className="title"> Kъсметче с кафето </h2>
      <br />
      <br />
      <div className="flip-card-box">
        <FlipCard wish={fortune} />
      </div>
      <br />
      <br />
      <button className="share-button" onClick={goToSharePage}>
        {" "}
        <b>Сподели</b>
      </button>{" "}
    </div>
  );
}

export default MainPage;
