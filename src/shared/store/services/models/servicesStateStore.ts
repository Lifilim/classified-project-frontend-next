import { makeAutoObservable } from "mobx";
import type { Service } from "@/shared/types/service";

export class ServicesStateStore {
  items: Service[] = [];
  loading: boolean = false;
  error: string | null = null;
  myItems: Service[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}
