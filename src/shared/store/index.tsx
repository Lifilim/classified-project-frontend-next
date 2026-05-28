"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { RootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => new RootStore());
  return (
    <StoreContext.Provider value={store}>
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
