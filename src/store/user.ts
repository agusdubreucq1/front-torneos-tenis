import { create } from "zustand";

interface UserFromLogin{
  dni: number;
  isAdmin: boolean;
  token: string;
  nombre : string;
  apellido : string;
}

type UserState = {
  user: UserFromLogin | null;
  token: string | null;
  getToken: () => void;
  setToken: (token: string) => void;
  setUser: (user: UserFromLogin) => void;
  getUser: () => void | any;
  logout: () => void;
};

export const useUser = create<UserState>((set, get) => ({
  user: null,
  token: null,
  getToken: () => {
    get().getUser();
    const token = get().user?.token;
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
    if (user !== null && user !== "undefined") {
      set({ user: JSON.parse(user) });
      return JSON.parse(user);
    } else {
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
