import React, { useState, useEffect } from "react";
import FlipCard from "./cardFlip";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../fire-base-config";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();
  const [fortune, setFortune] = useState("");
  const [userPlan, setUserPlan] = useState("premium");
  const [wishes, setWishes] = useState([]);

  const featureAccess = "premium";

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
    // Here, ensure 'userPlan' or a dynamically determined feature access level is used
    navigate(`/share?featureAccess=${userPlan}`, { state: { wish: fortune } });
  };

  return (
    <main className="mainPage">
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Z0PB3KK7PF"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'G-Z0PB3KK7PF');
      </script>
      <div className="container">
        <h2 className="title"> Kъсметче с кафето </h2>
        <br />
        <br />
        <div className="flip-card-box">
          <FlipCard wish={fortune} />
        </div>
        <br />
        <br />
        <div className="buttons-div">
          <button className="share-button" onClick={goToSharePage}>
            {" "}
            <b>Сподели</b>
          </button>{" "}
          <button className="share-button">
            {" "}
            <a
              className="link"
              href="https://www.google.com/maps/place/Cherry+by+Mary/@43.1994378,27.9160161,691m/data=!3m1!1e3!4m8!3m7!1s0x40a4535612a32fbf:0xd5f4a465f325d1b!8m2!3d43.1994378!4d27.918591!9m1!1b1!16s%2Fg%2F11y1cdmk7k?entry=ttu"
            >
              {" "}
              <b>Книга с ревюта</b>
            </a>
          </button>{" "}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
