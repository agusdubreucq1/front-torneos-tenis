import React from "react";
import { getPartidosByJugador } from "../services/getPartidosByJugador";
import { Partido } from "../vite-env";

interface Props {
    id: string | number
}

const usePartidosJugador = ({ id }: Props) => {
    const [partidos, setPartidos] = React.useState<Partido[]>([]);
    const [error, setError] = React.useState<null | string>(null);
    const [loading, setLoading] = React.useState(false);

    const fetchPartidos = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await getPartidosByJugador(id);
            setPartidos(data);
        } catch (e: any) {
            if (e.name === 'Error') {
                setError(e.message);
            } else {
                setError('Error de conexion');
            }

        }

    }

    React.useEffect(() => {
        fetchPartidos();
    }, [])

    return {
        partidos,
        error,
        loading,
        fetchPartidos
    }
}

export default usePartidosJugador