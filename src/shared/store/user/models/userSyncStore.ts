import { makeAutoObservable } from "mobx";
import type { UserStateStore } from "./userStateStore";
import type { User } from "@/shared/types/user";

export class UserSyncStore {
  constructor(private state: UserStateStore) {
    makeAutoObservable(this);
  }

  setUser(user: User | null): void {
    this.state.user = user;
  }

  setToken(token: string | null): void {
    this.state.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  logout(): void {
    this.state.token = null;
    this.state.user = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }
}
