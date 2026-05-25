import type { Service } from "@/shared/types/service";

export interface IServicesState {
  items: Service[];
  loading: boolean;
  error: string | null;
  myItems: Service[];
}

export interface IServicesSync {
  setItems(items: Service[]): void;
  setMyItems(items: Service[]): void;
  setLoading(loading: boolean): void;
  setError(error: string | null): void;
  clearMyItems(): void;
}

export interface IServicesAsync {
  fetchAll(): Promise<void>;
  fetchMy(): Promise<void>;
  create(dto: { title: string; description: string; price: number | string; imageUrl?: string; category: string }): Promise<Service>;
}
