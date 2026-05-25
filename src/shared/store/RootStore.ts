import { userStore } from "./user/userStore";
import { servicesStore } from "./services/servicesStore";
import { settingsStore } from "./settings/settingsStore";

export class RootStore {
  userStore = userStore;
  servicesStore = servicesStore;
  settingsStore = settingsStore;
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
