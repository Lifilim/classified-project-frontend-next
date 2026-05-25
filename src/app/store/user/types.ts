import type { User } from "@/shared/types/user";

export interface IUserState {
  token: string | null;
  user: User | null;
}

export interface IUserSync {
  setUser(user: User | null): void;
  setToken(token: string | null): void;
  logout(): void;
}

export interface IUserAsync {
  login(dto: { phone: string; password: string }): Promise<void>;
  register(dto: { phone: string; password: string; name?: string }): Promise<void>;
  fetchProfile(): Promise<void>;
  updateProfile(fields: { name?: string; avatar?: string; city?: string }): Promise<void>;
  deleteProfile(): Promise<void>;
}
