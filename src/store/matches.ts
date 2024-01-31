import { create } from "zustand";
import { Match } from "../vite-env";
import { getPartidosByTorneo } from "../services/partido";

interface UseMatches {
  matches: Match[];
  getMatches: (id: number | string) => void;
  loading: boolean;
  error: string | null;
}

export const useMatches = create<UseMatches>((set, _get) => ({
  matches: [],
  error: null,
  loading: false,
  getMatches: async (id) => {
    set({ error: null });
    set({ loading: true });
    try {
      const data = await getPartidosByTorneo(id!);
      set({ matches: data });
    } catch (e: any) {
      if (e.name === "Error") {
        set({ error: e.message });
      } else {
        set({ error: "Error de conexión" });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
