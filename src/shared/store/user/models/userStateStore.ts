import { makeAutoObservable } from "mobx";
import type { User } from "@/shared/types/user";

export class UserStateStore {
  token: string | null = null;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  get isAuth(): boolean {
    return this.token !== null;
  }
}
