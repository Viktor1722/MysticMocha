import admin from "firebase-admin";
import serviceAccount from "./data/lucky-coffee-eb037-firebase-adminsdk-jhkja-8abf0fc3fe.json" assert { type: "json" };
import { readFileSync } from "fs";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://console.firebase.google.com/project/lucky-coffee-eb037/firestore/data/~2Fbaba~2FJxTEdKAyGQYUPbqlzcGU",
});

const db = admin.firestore(); // If you are using Firestore
const wishesData = readFileSync("src/data/new_wishes.json", "utf8");
const newWishes = JSON.parse(wishesData);
const docRef = db.collection("wishes").doc("3j4GhL2JWQMpIBw4tPx9"); // in order to push wishes to different collection just change the name in the collection and change the val in the doc also
const wishesStrings = newWishes.map((wish) => wish.wish);

wishesStrings.forEach(async (wishString) => {
  await docRef
    .update({
      wishes: admin.firestore.FieldValue.arrayUnion(wishString),
    })
    .catch(console.error);
});
