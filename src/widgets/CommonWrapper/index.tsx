"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store";

export const CommonWrapper = observer(function CommonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settingsStore } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settingsStore.state.theme);
  }, [settingsStore.state.theme]);

  return <>{children}</>;
});
