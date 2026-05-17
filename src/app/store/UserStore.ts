import { makeAutoObservable } from "mobx";
import type { User } from "@/shared/types/user";
import type { LoginDTO, RegisterDTO } from "@/shared/types/auth";
import { authApi } from "@/shared/api/authApi";

export class UserStore {
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

  setUser(user: User | null): void {
    this.user = user;
  }

  setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  async login(dto: LoginDTO): Promise<void> {
    const data = await authApi.login(dto);
    this.setToken(data.token);
    this.user = data.user;
  }

  async register(dto: RegisterDTO): Promise<void> {
    const data = await authApi.register(dto);
    this.setToken(data.token);
    this.user = data.user;
  }

  async fetchProfile(): Promise<void> {
    const user = await authApi.getProfile();
    this.user = user;
  }

  async updateProfile(data: { name?: string; avatar?: string; city?: string }): Promise<void> {
    const user = await authApi.updateProfile(data);
    this.user = user;
  }

  async deleteProfile(): Promise<void> {
    await authApi.deleteProfile();
    this.logout();
  }
}
