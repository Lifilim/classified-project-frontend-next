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
}
