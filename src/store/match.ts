import { create } from "zustand";
import { MatchToBack } from "../vite-env";

export interface PartidoState {
    match : MatchToBack;
    setMatch: (match: MatchToBack) => void;
}

export const usePartido = create<PartidoState>((set) => ({
    match: {
        orden: 0,
        resultado: '',
        pareja1: 0,
        pareja2: 0,
        ronda: '',
        fecha: '',
        ganador: null,
        jugadoresXRonda: 0
    },
    setMatch: (match: MatchToBack) => set({ match: match})
}))

