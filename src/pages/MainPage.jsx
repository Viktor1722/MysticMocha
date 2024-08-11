import React, { useState, useEffect } from "react";
import FlipCard from "./CardFlip";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fire-base-config";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { useFeatureAccess } from "../FeatureAccessContext";

function MainPage() {
  const navigate = useNavigate();
  const [fortune, setFortune] = useState("");
  const [wishes, setWishes] = useState([]);
  const { featureAccess } = useFeatureAccess();

  const captureWishCard = async () => {
    const cardElement = document.getElementById("flipCard");
    const canvas = await html2canvas(cardElement);
    const image = canvas.toDataURL("image/png");
    return image;
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
    navigate(`/share?featureAccess=${featureAccess}`, {
      state: { wish: fortune },
    });
  };

  return (
    <main className="mainPage">
      <div className="container">
        <h2 className="title">Kъсметче с кафето</h2>
        <br />
        <br />
        <div className="flip-card-box" id="flipCard">
          <FlipCard wish={fortune} />
        </div>
        <br />
        <br />
        <div className="buttons-div">
          <button className="share-button" onClick={goToSharePage}>
            <b>Сподели</b>
          </button>
          {featureAccess === "premium" && (
            <button className="share-button">
              <a
                className="link"
                href="https://www.google.com/maps/place/Cherry+by+Mary/@43.1994378,27.9160161,691m/data=!3m1!1e3!4m8!3m7!1s0x40a4535612a32fbf:0xd5f4a465f325d1b!8m2!3d43.1994378!4d27.918591!9m1!1b1!16s%2Fg%2F11y1cdmk7k?entry=ttu"
              >
                <b>Книга с ревюта</b>
              </a>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
