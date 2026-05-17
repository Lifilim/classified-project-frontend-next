import api from "./axios";
import type { LoginDTO, RegisterDTO, ActiveUserState } from "@/shared/types/auth";
import type { User } from "@/shared/types/user";

export const authApi = {
  async login(dto: LoginDTO): Promise<ActiveUserState> {
    const { data } = await api.post<ActiveUserState>("/auth/login", dto);
    return data;
  },

  async register(dto: RegisterDTO): Promise<ActiveUserState> {
    const { data } = await api.post<ActiveUserState>("/auth/register", dto);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>("/auth/profile");
    return data;
  },

  async updateProfile(fields: {
    name?: string;
    avatar?: string;
    city?: string;
  }): Promise<User> {
    const { data } = await api.patch<User>("/auth/profile", fields);
    return data;
  },

  async deleteProfile(): Promise<void> {
    await api.delete("/auth/profile");
  },
};
