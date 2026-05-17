import { makeAutoObservable } from "mobx";
import type { Service } from "@/shared/types/service";

export class ServicesStore {
  items: Service[] = [];
  loading: boolean = false;
  error: string | null = null;
  myItems: Service[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: Service[]): void {
    this.items = items;
  }

  setMyItems(items: Service[]): void {
    this.myItems = items;
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  setError(error: string | null): void {
    this.error = error;
  }

  clearMyItems(): void {
    this.myItems = [];
  }
}
