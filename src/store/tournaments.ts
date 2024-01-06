import { create} from "zustand";
import { Tournament } from "../vite-env";


interface TournamentsState {
    tournaments: Tournament[],
    setTournaments: (tournaments: Tournament[]) => void;
    getTournaments: () => void
}

export const useTournaments = create<TournamentsState>((set) => ({
    tournaments: [],
    setTournaments: (tournaments) => set({ tournaments }),
    getTournaments: () => {
        fetch("http://localhost:3000/torneos")
            .then((response) => response.json())
            .then((data) => set({ tournaments: data }))
    }
}))