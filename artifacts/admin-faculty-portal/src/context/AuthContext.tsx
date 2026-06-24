import { createContext, useContext, useState, ReactNode } from "react";
import type { AuthUser, UserRole } from "./types";

const ADMIN_CREDS = { email: "admin@tradecoach.in", password: "Admin@123" };
const FACULTY_CREDS = [
  { email: "anand@tradecoach.in", password: "Faculty@123", id: "f1", name: "Dr. Anand Kumar", avatar: "AK" },
  { email: "priya.g@tradecoach.in", password: "Faculty@123", id: "f2", name: "Prof. Priya Gupta", avatar: "PG" },
  { email: "saxena@tradecoach.in", password: "Faculty@123", id: "f3", name: "Rahul Saxena", avatar: "RS" },
];

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string; role?: UserRole };
  logout: () => void;
  isAdmin: boolean;
  isFaculty: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("tc_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const login = (email: string, password: string): { ok: boolean; error?: string; role?: UserRole } => {
    if (!email.trim() || !password.trim()) return { ok: false, error: "Please enter email and password." };

    if (email.toLowerCase() === ADMIN_CREDS.email && password === ADMIN_CREDS.password) {
      const u: AuthUser = { id: "admin1", name: "Admin", email: ADMIN_CREDS.email, role: "admin", avatar: "AD" };
      setUser(u);
      localStorage.setItem("tc_user", JSON.stringify(u));
      return { ok: true, role: "admin" };
    }

    const fc = FACULTY_CREDS.find(f => f.email.toLowerCase() === email.toLowerCase() && f.password === password);
    if (fc) {
      const u: AuthUser = { id: fc.id, name: fc.name, email: fc.email, role: "faculty", avatar: fc.avatar };
      setUser(u);
      localStorage.setItem("tc_user", JSON.stringify(u));
      return { ok: true, role: "faculty" };
    }

    return { ok: false, error: "Invalid credentials. Try admin@tradecoach.in / Admin@123" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tc_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin", isFaculty: user?.role === "faculty" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
