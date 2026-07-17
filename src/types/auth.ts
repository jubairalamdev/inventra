export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "vendor" | "admin";
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
