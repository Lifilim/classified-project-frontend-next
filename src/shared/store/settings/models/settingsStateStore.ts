import { makeAutoObservable } from "mobx";
import type { ThemeMode } from "../types";

export class SettingsStateStore {
  theme: ThemeMode = "light";
  language: string = "ru";

  constructor() {
    makeAutoObservable(this);
  }
}