import { create } from "zustand";

type UserState = {
  user: any;
  token: string | null;
  getToken: () => void;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  getUser: () => void;
  logout: () => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  token: null,
  getToken: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token: `Bearer ${token}` });
    }
  },
  setToken: (token) => {
    set({ token: `Bearer ${token}` });
    localStorage.setItem("token", token);
  },
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
}));
