import { useEffect, useState } from "react";
import { Jugador } from "../vite-env";
import { getInscripciones } from "../services/inscripciones";

const useJugadoresFromTournament: ({ id }: { id: string | number }) => { jugadores: Jugador[], error: string | null, loading: boolean } = ({ id }) => {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJugadores = async () => {
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
        fetchJugadores();
    }, [])

    return {
        jugadores,
        error,
        loading,
    }
}

export default useJugadoresFromTournament