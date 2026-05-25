import type { UserSyncStore } from "./userSyncStore";
import type { LoginDTO, RegisterDTO } from "@/shared/types/auth";
import { authApi } from "@/shared/api/authApi";

export class UserAsyncStore {
  constructor(private sync: UserSyncStore) {}

  async login(dto: LoginDTO): Promise<void> {
    const data = await authApi.login(dto);
    this.sync.setToken(data.token);
    this.sync.setUser(data.user);
  }

  async register(dto: RegisterDTO): Promise<void> {
    const data = await authApi.register(dto);
    this.sync.setToken(data.token);
    this.sync.setUser(data.user);
  }

  async fetchProfile(): Promise<void> {
    const user = await authApi.getProfile();
    this.sync.setUser(user);
  }

  async updateProfile(fields: { name?: string; avatar?: string; city?: string }): Promise<void> {
    const user = await authApi.updateProfile(fields);
    this.sync.setUser(user);
  }

  async deleteProfile(): Promise<void> {
    await authApi.deleteProfile();
    this.sync.logout();
  }
}
