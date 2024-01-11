import { useEffect, useState } from 'react';
import { Partido } from '../vite-env';
import { URLBACK } from '../constantes';
import { useUser } from '../store/user';

type UsePartidosType = {
    partidos: Partido[];
    error: string | null;
    loading: boolean;
  };

const UsePartidos: (id: string | undefined) => UsePartidosType = (id) => {

    const token = useUser((state) => state.token);

    const [partidos, setPartidos] = useState<Partido[]>([]);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPartidos = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await fetch(`${URLBACK}/admin/torneo/${id}/partidos`, {
                    headers: {
                        "Authorization": token ?? '',
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    console.log('error');
                    throw new Error('Error al encontrar los partidos');
                }
                setPartidos(data);
            } catch (e) {
                console.log(e);
            } finally{
                setLoading(false);
            }
        };
        if (token) {
            fetchPartidos();
        }

    }, [token])
  return {
    partidos,
    error,
    loading
  }
};

export default UsePartidos