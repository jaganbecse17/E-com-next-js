export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: "user" | "admin" | "developer";
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}
