import { SettingsStateStore } from "./models/settingsStateStore";
import { SettingsSyncStore } from "./models/settingsSyncStore";

class SettingsStore {
  state: SettingsStateStore;
  sync: SettingsSyncStore;

  constructor(state: SettingsStateStore, sync: SettingsSyncStore) {
    this.state = state;
    this.sync = sync;
  }
}

const state = new SettingsStateStore();
const sync = new SettingsSyncStore(state);

export const settingsStore = new SettingsStore(state, sync);
