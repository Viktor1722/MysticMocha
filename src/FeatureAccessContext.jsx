import React, { createContext, useContext, useState, useEffect } from "react";

const FeatureAccessContext = createContext();

export function useFeatureAccess() {
  return useContext(FeatureAccessContext);
}

export const FeatureAccessProvider = ({ children }) => {
  const [featureAccess, setFeatureAccess] = useState("premium"); // Default value

  // Update feature access from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("featureAccess");
    if (access) setFeatureAccess(access);
  }, []);

  return (
    <FeatureAccessContext.Provider value={{ featureAccess, setFeatureAccess }}>
      {children}
    </FeatureAccessContext.Provider>
  );
};
