export type User = {
  id: string;
  phone: string;
  name: string | null | undefined;
  avatar: string | undefined;
  city: string | undefined;
  rating: number;
  createdAt: string;
  isVerified: boolean;
};
