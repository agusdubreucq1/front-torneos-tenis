import { useEffect, useState } from "react";
import { Jugador } from "../vite-env"
import { getJugadores } from "../services/Jugador";


interface UseJugadoresType {
    loading: boolean,
    error: string | null,
    jugadores: Jugador[]
}

const useJugadores: () => UseJugadoresType = () => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchJugadores = async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await getJugadores();
            setJugadores(data);
            
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
        fetchJugadores();
    }, [])

    return {
        jugadores,
        error,
        loading,
        fetchJugadores
    }
}

export default useJugadores