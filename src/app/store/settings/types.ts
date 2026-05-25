export type ThemeMode = "light" | "dark";

export interface ISettingsState {
  theme: ThemeMode;
  language: string;
}

export interface ISettingsSync {
  toggleTheme(): void;
  setTheme(theme: ThemeMode): void;
  setLanguage(language: string): void;
}
