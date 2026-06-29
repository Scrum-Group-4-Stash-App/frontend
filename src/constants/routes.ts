export const AppRoutes = {
  home: "/",
  login: "/auth/login",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  dashboard: {
    index: "/dashboard",
    allResources: "/dashboard/resources",
    collections: "/dashboard/collections",
    favorites: "/dashboard/favorites",
    recents: "/dashboard/recents",
    shared: "/dashboard/shared",
    trash: "/dashboard/trash",
    tags: "/dashboard/tags",
    profile: "/dashboard/profile",
  },
} as const;
