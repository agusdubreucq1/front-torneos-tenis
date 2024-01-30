import React, { useEffect } from "react";
import { Tournament } from "../vite-env";
import { getInscripcionesByJugador } from "../services/inscripciones";

interface Props{
    id: string | number;
}

const useInscripcionesJugador = ({ id }: Props) => {
    const [inscripciones, setInscripciones] = React.useState<Tournament[]>([]);
    const [error, setError] = React.useState<null | string>(null);
    const [loading, setLoading] = React.useState(false);

    const fetchInscripciones = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await getInscripcionesByJugador(id);
            setInscripciones(data);
        } catch (e: any) {
            if (e.name === 'Error') {
                setError(e.message);
            } else {
                setError('Error de conexion');
            }
        } finally {
            setLoading(false);
        }  
    }

    useEffect(() => {
            fetchInscripciones();
        }, [])

        return {
            inscripciones,
            error,
            loading
        }
}

export default useInscripcionesJugador