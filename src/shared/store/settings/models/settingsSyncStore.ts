import { action, makeAutoObservable } from "mobx";
import type { ThemeMode } from "../types";
import type { SettingsStateStore } from "./settingsStateStore";

export class SettingsSyncStore {
  constructor(private state: SettingsStateStore) {
    makeAutoObservable(this);
  }

  init() {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        // runInAction(() => { this.theme = savedTheme; });
        this.setTheme(savedTheme);
      } else {
        this.setTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        );
      }
      this.setLanguage(localStorage.getItem("lang") || "ru");
      this.listenOSTheme();
    }
  }

  private listenOSTheme(): void {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
  }


  // @action
  toggleTheme(): void {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", this.state.theme);
    }
  }

  // @action
  setTheme(theme: ThemeMode): void {
    this.state.theme = theme;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }
  
  // @action
  setLanguage(language: string): void {
    this.state.language = language;
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language);
    }
  }
}
