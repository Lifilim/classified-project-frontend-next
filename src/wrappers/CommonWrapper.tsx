"use client";

import { useEffect } from "react";
import { useStore } from "@/app/store";

export function CommonWrapper({ children }: { children: React.ReactNode }) {
  const { settingsStore } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settingsStore.theme);
  }, [settingsStore.theme]);

  return <>{children}</>;
}
