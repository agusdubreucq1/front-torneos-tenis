import { create } from "zustand";
import { Partido } from "../vite-env";
import { getPartidosByTorneo } from "../services/getPartidosByTorneo";

interface UsePartido {
  partidos: Partido[];
  getPartidos: (id: number | string) => void;
  loading: boolean;
  error: string | null;
}

export const usePartidos = create<UsePartido>((set, _get) => ({
  partidos: [],
  error: null,
  loading: false,
  getPartidos: async (id) => {
    set({ error: null });
    set({ loading: true });
    try {
      const data = await getPartidosByTorneo(id!);
      set({ partidos: data });
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
