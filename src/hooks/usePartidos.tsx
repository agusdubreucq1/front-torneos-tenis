import { useEffect, useState } from 'react';
import { Partido } from '../vite-env';
import { getPartidosByTorneo } from '../services/getPartidosByTorneo';

type UsePartidosType = {
    partidos: Partido[];
    error: string | null;
    loading: boolean;
    fetchPartidos: () => void
};

const UsePartidos: (id: string | undefined) => UsePartidosType = (id) => {

    const [partidos, setPartidos] = useState<Partido[]>([]);
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

export default UsePartidos