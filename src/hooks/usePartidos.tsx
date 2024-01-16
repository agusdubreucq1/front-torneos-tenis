import { useEffect, useState } from 'react';
import { Partido } from '../vite-env';
import { getPartidosByTorneo } from '../services/getPartidosByTorneo';

type UsePartidosType = {
    partidos: Partido[];
    error: string | null;
    loading: boolean;
  };

const UsePartidos: (id: string | undefined) => UsePartidosType = (id) => {

    const [partidos, setPartidos] = useState<Partido[]>([]);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
            } finally{
                setLoading(false);
            }
        };
        fetchPartidos();
    }, [])
  return {
    partidos,
    error,
    loading
  }
};

export default UsePartidos