import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "@/lib/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  success: boolean;
  data: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove credentials left by older builds that stored bearer tokens in localStorage.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.get<{ success: boolean; data: AuthUser }>("/auth/me")
      .then(({ data }) => setUser(data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string): Promise<void> {
    setLoading(true);
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
      setUser(data.data);
    } finally {
      setLoading(false);
    }
  }

  function logout(): void {
    setUser(null);
    void api.post("/auth/logout");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
