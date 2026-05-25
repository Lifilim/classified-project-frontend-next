import type { ServicesSyncStore } from "./servicesSyncStore";
import type { Service } from "@/shared/types/service";
import type { CreateCardDto } from "@/shared/types/auth";
import { cardsApi } from "@/shared/api/cardsApi";

export class ServicesAsyncStore {
  constructor(private sync: ServicesSyncStore) {}

  async fetchAll(): Promise<void> {
    this.sync.setLoading(true);
    try {
      const data = await cardsApi.getAll();
      this.sync.setItems(data);
    } catch {
      this.sync.setError("Не удалось загрузить услуги");
    } finally {
      this.sync.setLoading(false);
    }
  }

  async fetchMy(): Promise<void> {
    this.sync.setLoading(true);
    try {
      const data = await cardsApi.getMy();
      this.sync.setMyItems(data);
    } catch {
      this.sync.setError("Не удалось загрузить услуги");
    } finally {
      this.sync.setLoading(false);
    }
  }

  async create(dto: CreateCardDto): Promise<Service> {
    return cardsApi.create(dto);
  }
}
