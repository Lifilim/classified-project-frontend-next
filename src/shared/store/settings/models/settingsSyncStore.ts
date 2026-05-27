import { makeAutoObservable, runInAction } from "mobx";
import type { ThemeMode } from "../types";
import type { SettingsStateStore } from "./settingsStateStore";

export class SettingsSyncStore {
  constructor(private state: SettingsStateStore) {
    makeAutoObservable(this);
  }

  init() {
    if (typeof window !== "undefined") {
      const os = window.matchMedia("(prefers-color-scheme: dark)");
      this.state.osPreference = os.matches ? "dark" : "light";
      this.listenOSTheme();

      const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
      if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "auto") {
        this.setTheme(savedTheme);
      } else {
        this.setTheme("auto");
      }
      this.setLanguage(localStorage.getItem("lang") || "ru");
    }
  }

  private listenOSTheme(): void {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (evt) => {
        runInAction(() => {
          this.state.osPreference = evt.matches ? "dark" : "light";
        });
      });
  }

  toggleTheme(): void {
    const cycle: ThemeMode[] = ["light", "dark", "auto"];
    const curi = cycle.indexOf(this.state.theme);
    const next = cycle[(curi + 1) % cycle.length];
    this.setTheme(next);
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
