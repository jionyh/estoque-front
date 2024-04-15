"use client";
import React, { createContext, useContext, useState } from "react";

interface ContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AppContext = createContext<ContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AppContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context as ContextProps;
}
