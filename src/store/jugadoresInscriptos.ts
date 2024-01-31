import { create } from "zustand";
import { Player } from "../vite-env";
import { getInscripciones } from "../services/inscripciones";

export type UseJugadoresInscriptos = {
  jugadoresInscriptos: Player[];
  error: string | null;
  loading: boolean;
  getJugadoresInscriptos: (id: number | string) => void;
};

export const useJugadoresInscriptos = create<UseJugadoresInscriptos>((set) => ({
  jugadoresInscriptos: [],
  error: null,
  loading: false,
  getJugadoresInscriptos: async (id: number | string) => {
    set({ error: null });
    set({ loading: true });
    try {
      const data = await getInscripciones(id);
      set({ jugadoresInscriptos: data.jugadores });
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ loading: false });
    }
  },
}));
