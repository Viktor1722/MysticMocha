import React, { useState, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import MainPage from "./MainPage";
import { db } from "../fire-base-config";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

function Login() {
  const [userPlan, setUserPlan] = useState("basic"); // Default plan
  const { user } = useUser();

  // This effect runs when the user signs in
  useEffect(() => {
    if (user) {
      const userId = user.id;

      const saveUserPlan = async () => {
        try {
          // Save the user ID to the corresponding plan document
          const userPlanDocRef = doc(db, "user plans", userPlan);
          await updateDoc(userPlanDocRef, {
            users: arrayUnion(userId),
          });

          console.log(`User ${userId} added to ${userPlan} plan.`);
        } catch (error) {
          console.error("Error updating Firestore:", error);
        }
      };

      saveUserPlan();
    }
  }, [user, userPlan]);

  const handlePlanChange = (event) => {
    setUserPlan(event.target.value);
  };

  return (
    <header>
      <SignedOut>
        <div>
          <label htmlFor="plan-select">Select Your Plan:</label>
          <select id="plan-select" value={userPlan} onChange={handlePlanChange}>
            <option value="basic">Basic</option>
            <option value="advanced">Advanced</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="logout">
          <MainPage />
          <SignOutButton>Logout</SignOutButton>
        </div>
      </SignedIn>
    </header>
  );
}

export default Login;
