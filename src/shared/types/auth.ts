import type { User } from "./user";

export type LoginDTO = {
  phone: string;
  password: string;
};

export type RegisterDTO = {
  phone: string;
  password: string;
  name?: string;
};

export type UserState = {
  token: string | null;
  user: User | null;
};

export type ActiveUserState = {
  token: string;
  user: User;
};

export interface CreateCardDto {
  title: string;
  description: string;
  price: number | string;
  imageUrl?: string;
  category: string;
}
