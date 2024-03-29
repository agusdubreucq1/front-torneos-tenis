import { useEffect, useState } from 'react';
import { Match } from '../vite-env';
import { getPartidosByTorneo } from '../services/partido';

type UsePartidosType = {
    partidos: Match[];
    error: string | null;
    loading: boolean;
    fetchPartidos: () => void
};

const UseMatches: (id: string | undefined) => UsePartidosType = (id) => {

    const [partidos, setPartidos] = useState<Match[]>([]);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);

    const fetchPartidos = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await getPartidosByTorneo(id!);
            setPartidos(data);
        } catch (e: any) {
            if (e.name === 'Error') {
                setError(e.message);
            } else {
                setError('Error de conexion');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartidos();
    }, [])
    return {
        partidos,
        error,
        loading,
        fetchPartidos
    }
};

export default UseMatches