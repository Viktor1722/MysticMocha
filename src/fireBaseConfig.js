// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const {
  getFirestore,
  collection,
  writeBatch,
  doc,
} = require("firebase/firestore");
const wishes = require("./wishes.json");

const firebaseConfig = {
  apiKey: "AIzaSyDkuXN_cHktCO5iQ-dgddCiDPKmFGY0ssw",
  authDomain: "lucky-coffee-eb037.firebaseapp.com",
  projectId: "lucky-coffee-eb037",
  storageBucket: "lucky-coffee-eb037.appspot.com",
  messagingSenderId: "761554254202",
  appId: "1:761554254202:web:442011760a030065167ec3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadWishes = async (wishes) => {
  const batch = writeBatch(db);
  const wishesCol = collection(db, "wishes");

  wishes.forEach((wish) => {
    const docRef = doc(wishesCol); // Create a new document reference
    batch.set(docRef, { text: wish }); // Add your wish
  });

  await batch.commit();
  console.log("All wishes have been uploaded.");
};

uploadWishes(wishes);

export { db };
