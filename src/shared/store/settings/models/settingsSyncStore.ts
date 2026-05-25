import { makeAutoObservable } from "mobx";
import type { ThemeMode } from "../types";
import type { SettingsStateStore } from "./settingsStateStore";

export class SettingsSyncStore {
  constructor(private state: SettingsStateStore) {
    makeAutoObservable(this);
  }

  toggleTheme(): void {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", this.state.theme);
    }
  }

  setTheme(theme: ThemeMode): void {
    this.state.theme = theme;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }

  setLanguage(language: string): void {
    this.state.language = language;
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language);
    }
  }
}
