import { create} from "zustand";
import { Tournament } from "../vite-env";
import { getTournaments } from "../services/tournament";


interface TournamentsState {
    tournaments: Tournament[],
    loading: boolean,
    error: null | String,
    setTournaments: (tournaments: Tournament[]) => void;
    getTournaments: () => void
}

export const useTournaments = create<TournamentsState>((set) => ({
    tournaments: [],
    loading: false,
    error: null,
    setTournaments: (tournaments) => set({ tournaments }),
    getTournaments: async () => {
        set({ error: null })
        try{
            set({ loading: true })
            const data = await getTournaments()
            set({ tournaments: data })
        } catch (error: any) {
            if(error.name === 'Error'){
                set({ error: error.message })
            } else {
                set({ error: 'Error de conexion' })
            }
        }finally{
            set({ loading: false })
        }
    }
}))