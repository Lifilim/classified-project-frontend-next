import { makeAutoObservable } from "mobx";
import type { ThemeMode } from "../types";

export class SettingsStateStore {
  theme: ThemeMode = "light";
  language: string = "ru";
  osPreference: "light" | "dark" = "light";

  constructor() {
    makeAutoObservable(this);
  }

  get effectiveTheme(): "light" | "dark" {
    return this.theme === "auto" ? this.osPreference : this.theme;
  }
}
