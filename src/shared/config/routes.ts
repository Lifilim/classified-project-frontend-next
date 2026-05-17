export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FEED: "/feed",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  CREATE: "/create",
  CARD: (id: string | number) => `/card/${id}`,
  SERVICES: "/services",
  FAVORITES: "/favorites",
  ABOUT: "/about",
} as const;
