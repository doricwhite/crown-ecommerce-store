import { createContext, useState } from "react";

// Actual value you want to access
export const UserContext = createContext({});

// The actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
