import { api } from "./http";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
}

export const usersService = {
  profile: () => api<UserProfile>("/users/me"),

  updateProfile: (data: Partial<UserProfile>) =>
    api<UserProfile>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
