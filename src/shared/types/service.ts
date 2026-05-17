export interface Service {
  id: number | string;
  title: string;
  price: number | string;
  category: string;
  description: string;
  imageUrl?: string;
  createdAt: Date | string;
  userId: string;
}
