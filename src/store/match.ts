import { create } from "zustand";
import { Match} from "../vite-env";

export interface PartidoState {
    match : Match | null;
    setMatch: (match: Match) => void;
}

export const usePartido = create<PartidoState>((set) => ({
    match: null,
    setMatch: (match: Match) => set({ match: match})
}))

