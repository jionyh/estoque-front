"use client";
import React, { createContext, useContext, useState } from "react";

interface ContextProps {
  entryId: number | undefined;
  setEntryId: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const InventoryEntryDetails = createContext<ContextProps>({
  entryId: undefined,
  setEntryId: () => {},
});
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [entryId, setEntryId] = useState<number | undefined>();
  return (
    <InventoryEntryDetails.Provider value={{ entryId, setEntryId }}>
      {children}
    </InventoryEntryDetails.Provider>
  );
}

export function useEntryContext() {
  const context = useContext(InventoryEntryDetails);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context as ContextProps;
}
