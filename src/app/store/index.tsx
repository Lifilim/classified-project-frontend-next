"use client";

import React, { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const rootStore = new RootStore();
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): RootStore {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return store;
}
