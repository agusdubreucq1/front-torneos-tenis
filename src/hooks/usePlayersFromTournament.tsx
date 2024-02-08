import { useEffect, useState } from "react";
import { Player } from "../vite-env";
import { getInscripciones } from "../services/inscripciones";

interface Props {
    id: string | number
}

type Function = (props: Props) => {
    players: Player[],
    error: string | null,
    loading: boolean,
    fetchPlayers: () => void
}
const usePlayersFromTournament: Function = ({ id }) => {
    const [players, setJugadores] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fetchPlayers = async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await getInscripciones(id)
            const newJugadores = data?.jugadores ?? []
            setJugadores(newJugadores);
        } catch (e) {
            setError('Error de conexion');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        fetchPlayers();
    }, [])

    return {
        players,
        error,
        loading,
        fetchPlayers
    }
}

export default usePlayersFromTournament