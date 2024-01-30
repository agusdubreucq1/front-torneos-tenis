import { create } from "zustand";
import { PartidoToBack } from "../vite-env";

export interface PartidoState {
    partido : PartidoToBack;
    setPartido: (partido: PartidoToBack) => void;
}

export const usePartido = create<PartidoState>((set) => ({
    partido: {
        orden: 0,
        resultado: '',
        pareja1: 0,
        pareja2: 0,
        ronda: '',
        fecha: '',
        ganador: null,
        jugadoresXRonda: 0
    },
    setPartido: (partido: PartidoToBack) => set({ partido: partido})
}))

