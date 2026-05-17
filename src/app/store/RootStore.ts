import { UserStore } from "./UserStore";
import { ServicesStore } from "./ServicesStore";
import { SettingsStore } from "./SettingsStore";

export class RootStore {
  userStore: UserStore;
  servicesStore: ServicesStore;
  settingsStore: SettingsStore;

  constructor() {
    this.userStore = new UserStore();
    this.servicesStore = new ServicesStore();
    this.settingsStore = new SettingsStore();
  }
}

let rootStore: RootStore | null = null;

export function getRootStore(): RootStore {
  if (typeof window === "undefined") {
    return new RootStore();
  }
  if (!rootStore) {
    rootStore = new RootStore();
  }
  return rootStore;
}
