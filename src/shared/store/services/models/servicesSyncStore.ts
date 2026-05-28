import { makeAutoObservable } from "mobx";
import type { ServicesStateStore } from "./servicesStateStore";
import type { Service } from "@/shared/types/service";

export class ServicesSyncStore {
  constructor(private state: ServicesStateStore) {
    makeAutoObservable(this);
  }

  setItems(items: Service[]): void {
    this.state.items = items;
  }

  setMyItems(items: Service[]): void {
    this.state.myItems = items;
  }

  setLoading(loading: boolean): void {
    this.state.loading = loading;
  }

  setError(error: string | null): void {
    this.state.error = error;
  }

  clearMyItems(): void {
    this.state.myItems = [];
  }
  
  removeCard(id: string | number): void {
    this.state.items = this.state.items.filter(i => i.id !== id);
    this.state.myItems = this.state.myItems.filter(i => i.id !== id);
  }
}
