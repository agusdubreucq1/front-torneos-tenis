import { useTournaments } from "../store/tournaments"
import { Tournament } from "../vite-env"

export const useTournament: ({id}: {id: string | number | undefined}) => {tournament :Tournament | undefined} = ({id}) => {
    const tournaments = useTournaments((state) => state.tournaments)
    const tournament = tournaments.find((t) => t.id == Number(id))

    return {tournament}
}