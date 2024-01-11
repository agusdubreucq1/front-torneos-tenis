import { useEffect, useState } from "react";
import { Jugador } from "../vite-env";
import { URLBACK } from "../constantes";

type UseJugadorType = {
    jugador: Jugador | null,
    error: string | null,
    loading: boolean
}


const useJugador: (id: string | undefined) => UseJugadorType = (id) => {

    const [jugador, setJugador] = useState<Jugador | null>(null);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchJugador = async () => {
            try {
                setError(null);
                setLoading(true);
                const response = await fetch(`${URLBACK}/jugador/${id}`);
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    console.log('error');
                    setError('Error al encontrar el jugador');
                }
                setJugador(data);
            } catch(e){
                console.log('catch error')
                setError('Error de conexion');
            } finally{
                setLoading(false);
            }
            
        };
        fetchJugador();
    }, [])

    return {
        jugador,
        error,
        loading
    }

}

export default useJugador