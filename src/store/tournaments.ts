import { create} from "zustand";
import { Tournament } from "../vite-env";


interface TournamentsState {
    tournaments: Tournament[],
    error: null | String,
    setTournaments: (tournaments: Tournament[]) => void;
    getTournaments: () => void
}

export const useTournaments = create<TournamentsState>((set) => ({
    tournaments: [],
    error: null,
    setTournaments: (tournaments) => set({ tournaments }),
    getTournaments: () => {
        set({ error: null })
        fetch("http://localhost:3000/torneos")
            .then((response) => response.json())
            .then((data) => set({ tournaments: data }))
            .catch((error) => set({ error: String(error) }))
    }
}))