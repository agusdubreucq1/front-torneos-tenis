import { useEffect, useState } from "react";
import { Jugador } from "../vite-env"
import { URLBACK } from "../constantes";


interface UseJugadoresType {
    loading: boolean,
    error: string | null,
    jugadores: Jugador[]
}

const useJugadores: () => UseJugadoresType = () => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJugadores = async () => {
            try {
                setError(null);
                setLoading(true);
                const response = await fetch(URLBACK + '/admin/jugador');
                const data = await response.json();
                if (!response.ok) {
                    setError(data.error);
                }
                setJugadores(data);
            } catch (e) {
                console.log('catch error')
                setError('Error de conexion');
            } finally {
                setLoading(false);
            }

        };
        fetchJugadores();
    }, [])

    return {
        jugadores,
        error,
        loading
    }
}

export default useJugadores