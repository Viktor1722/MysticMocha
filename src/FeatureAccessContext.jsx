import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "./fire-base-config";

const FeatureAccessContext = createContext();

export function useFeatureAccess() {
  return useContext(FeatureAccessContext);
}

export const FeatureAccessProvider = ({ children }) => {
  const [featureAccess, setFeatureAccess] = useState("premium"); // Default value
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const userId = user.id;
      const userDocRef = db.collection("users").doc(userId);

      userDocRef
        .get()
        .then((doc) => {
          if (doc.exists) {
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
