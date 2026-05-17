import { makeAutoObservable } from "mobx";

export type ThemeMode = "light" | "dark";

export class SettingsStore {
  theme: ThemeMode = "light";
  language: string = "ru";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        this.theme = savedTheme;
      } else {
        this.theme = window.matchMedia("(prefers-color-scheme: light)").matches
          ? "dark"
          : "light";
      }
      this.language = localStorage.getItem("lang") || "ru";
    }
  }

  toggleTheme(): void {
    this.theme = this.theme === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", this.theme);
    }
  }

  setTheme(theme: ThemeMode): void {
    this.theme = theme;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }

  setLanguage(language: string): void {
    this.language = language;
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language);
    }
  }
}
