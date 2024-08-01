// FeatureAccessProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "./fire-base-config";
import { doc, getDoc } from "firebase/firestore";

const FeatureAccessContext = createContext();

export function useFeatureAccess() {
  return useContext(FeatureAccessContext);
}

export const FeatureAccessProvider = ({ children }) => {
  const [featureAccess, setFeatureAccess] = useState("basic"); // Default value
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const userId = user.id;
      const userDocRef = doc(db, "users", userId);

      getDoc(userDocRef)
        .then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            if (userData.featureAccess) {
              setFeatureAccess(userData.featureAccess);
            }
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [user]);

  return (
    <FeatureAccessContext.Provider value={{ featureAccess, setFeatureAccess }}>
      {children}
    </FeatureAccessContext.Provider>
  );
};
