import { UserStateStore } from "./models/userStateStore";
import { UserSyncStore } from "./models/userSyncStore";
import { UserAsyncStore } from "./models/userAsyncStore";

class UserStore {
  state: UserStateStore;
  sync: UserSyncStore;
  async: UserAsyncStore;

  constructor(state: UserStateStore, sync: UserSyncStore, async: UserAsyncStore) {
    this.state = state;
    this.sync = sync;
    this.async = async;
  }
}

const state = new UserStateStore();
const sync = new UserSyncStore(state);
const async = new UserAsyncStore(sync);

export const userStore = new UserStore(state, sync, async);
