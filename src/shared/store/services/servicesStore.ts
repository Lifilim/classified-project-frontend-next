import { ServicesStateStore } from "./models/servicesStateStore";
import { ServicesSyncStore } from "./models/servicesSyncStore";
import { ServicesAsyncStore } from "./models/servicesAsyncStore";

class ServicesStore {
  state: ServicesStateStore;
  sync: ServicesSyncStore;
  async: ServicesAsyncStore;

  constructor(state: ServicesStateStore, sync: ServicesSyncStore, async: ServicesAsyncStore) {
    this.state = state;
    this.sync = sync;
    this.async = async;
  }
}

const state = new ServicesStateStore();
const sync = new ServicesSyncStore(state);
const async = new ServicesAsyncStore(sync);

export const servicesStore = new ServicesStore(state, sync, async);
