import React, { createContext, useState, ReactNode } from "react";

// Define the type for the context value
type GlobalContextType = {
  globalVariable: string;
  setGlobalVariable: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context with an initial undefined value
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the type for the provider's props
type GlobalProviderProps = {
  children: ReactNode;
};

// Create the provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState("");

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};