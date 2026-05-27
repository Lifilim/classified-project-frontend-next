"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/shared/store";

export const CommonWrapper = observer(function CommonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settingsStore } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settingsStore.state.effectiveTheme);
  }, [settingsStore.state.effectiveTheme]);

  return <>{children}</>;
});
