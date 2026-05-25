import { makeAutoObservable } from "mobx";
import type { ThemeMode } from "../types";

export class SettingsStateStore {
  theme: ThemeMode = "light";
  language: string = "ru";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        this.theme = savedTheme;
      }
      this.language = localStorage.getItem("lang") || "ru";
    }
  }
}
