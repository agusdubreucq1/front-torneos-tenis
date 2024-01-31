import { useEffect, useState } from "react";
import { Player } from "../vite-env";
import { getInscripciones } from "../services/inscripciones";

const usePlayersFromTournament: ({ id }: { id: string | number }) => { players: Player[], error: string | null, loading: boolean } = ({ id }) => {
    const [players, setJugadores] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
        fetchPlayers();
    }, [])

    return {
        players,
        error,
        loading,
    }
}

export default usePlayersFromTournament