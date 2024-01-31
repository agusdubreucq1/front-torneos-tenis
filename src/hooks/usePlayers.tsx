import { useEffect, useState } from "react";
import { Player } from "../vite-env"
import { getJugadores } from "../services/Jugador";


interface UsePlayersType {
    loading: boolean,
    error: string | null,
    players: Player[]
}

const usePlayers: () => UsePlayersType = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPlayers = async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await getJugadores();
            setPlayers(data);
            
        } catch (e: any) {
            if(e.name === 'Error'){
                setError(e.message);
            } else {
                setError('Error de conexión');
            }
        } finally {
            setLoading(false);
        }

    };

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

export default usePlayers