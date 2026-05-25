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
      } else {
        this.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      this.language = localStorage.getItem("lang") || "ru";
      this.listenOSTheme();
    }
  }

  private listenOSTheme(): void {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.theme = e.matches ? "dark" : "light";
        }
      });
  }
}
