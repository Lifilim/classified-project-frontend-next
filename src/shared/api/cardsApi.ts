import api from "./axios";
import type { Service } from "@/shared/types/service";
import type { CreateCardDto } from "@/shared/types/auth";

export const cardsApi = {
  async create(dto: CreateCardDto): Promise<Service> {
    const { data } = await api.post<Service>("/cards", dto);
    return data;
  },

  async delete(cardId: string | number): Promise<void> {
    await api.delete(`/cards/${cardId}`);
  },

  async getAll(): Promise<Service[]> {
    const { data } = await api.get<Service[]>("/cards");
    return data;
  },

  async getMy(): Promise<Service[]> {
    const { data } = await api.get<Service[]>("/cards/my");
    return data;
  },

  async getOne(id: string | number): Promise<Service> {
    const { data } = await api.get<Service>(`/cards/${id}`);
    return data;
  },

  async update(id: string | number, dto: Partial<CreateCardDto>): Promise<Service> {
    const { data } = await api.put<Service>(`/cards/${id}`, dto);
    return data;
  },
};
