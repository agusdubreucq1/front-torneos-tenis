import { useEffect, useState } from "react";
import { Player } from "../vite-env";
import { getJugadorById } from "../services/Jugador";

type UseJugadorType = {
    jugador: Player | null,
    error: string | null,
    loading: boolean
}


const usePlayer: (id: string | undefined) => UseJugadorType = (id) => {

    const [jugador, setJugador] = useState<Player | null>(null);
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchJugador = async () => {
            try {
                setError(null);
                setLoading(true);
                const data= await getJugadorById(id!)
                setJugador(data);
                
            } catch(e:any) {
                if(e.name === 'Error'){
                    setError(e.message);
                } else{
                    setError('Error de conexion');
                }
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

export default usePlayer